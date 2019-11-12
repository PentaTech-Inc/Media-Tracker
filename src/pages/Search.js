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


const rowStyle = {
    width: '100%',
};

const colStyle = {
    padding: 0,
    margin: 0
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

const Search = props => {
    const [results, setResults] = useState(null);
    const query = qs.parse(props.location.search, {
        ignoreQueryPrefix: true
    });
    let title = query.title;

    // const results = {
    //     movies: [
    //         {
    //             title: "Avengers: Infinity War",
    //             release_date: "2019-10-04",
    //             overview: "One of the Marvel Avengers movies.",
    //             poster_path: "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"
    //         },
    //         {
    //             title: "The Avengers: End Game",
    //             release_date: "2019-05-10",
    //             overview: "The first of Marvel's Avengers movies.",
    //             poster_path: "/cezWGskPY5x7GaglTTRN4Fugfb8.jpg"
    //         },
    //         {
    //             title: "Avengers: Infinity War",
    //             release_date: "2019-10-04",
    //             overview: "One of the Marvelfopk14fpok4qpofkqp,lwe,clp,plfm4rfomkg4lwfm4,[qowq,cpq4,pokfopqf[pc,2pd,2p3ro4kopfk[prqo,4po[p13po[ktok3opk[4po3kfp[3,dq]]]]]]] Avengers movies.",
    //             poster_path: "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"
    //         },
    //         {
    //             title: "The Avengers: End Game",
    //             release_date: "2019-05-10",
    //             overview: "The first of Marvel's Avengerfpo234kfpo3k4qoprw[fd,3,r,2o3f[pd4f43fs movies.",
    //             poster_path: "/cezWGskPY5x7GaglTTRN4Fugfb8.jpg"
    //         },
    //         {
    //             title: "Avengers: Infinity War",
    //             release_date: "2019-10-04",
    //             overview: "One of the Marvel Avengers movies.",
    //             poster_path: "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"
    //         },
    //         {
    //             title: "The Avengers: End Game",
    //             release_date: "2019-05-10",
    //             overview: "The first of M[g5lropcaldp[cwfqkopkvewp[dmoifjo14[3jfkod43ij[po1kd,1omkregqkovckq,[fom4po3[kfp4,co,2[pqdok23kropgk1plq,wlpc,pdarvel's Avengers movies.",
    //             poster_path: "/cezWGskPY5x7GaglTTRN4Fugfb8.jpg"
    //         }
    //     ],
    //     shows: [
    //         {
    //             name: "The Office",
    //             first_air_date: "2009-05-12",
    //             overview: "A paper company is met with surprises every day by their crazyfopkqrpgqkpo43kpf,cpmpo34mgqpokfpoq,o3rkopkgpokq4owfmpmc,q boss Michael Scott.",
    //             poster_path: "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"
    //         },
    //         {
    //             name: "Parks and Recreation",
    //             first_air_date: "2011-07-19",
    //             overview: "A day-to-day look at the Parks and Recreation department of local government.",
    //             poster_path: "/cezWGskPY5x7GaglTTRN4Fugfb8.jpg"
    //         },
    //         {
    //             name: "The Office",
    //             first_air_date: "2009-05-12",
    //             overview: "A paper company is met with surprises every day by their crazy boss Michael Scott.",
    //             poster_path: "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"
    //         },
    //         {
    //             name: "Parks and Recreation",
    //             first_air_date: "2011-07-19",
    //             overview: "A day-to-day look at the Parks and Recreation department of local government.mrqgeokrmgkmwerlgmkwremglwkermgklemclqwecpworfkorvwmbpc;kmlq;wemfeiofmiqeg",
    //             poster_path: "/cezWGskPY5x7GaglTTRN4Fugfb8.jpg"
    //         },
    //         {
    //             name: "The Office",
    //             first_air_date: "2009-05-12",
    //             overview: "A paper company is met with surprises every day by their crazy boss Michael Scott.",
    //             poster_path: "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"
    //         },
    //         {
    //             name: "Parks and Recreation",
    //             first_air_date: "2011-07-19",
    //             overview: "A day-to-day look at the Parks and Recreation department of local government.",
    //             poster_path: "/cezWGskPY5x7GaglTTRN4Fugfb8.jpg"
    //         }
    //     ]
    // };

    useEffect(() => {
        const fetchResults = async () => {
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
            <Container>
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

                                <p>{title}</p>
                                <div>
                                    <Tabs style={tabsStyle} defaultActiveKey="movies" id="results-tab">
                                        <Tab stlye={tabStyle} eventKey="movies" title="Movies">
                                            {results.movies.length > 0 ?
                                                <CardColumns className="card-columns text-center">
                                                    {results.movies.map((item, index) => {
                                                        return (
                                                            <ResultCard key={index} title={item.title} overview={item.overview} release_date={item.release_date} poster={item.poster_path} />
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
                                                            <ResultCard key={index} title={item.name} overview={item.overview} release_date={item.first_air_date} poster={item.poster_path} />
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
                            null
                    }
                </Row>
            </Container>
        </Layout>
    );
};

export default Search;