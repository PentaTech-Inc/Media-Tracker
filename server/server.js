/**
 * Server.js
 * @summary This will contatin all server side logic for
 * calling API's, updating the database, etc.
 * i.e. Things not involved with the frontend.
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.port || 5000;

app.use(cors());

// report server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

/** 
 * Create GET route
 * @returns search result after calling both movie and show APIs
 */
app.get('/search-title?:title', (req, res) => {
    const query = req.query.title;
    console.log("Key = " + process.env.TMDB_API_KEY);
    try { 
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + process.env.TMDB_API_KEY + '&query=' + query)
            .then(data=> res.status(200).send(data))
            .catch(err => res.send(err));
    } catch (error) {
        console.error(error);
    }
});