/**
 * API.js
 * @summary This file contains the actual calls to the server in order to further
 * separate the frontend from the backend
 */

import axios from 'axios';

/**
 * @param title 
 * @returns object with movie and tv show results for query
 */
export const searchByTitle = async (title) => {
    try {
        const res = await axios.get('http://localhost:5000/search-title?title=' + title);
        return { response: res.data.results }
    } catch (error) {
        return { response: null }
    }
};