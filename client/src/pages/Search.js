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
import { Container, Row, Col, Tabs, Tab, CardColumns } from 'react-bootstrap';
import { searchByTitle } from '../utils/API';
import { useState, useEffect } from 'react';
import * as qs from 'qs';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Search.css'


const Search = props => {
    const [results, setResults] = useState(null);
    const query = qs.parse(props.location.search, {
        ignoreQueryPrefix: true
    });
    let title = null;
    if (query.title)
        title = query.title.replace("&", "");

    useEffect(() => {
        const fetchResults = async () => {
            if (title && typeof title !== 'undefined' && title.replace(/^\s+/, '').replace(/\s+$/, '') !== '') {
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
            <h1 style={{ borderBottom: '1px solid black' }}>Search</h1>
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

                            <p>{title}</p>
                            <div>
                                <Tabs style={tabsStyle} defaultActiveKey="movies" id="results-tab">
                                    <Tab stlye={tabStyle} eventKey="movies" title="Movies">
                                        {results.movies.length > 0 ?
                                            <CardColumns className="card-columns text-center">
                                                {results.movies.map((item, index) => {
                                                    return (
                                                        <ResultCard key={index} id={item.id} type={item.media_type} title={item.title} overview={item.overview} release_date={item.release_date} poster={item.poster_path} />
                                                    );
                                                })
                                                }
                                            </CardColumns>
                                            :
                                            <p>No results</p>
                                        }
                                    </Tab>
                                    <Tab style={tabStyle} eventKey="shows" title="Shows">
                                        {results.shows.length > 0 ?
                                            <CardColumns className="card-columns text-center">
                                                {results.shows.map((item, index) => {
                                                    return (
                                                        <ResultCard key={index} id={item.id} type={item.media_type} title={item.name} overview={item.overview} release_date={item.first_air_date} poster={item.poster_path} />
                                                    );
                                                })
                                                }
                                            </CardColumns>
                                            :
                                            <p>No results</p>
                                        }
                                    </Tab>
                                </Tabs>
                            </div>
                        </Col>
                        :
                        <Col style={colStyle}>
                            <div>
                                <h5>Search movies or TV shows!</h5>
                                <p>Add titles to your lists to keep track of what you've watched!</p>
                                <p>Powered by <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">TMDb</a>.</p>
                            </div>
                        </Col>
                }
            </Row>
        </Layout>
    );
};

const rowStyle = {
    width: '100%',
};

const colStyle = {
    padding: 0,
    marginLeft: '5%',
    marginRight: '5%'
};

const tabsStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 0,
    borderRadius: 5,
    borderLeft: '1px solid #4688F1',
    borderRight: '1px solid #4688F1',
    borderTop: '1px solid #4688F1'
};

const tabStyle = {
    // for possible future styling
};

export default Search;