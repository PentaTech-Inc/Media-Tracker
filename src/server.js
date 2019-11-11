/**
 * Server.js
 * @summary This will contatin all server side logic for
 * calling API's, updating the database, etc.
 * i.e. Things not involved with the frontend.
 */
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware');
const app = express();

const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
}));
app.use(cookieParser());
// report server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0
// Import our User schema
const User = require('./models/User.js');
const mongo_uri = process.env.MONGO_URL;
const secret = process.env.MONGO_SECRET;

mongoose
    .connect(mongo_uri, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// route to register a user
app.get('/api/register', function (req, res) {
    const { username, email, password } = req.query;
    const user = new User({ username, email, password });
    user.save(function (err) {
        if (err) {
            res.status(500)
                .send("Error registering new user please try again.");
        } else {
            res.status(200).send("Welcome!");
        }
    });
});

// route to authenticate user and issue JWT
app.get('/api/auth', function (req, res) {
    const { email, password } = req.query;
    User.findOne({ email }, function (err, user) {
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
        } else if (!user) {
            res.status(401)
                .json({
                    error: 'Incorrect email or password'
                });
        } else {
            user.isCorrectPassword(password, function (err, same) {
                if (err) {
                    res.status(500)
                        .json({
                            error: 'Internal error please try again'
                        });
                } else if (!same) {
                    res.status(401)
                        .json({
                            error: 'Incorrect email or password'
                        });
                } else {
                    // Issue token
                    const payload = { email };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    res.cookie('token', token, { httpOnly: true })
                        .sendStatus(200);
                }
            });
        }
    });
});

/** Check if valid token is saved in browser cookies */
app.get('/checkToken', withAuth, (req, res) => {
    res.send(200);
});

/** Logout user */
app.get('/logout', withAuth, (req, res) => {
    res.clearCookie('token');
    res.send(200);
});

app.get('/getUserDetails', withAuth, function (req, res) {
    const token =
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                req.email = decoded.email;
                // omit _id, password, and __v fields from result
                User.findOne({ email: req.email }, { _id: 0, password: 0, __v: 0 }, (err, user) => {
                    if (err) {
                        res.status(401).send('Invalid email: Query unsuccessful');
                    }
                    res.status(200).send(user);
                });
            }
        });
    }
});

/**
 * Create GET route
 * @returns search result after calling both movie and show APIs
 */
app.get('/search-title?:title', (req, res) => {
    const query = req.query.title; // save query params

    axios.get('https://api.themoviedb.org/3/search/multi?api_key=' + process.env.MOVIEDB_KEY + '&query=' + query + '&language=en-US&page=1&include_adult=false')
        .then(result => {
            // filter the results of the multi-search GET request
            const movies = result.data.results.filter(item => item.media_type === "movie");
            const shows = result.data.results.filter(item => item.media_type === "tv");

            res.status(200).send({
                results: {
                    movies: movies, // movies
                    shows: shows   //shows
                }
            })
        })
        .catch(err => res.send(err));

    /* keep for reference
    axios.all([
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + TMDB_API_KEY + '&query=' + query),
        axios.get('https://api.themoviedb.org/3/search/tv?api_key=' + TMDB_API_KEY + '&query=' + query)
    ])
        .then(axios.spread(function (movies, shows) {
            const result = {
                results: {
                    movies: movies.data.results,
                    shows: shows.data.results
                }
            }
            console.log("Result in server: " + result.movies);
            res.status(200).send(result);
        }))  
        .catch(error => {
            console.error(error);
            return { result: 'Failed to retrieve data' };
        });
    */
});