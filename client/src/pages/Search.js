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
import '../styles/Search.css';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';



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

    const [key, setKey] = useState('movies');

    return (
        <div>
            <Header />
            <h1 style={headingStyle}>Search</h1>
            <div style={body}>
                <Container>
                    <Row style={rowStyle}>
                        {
                            // If no search was made, just '--domain--/search', omit search results section
                            results === null ?
                                <div>
                                    <br />
                                    <h5><strong>Search for movies and TV shows.</strong></h5>
                                    <p>Add titles to your lists to keep track of what you've watched!</p>
                                    <Row>
                                        <Col><SearchBar buttonStyle='dark' /></Col> {/* ...props to implement child components inheriting size? */}
                                    </Row>
                                    <p><small>Powered by <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">TMDb</a>.</small></p>
                                </div>
                                :
                                <div>
                                    <br />
                                    <Row>
                                        <Col style={colStyle}><SearchBar buttonStyle='dark' /></Col> {/* ...props to implement child components inheriting size? */}
                                    </Row>
                                    <br /><br />
                                    <Col style={colStyle}>
                                        { key === 'movies' ?
                                            <div><h3><strong>{results.movies.length} results for:</strong></h3><h5>{title}</h5><br /></div>
                                            :
                                            <div><h3><strong>{results.shows.length} results for:</strong></h3><h5>{title}</h5><br /></div>
                                        }

                                        <div style={resultsStyle}>
                                            <Tabs style={tabsStyle} activeKey={key} onSelect={k => setKey(k)} id="results-tab">
                                                <Tab style={tabStyle} eventKey="movies" title="Movies">
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
                                                        <p><br />No results</p>
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
                                                        <p><br />No results</p>
                                                    }
                                                </Tab>
                                            </Tabs>
                                        </div>
                                    </Col>
                                </div> 
                            }
                        </Row>
                    </Container>
                </div>
                <Footer />
            </div>
        );
    };

const headingStyle = {
    width: '50%',
    marginLeft: 50,
    marginRight: 50,
    marginTop: 30,
    marginBottom: 10,
    fontFamily: 'Impact',
    fontSize: '50pt',
    color: '#2d74da',
    borderBottomStyle: 'solid',
    bordBottomColor: '#25467a',
    borderBottomWidth: '3'
};

const body = {
    backgroundColor: 'whiteSmoke',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 20,
    marginRight: 50,
    marginBottom: 20,
    marginLeft: 50,
    borderRadius: 5
};

const rowStyle = {
    width: '100%',
};

const colStyle = {
    padding: 0,
    margin: 0
};

const resultsStyle = {
    borderRadius: 5,
    border: '1px solid #4688F1',
    padding: 10
};

const tabsStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 0,
};

const tabStyle = {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
};

export default Search;