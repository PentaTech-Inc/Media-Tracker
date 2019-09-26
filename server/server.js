/**
 * Server.js
 * @summary This will contatin all server side logic for
 * calling API's, updating the database, etc.
 * i.e. Things not involved with the frontend.
 */

const express = require('express');
const app = express();
const port = process.env.port || 5000;

// report server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

/** 
 * Create GET route
 * @returns search result after calling both moview and show APIs
 */
app.get('/search-title', (req, res) => {
    res.send({ Success: 'Server API successfully called!' });
});