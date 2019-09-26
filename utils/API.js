/**
 * API.js
 * @summary This file contains the actual calls to the server in order to further
 * separate the frontend from the backend
 */

import axios from 'axios';

export const searchMovieByTitle = async (title) => {
    try {
        const res = await axios.get('http://localhost:5000/search-title')
        return { response: res.data.Success }
    } catch (error) {
        return { response: 'Error fetching data from server' }
    }
};

export const searchShowByTitle = async (title) => {
    try {
        const res = await axios.get('http://localhost:5000/search-title')
        return { response: res.data.Success }
    } catch (error) {
        return { response: 'Error fetching data from server' }
    }
};