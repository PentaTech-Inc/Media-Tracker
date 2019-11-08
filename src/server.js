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
const port = process.env.PORT || 5000;


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



    // const MongoClient = require('mongodb').MongoClient;
    // const uri = "mongodb+srv://admin:<password>@media-tracker-kzjmq.mongodb.net/test?retryWrites=true&w=majority";
    // const client = new MongoClient(uri, { useNewUrlParser: true });
    // client.connect(err => {
    //   const collection = client.db("test").collection("devices");
    //   // perform actions on the collection object
    //   client.close();
    // });


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