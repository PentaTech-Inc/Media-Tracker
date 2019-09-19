/**
 * Index
 * @summary The home page of our website.
 */

import React from 'react';
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

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
    try {
        // call server at endpoint /search-title
        const res = await axios.get('http://localhost:5000/search-title');
        // res.data is the JSON object returned which is { Success: ***data*** }
        return { result: res.data.Success }
    } catch (error) {
        console.error(error);
        return { result: 'Failed to fetch data from server' }
    }
};

export default Home;