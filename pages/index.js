/**
 * Index
 * @summary The home page of our website.
 */

import React from 'react';
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardsList from '../components/CardsList';

const Home = props => {
    return (
        <Layout>
            <h1>Media Tracker</h1>
            <br />
            <CardsList title="Currently watching" />
            <br />
            <CardsList title="Recommended for Fabian" />
            <br />
            <CardsList title="Friends are watching" />
            <br />
            <CardsList title="Weekly Top TV Series" />
            <br />
            <CardsList title="Weekly Top Movies" />
        </Layout>
    );
};


export default Home;