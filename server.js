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
const withAuth = require('./client/src/middleware');
const path = require('path');
const app = express();

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/', function (req, res) {
    // res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

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
const User = require('./client/src/models/User.js');
const Movie = require('./client/src/models/Movie.js');
const Show = require('./client/src/models/Show.js');
const mongo_uri = process.env.MONGO_URL;
const secret = process.env.MONGO_SECRET;

mongoose
    .connect(mongo_uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// route to register a user
app.get('/api/register', (req, res) => {
    const { username, email, password } = req.query;
    const dateJoined = new Date();
    const user = new User({ username, email, password, dateJoined });
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
app.get('/api/auth', (req, res) => {
    const { email, password } = req.query;
    User.findOne({ email }, (err, user) => {
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
app.get('/api/checkToken', withAuth, (req, res) => {
    res.sendStatus(200);
});

/** Logout user */
app.get('/api/logout', withAuth, (req, res) => {
    res.clearCookie('token');
    res.sendStatus(200);
});

app.get('/api/getUserDetails', withAuth, (req, res) => {
    const token =
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, (err, decoded) => {
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

/** Retrieve profile of any valid user. Returns all public details */
app.get('/api/getProfile', (req, res) => {
    const { username } = req.query;

    User.findOne({ username: username }, { _id: 0, __v: 0 }, (err, user) => {
        if (err) {
            res.status(501).send('Error: Unable to retrieve details.');
            return;
        }
        if (user) {
            res.status(200).send(user);
            return;
        } else {
            res.status(401).send("Error: Not a valid user.")
        }
    });
});

/** Modify user properties. MUST MODIFY LOGIC FOR FURTHER SETTINGS */
app.get('/api/settings', withAuth, (req, res) => {
    const { avatarURL } = req.query;
    const token =
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                req.email = decoded.email;
                User.findOneAndUpdate({ email: req.email }, { $set: { avatar: 'https://i.imgur.com/' + avatarURL } }, (err, avatarURL) => {
                    if (err) {
                        res.status(401).send('Invalid email: Update unsuccessful');
                    }
                    res.status(200).send(avatarURL);
                });
            }
        });
    }
});

app.get('/api/getUserLists', (req, res) => {
    const { name } = req.query;
    let user = null;
    let moviesList = [];
    let showsList = [];
    User.findOne({ username: name }, { _id: 0, __v: 0, password: 0, email: 0, avatar: 0, dateJoined: 0, comments: 0 },
        async (error, usr) => {
            if (error) {
                throw error;
            }
            user = usr;
            moviesList = await Movie.find()
                .where('id')
                .in((user.movies));
            showsList = await Show.find()
                .where('id')
                .in((user.shows));
            res.status(200).send({ movies: moviesList, shows: showsList });
        })
});

/** Add to user list */
app.get('/api/addToList', withAuth, (req, res) => {
    const { id, type } = req.query;
    const token =
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                req.email = decoded.email;
                if (type === "movie") {
                    User.findOneAndUpdate(
                        { email: req.email },
                        { $push: { movies: id } },
                        function (error, title) {
                            if (error) {
                                console.log(error);
                                res.status(500).send("Internal server error.");
                            } else {
                                console.log(title);
                                res.status(200).send("Added to Movies list!");
                            }
                        });
                } else if (type === "tv") {
                    User.findOneAndUpdate(
                        { email: req.email },
                        { $push: { shows: id } },
                        function (error, title) {
                            if (error) {
                                console.log(error);
                                res.status(500).send("Internal server error.");
                            } else {
                                console.log(title);
                                res.status(200).send("Added to Shows list!");
                            }
                        });
                }
            }
        }
        )
    }
});

/** Add comment to Movie/Show and User comment properties */
app.get('/api/addComment', withAuth, (req, res) => {
    let { id, comment, type } = req.query;
    comment = decodeURIComponent(comment); // decode

    const token =
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                req.email = decoded.email;
                if (type === "movie") {
                    User.findOneAndUpdate(
                        { email: req.email },
                        { $push: { comments: comment } },
                        function (error, user) {
                            if (error) {
                                console.log(error);
                                res.status(500).send("Failed to update user.");
                                return;
                            } else {
                                Movie.findOneAndUpdate(
                                    { id: id },
                                    {
                                        $push: {
                                            comments: {
                                                username: user.username,
                                                avatar: user.avatar,
                                                text: comment
                                            }
                                        }
                                    },
                                    function (error, mov) {
                                        if (error) {
                                            console.log(error);
                                            res.status(500).send("Failed to add comment to movie.");
                                            return;
                                        } else {
                                            //console.log(mov);
                                            res.status(200).send("Added comment!");
                                        }
                                    }

                                );
                            }
                        });
                } else if (type === "tv") {
                    User.findOneAndUpdate(
                        { email: req.email },
                        { $push: { comments: comment } },
                        function (error, user) {
                            if (error) {
                                console.log(error);
                                res.status(500).send("Failed to update user.");
                                return;
                            } else {
                                Show.findOneAndUpdate({ id: id },
                                    {
                                        $push: {
                                            comments: {
                                                username: user.username,
                                                avatar: user.avatar,
                                                text: comment
                                            }
                                        }
                                    },
                                    function (error, sho) {
                                        if (error) {
                                            console.log(error);
                                            res.status(500).send("Failed to add comment to show.");
                                            return;
                                        } else {
                                            //console.log(sho);
                                            res.status(200).send("Added comment!");
                                        }
                                    }
                                );
                            }
                        });
                }
            }
        }
        )
    }
});

