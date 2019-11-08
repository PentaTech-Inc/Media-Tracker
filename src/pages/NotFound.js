import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import '../App.css'

function NotFound() {

    return (
        <Layout>
            <h1>Sorry, but the page you are looking for cannot be found :(</h1>
            <br></br>
            <h3><Link to="/">Click here</Link> to be taken back to the home page!</h3>
        </Layout>
    );
};

export default NotFound;