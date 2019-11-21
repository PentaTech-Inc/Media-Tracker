/**
 * Media Information
 * @summary Displays information about TV shows and movies.
 */

import React from 'react';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import * as qs from 'qs';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FaStar } from 'react-icons/fa';

const Media = props => {
    const [media, setMedia] = useState({
        data: {
            id: 0,
            type: "",
            title: "",
            overview: "",
            rating: 0,
            voteCount: 0,
            posterPath: "/",
            seasons: 0,
            releaseDate: "0000",
            firstAirDate: "0000",
            lastAirDate: "0000",
            runtime: 0,
            genre: "",
        }
    });

    const query = qs.parse(props.location.search, {
        ignoreQueryPrefix: true
    });
    let id = "";
    let type = "";
    if (query.id)
        id = query.id;
    if (query.type)
        type = query.type;
    const posterBaseURL = "http://image.tmdb.org/t/p/w185_and_h278_bestv2";


    useEffect(() => {
        fetch("/api/getTitleDetails?id=" + id + "&type=" + type)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else if (res.status === 401) {
                    fetch("/api/addTitle?id=" + id + "&type=" + type)
                        .then(res => {
                            if (res.status === 200) {
                                window.location.reload();
                            } else {
                                const error = new Error(res.error);
                                throw error;
                            }
                        })
                        .catch(err => {
                            console.error(err);
                            alert('Error navigating to title\'s page. Please try again.');
                        });
                }
            }).then(data => {
                setMedia({ data: data });
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const handleClick = (event) => {
        event.preventDefault();
        fetch("/api/addToList?id=" + id + "&type=" + type)
            .then(res => {
                if (res.status === 200) {
                    alert("Added to list!");
                } else if (res.status === 202) {
                    alert("Added to list");
                } else if (res.status === 500) {
                    alert("Error: Insufficient information for title. Available only as a search result.")
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error navigating to title\'s page. Please try again.');
            });
    };

    return (
        <Layout fluid={true} style={body}>
            <Container fluid>
                {type === "movie" ?
                    <Row>
                        <Col md={4} lg={4} xl={3} style={colStyle} className="text-xs-center text-sm-center text-md-left">
                            <div style={mediaCard}>
                                <img style={mediaPoster} src={media.data.posterPath ? (posterBaseURL + media.data.posterPath) : ""} alt="poster"></img>
                                <br />
                                <Button variant="primary" type="submit" onClick={handleClick}>Add to List</Button>
                            </div>
                        </Col>
                        <Col md={8} lg={8} xl={9} style={colStyle}>
                            <div>
                                <h3 style={mediaTitle}><strong>{media.data.title ? media.data.title : ""}</strong></h3>
                                <h6 style={mediaDetails}>
                                    <span>Movie</span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<span>{media.data.releaseDate ? media.data.releaseDate.substring(0, 4) : ""}</span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<span>{media.data.genre ? media.data.genre : ""}</span>
                                </h6>

                                <div style={mediaRating}>
                                    {media.data.rating ? <FaStar size="xs" style={icon} /> : "No ratings"}&nbsp;<span>{media.data.rating ? media.data.rating : ""}</span>&nbsp;&nbsp;
                            <span style={votes}>{media.data.voteCount ? (media.data.voteCount + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""} votes</span>
                                </div>

                                <hr />

                                <p style={mediaSummary}>{media.data.overview ? media.data.overview : ""}</p>
                            </div>
                        </Col>
                    </Row>
                    :
                    <Row>
                        <Col md={4} lg={4} xl={3} style={colStyle} className="text-xs-center text-sm-center text-md-left">
                            <div style={mediaCard}>
                                <img style={mediaPoster} src={media.data.posterPath ? (posterBaseURL + media.data.posterPath) : ""} alt="poster"></img>
                                <br />
                                <Button variant="primary" type="submit" onClick={handleClick}>Add to List</Button>
                            </div>
                        </Col>
                        <Col md={8} lg={8} xl={9} style={colStyle}>
                            <div>
                                <h3 style={mediaTitle}><strong>{media.data.title ? media.data.title : ""}</strong></h3>
                                <h6 style={mediaDetails}>
                                    <span>TV Series</span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<span>{media.data.firstAirDate ? media.data.firstAirDate.substring(0, 4) : ""} - {media.data.lastAirDate ? media.data.lastAirDate.substring(0, 4) : ""}</span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<span>{media.data.genre ? media.data.genre : ""}</span>
                                </h6>

                                <div style={mediaRating}>
                                    <FaStar size="xs" style={icon} />&nbsp;<span>{media.data.rating ? media.data.rating : ""}</span>&nbsp;&nbsp;
                            <span style={votes}>{media.data.voteCount ? (media.data.voteCount + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""} votes</span>
                                </div>

                                <hr />

                                <p style={mediaSummary}>{media.data.overview ? media.data.overview : ""}</p>

                                {/* Leaving off for now but would like to implement in the future
                            <div>
                                <h4><strong>Details</strong></h4>
                                <p>
                                    <strong>Creator:&nbsp;&nbsp;</strong>Blah <br />
                                    <strong>Cast:&nbsp;&nbsp;</strong>Blah
                            </p>
                            </div>
                            */}
                            </div>
                        </Col>
                    </Row>
                }
            </Container>
        </Layout>
    );
};

const body = {
    paddingTop: 30,
    paddingBottom: 100,
    paddingRight: '2.5%',
    paddingLeft: '2.5%',
    textAlign: 'center'
};

const colStyle = {
    paddingLeft: '2.5%',
    paddingRight: '2.5%'
};

const mediaCard = {
    display: 'block',
    width: '500px',
};

const mediaPoster = {
    width: '185px',
    height: '278px',
};

const mediaTitle = {
    color: 'black',
    textAlign: 'left'
}

const mediaDetails = {
    color: 'black',
    opacity: '.7',
    textAlign: 'left'
};

const mediaRating = {
    textAlign: 'left',
    fontSize: '20pt',
    marginTop: 10
};

const icon = {
    color: 'gold',
    width: 25,
    marginTop: '-5'
};

const votes = {
    color: 'black',
    opacity: '0.7',
    fontSize: '10pt',
};

const mediaSummary = {
    textAlign: 'left'
};

export default Media;