/** Insert new document into media collection of DB */
app.get('/api/addTitle', (req, res) => {
    const { id, type } = req.query;
    // quick check to see if DB already contains title
    // omit _id and __v fields from result
    if (type === "movie") {
        Movie.findOne({ id: id }, { _id: 0, __v: 0 }, (err, title) => {
            if (err) {
                return;
            } else if (title) {
                res.status(202).send("Title already in database.");
                return;
            } else {
                //res.status(401).send('Movie added to database successfully');
                //console.log('Movie added to database successfully')
                // do nothing; continue adding title
            }
        });
    } else if (type === "tv") {
        Show.findOne({ id: id }, { _id: 0, __v: 0 }, (err, title) => {
            if (err) {
                return;
            } else if (title) {
                res.status(202).send("Title already in database.");
                return;
            } else {
                //res.status(401).send('Show added to database successfully');
                //console.log('Show added to database successfully')
                // do nothing; continue adding title
            }
        });
    } else {
        res.status(500).send("Error: Invalid type.");
    }
    if (type === "movie") {
        axios.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + process.env.MOVIEDB_KEY + '&language=en-US&page=1&include_adult=false')
            .then(m => {
                const movie = new Movie({
                    id: id,
                    type: "movie",
                    title: m.data.title,
                    overview: m.data.overview,
                    rating: m.data.vote_average,
                    voteCount: m.data.vote_count,
                    posterPath: m.data.poster_path,
                    releaseDate: m.data.release_date,
                    runtime: m.data.runtime,
                    genre: m.data.genres[0].name
                });
                movie.save(err => {
                    if (err) {
                        console.log("MOVIE DUPLICATE");
                        res.status(401).send("Error: Duplicate title.");
                    }
                    else {
                        console.log("MOVIE ADDED TO DB");
                        res.status(200).send("Movie added to database!");
                    }
                });
            })
    } else if (type === "tv") {
        axios.get('https://api.themoviedb.org/3/tv/' + id + '?api_key=' + process.env.MOVIEDB_KEY + '&language=en-US&page=1&include_adult=false')
            .then(s => {
                const show = new Show({
                    id: id,
                    type: "tv",
                    title: s.data.name,
                    overview: s.data.overview,
                    rating: s.data.vote_average,
                    voteCount: s.data.vote_count,
                    posterPath: s.data.poster_path,
                    seasons: s.data.number_of_seasons,
                    firstAirDate: s.data.first_air_date,
                    lastAirDate: s.data.last_air_date,
                    genre: s.data.genres[0].name
                });
                show.save(err => {
                    if (err) {
                        console.log("SHOW DUPLICATE");
                        res.status(401).send("Error: Duplicate title.");
                    }
                    else {
                        console.log("SHOW ADDED TO DB");
                        res.status(200).send("Show added to database!");
                    }
                });
            })
    }
});
/** Return details about certain title from DB */
app.get('/api/getTitleDetails', (req, res) => {
    const { id, type } = req.query;
    // quick check to see if DB already contains title
    // omit _id and __v fields from result
    if (type === "movie") {
        Movie.findOne({ id: id }, { _id: 0, __v: 0 }, (err, title) => {
            if (err) {
                res.status(500).send('Error: Query unsuccessful.');
                return;
            } else if (title) {
                res.status(200).send(title);
                return;
            } else {
                res.status(401).send("Error: Title not saved in database.");
                return;
            }
        });
    } else if (type === "tv") {
        Show.findOne({ id: id }, { _id: 0, __v: 0 }, (err, title) => {
            if (err) {
                res.status(500).send('Error: Query unsuccessful.');
                return;
            } else if (title) {
                res.status(200).send(title);
                return;
            } else {
                res.status(401).send("Error: Title not saved in database.");
                return;
            }
        });
    } else {
        res.status(500).send("Error: Invalid type.");
    }
});
app.get('/api/getPopularMovies', (req, res) => {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=' + process.env.MOVIEDB_KEY + '&language=en-US&page=1&include_adult=false')
        .then(result => {
            res.status(200).send(result.data.results);
        })
        .catch(err => res.send(err));
});
app.get('/api/getPopularShows', (req, res) => {
    axios.get('https://api.themoviedb.org/3/tv/popular?api_key=' + process.env.MOVIEDB_KEY + '&language=en-US&page=1&include_adult=false')
        .then(result => {
            res.status(200).send(result.data.results);
        })
        .catch(err => res.send(err));
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