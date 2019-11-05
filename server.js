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
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const port = process.env.port || 5000;

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const dev = process.env.NODE_DEV !== 'production' //true false
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler() //part of next config

// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true , useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// set up EJS views
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')  // get view directory
app.set('layout', 'layout')             // hook up express layouts
app.use(expressLayouts)                 // use the express layouts
app.use(express.static('public'))       // tell where public files are like stylesheets and js files

nextApp.prepare().then(() => {
    // Express body parser
    app.use(express.urlencoded({ extended: true }));

    // Express session
    app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
    );

    // Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    // Connect flash
    app.use(flash());

    // Global variables
    app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
    });

    // Routes
    app.use('/', require('./routes/index.js'));
    app.use('/auth', require('./routes/index.js'));
    app.use('/users', require('./routes/users.js'));

    app.get('*', (req,res) => {
        return handle(req,res) 
    })
    
    // createServer((req, res) => {
    //     // Be sure to pass `true` as the second argument to `url.parse`.
    //     // This tells it to parse the query portion of the URL.
    //     const parsedUrl = parse(req.url, true)
    //     const { pathname, query } = parsedUrl
    
    //     if (pathname === '') {
    //       app.render(req, res, '/index', query)
    //     } else if (pathname === '') {
    //       app.render(req, res, '/index', query)
    //     }
    //     else if (pathname === '/auth') {
    //         app.use('/auth', require('./routes/index.js'));
    //     } else {
    //       handle(req, res, parsedUrl)
    //     }
    //   }).listen(3000, err => {
    //     if (err) throw err
    //     console.log('> Ready on http://localhost:3000')
    //   })
    // for all the react stuff, that doesn't have preset express route

})


///////////////////////////////////////////////////////////////////////////////
app.use(cors());

// report server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

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