import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

function NotFound() {

    return (
        <Layout>
            <h1 style={{ borderBottom: '1px solid black' }}>Error 404 - page not found</h1>
            <br />
            <h4>Sorry, but the page you are looking for cannot be found.</h4>
            <h5><Link to="/">Click here</Link> to be taken back to the home page!</h5>
        </Layout>
    );
};

export default NotFound;