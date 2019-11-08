/**
 * Search
 * @summary This page will display search results.
 * Data for the search request is passed as a query string from the previous page.
 * Will request search results from our server here.
 */

import React from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import ResultCard from '../components/ResultCard';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { searchByTitle } from '../utils/API';
import { useState, useEffect } from 'react';
import * as qs from 'qs';
import 'bootstrap/dist/css/bootstrap.min.css';


const rowStyle = {
    width: '100%',
};

const colStyle = {
    padding: 0,
    margin: 0
};

const resultsStyle = {
    border: '1px solid #DDD',
    borderRadius: 5,
    padding: 3
};

const tabsStyle = {
    padding: 5
};

const Search = props => {
    const query = qs.parse(props.location.search, {
        ignoreQueryPrefix: true
    });
    let title = query.title;
    const [results, setResults] = useState(null);

    // const results = {
    //     movies: [
    //         {
    //             title: "Joker",
    //             release_date: "2019-10-04",
    //             overview: "A crazy movie about the Joker"
    //         },
    //         {
    //             title: "The Avengers: End Game",
    //             release_date: "2019-05-10",
    //             overview: "The last installment"
    //         }
    //     ],
    //     shows: [
    //         {
    //             name: "The Office",
    //             first_air_date: "2009-05-12",
    //             overview: "A paper company is met with surprises every day by their crazy boss Michael Scott."
    //         },
    //         {
    //             name: "Parks and Recreation",
    //             first_air_date: "2011-07-19",
    //             overview: "A day-to-day look at the Parks and Recreation department of local government."
    //         }
    //     ]
    // };

    useEffect(() => {
        const fetchResults = async () => {
            let res;
            console.log("Title: " + title);
            if (typeof title !== 'undefined' && title.replace(/^\s+/, '').replace(/\s+$/, '') !== '') {
                const res = await searchByTitle(title);
                setResults(res.response);
            } else {
                setResults(null);
            }
        };
        fetchResults();
    }, [title]);

    return (
        <Layout>
            <Container fluid>
                <Row style={rowStyle}>
                    <Col style={colStyle}><h1>Search</h1></Col>
                </Row>
                <br />
                <Row>
                    <Col style={colStyle}><SearchBar buttonStyle='dark' /></Col> {/* ...props to implement child components inheriting size? */}
                </Row>
                <br />
                <Row style={rowStyle}>
                    {
                        // If no search was made, just '--domain--/search', omit search results section
                        results !== null ?
                            <Col style={colStyle}>
                                <h5>Results for:</h5>

                                <p>{`${title}`}</p>
                                <div style={resultsStyle}>
                                    <Tabs style={tabsStyle} defaultActiveKey="movies" id="results-tab">
                                        <Tab eventKey="movies" title="Movies">
                                            {
                                                results.movies.map((item, index) => {
                                                    return (
                                                        <ResultCard key={index} title={item.title} overview={item.overview} release_date={item.release_date} />
                                                    );
                                                })
                                            }
                                        </Tab>
                                        <Tab eventKey="shows" title="Shows">
                                            {
                                                results.shows.map((item, index) => {
                                                    return (
                                                        <ResultCard key={index} title={item.name} overview={item.overview} release_date={item.first_air_date} />
                                                    );
                                                })
                                            }
                                        </Tab>
                                    </Tabs>
                                </div>
                            </Col>
                            :
                            null
                    }
                </Row>
            </Container>
        </Layout>
    );
};

export default Search;