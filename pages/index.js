/**
 * Index
 * @summary The home page of our website.
 */

import React from 'react';
import Layout from '../components/Layout';
import { searchMovieByTitle } from '../utils/API';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = props => {
    return (
        <Layout>
            <h1>Media Tracker</h1>
            <p>Home page</p>
            <p>{`Res: ${props.result}`}</p>
        </Layout>
    );
};

Home.getInitialProps = async () => {
    const res = await searchMovieByTitle();
    return { result: res.response }
};

export default Home;