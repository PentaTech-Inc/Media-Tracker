/**
 * Home
 * @summary The home page of our website.
 */

import React from 'react';
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { Container, Row, Col } from 'react-bootstrap';
import TitlesCarousel from '../components/TitlesCarousel';
import TitlesList from '../components/TitlesList';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/app_logo_circle_medium.png';

const containerStyle = {
    padding: 0,
    margin: 0
};

const rightColStyle = {
    padding: 0
};

const rowStyle = {
    width: '100%',
    paddingLeft: 0,
    paddingRight: 0
};


const Home = props => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [details, setDetails] = useState({ data: {} });
    const [username, setUsername] = useState("");

    // if logged in redirect to profile
    fetch("http://localhost:5000/getUserDetails", { credentials: 'include' })
        .then(res => {
            if (res.status === 200) {
                setLoggedIn(true);
                return res.json();
            }
        }).then(data => {
            setUsername(data.username);
        })
        .catch(err => {
            // user not logged in, or error
        });

    const handleLogout = event => {
        event.preventDefault();
        fetch("http://localhost:5000/logout"
            , { credentials: 'include' })
            .then(res => {
                if (res.status === 200) {
                    props.history.push('/login');
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error logging out. Please try again.');
            });
    }

    return (
        <div>
            {loggedIn ?
                // LOGGED IN
                <Layout fluid={true} style={containerStyle}>
                    <Row style={rowStyle}>
                        <Col><h1>Home</h1></Col>
                    </Row>
                    <br />
                    <Row style={rowStyle}>
                        <Col sm={4} md={4} lg={3} xl={3}>
                            <TitlesList title="My List" />
                            <TitlesList title="Popular Titles" />
                        </Col>
                        <Col sm={8} md={8} lg={9} xl={9} style={rightColStyle}>
                            <Row className="justify-content-md-left">
                                <Col><TitlesCarousel title="Currently Watching" /></Col>
                            </Row>
                            <br />
                            <Row className="justify-content-md-left">
                                <Col><TitlesCarousel title="Recommended for Fabian" /></Col>
                            </Row>
                            <br />
                            <Row className="justify-content-md-left">
                                <Col><TitlesCarousel title="Friends are watching" /></Col>
                            </Row>
                        </Col>
                    </Row>
                </Layout>
            : // NOT LOGGED IN
            <div fluid style={body}>
                <Header />
                <Row style={header}>
                    <div style={heading}>
                        <span style={headingTitle}>
                            <img style={headingLogo} src={logo} alt="Logo" />
                            <h1 style={title}>Media Tracker</h1>
                        </span>
                        <h4 style={slogan}>Keep all of your shows and movies in one place.</h4>
                    </div>
                </Row>

                <div style={ornament} />

                <Row style={blurb}>
                    <h3 style={blurbTitle}><strong>Keep Track of your Media</strong></h3>

                    <p style={paragraph}><strong>Media Tracker</strong> is an application that helps you keep track of your TV shows and movies while also connecting you with others who share the same interests. With Media Tracker, you can rate and organize your shows, keep track of trending series, and discuss your favorite media in forums while gaining titles, friends, and more! </p>
                    <p style={paragraph}>Your input helps others discover your favorite shows and movies. Start contributing today and become a part of the Media Tracker community!
                    <br />
                    </p>
                </Row>
                <Footer />
            </div>
            }
        </div>
    );
};

const body = {
    width: '100%',
};

const header = {
    height: '84vh',
    width: '100vw',
    backgroundColor: 'black',
    color: 'white',
    backgroundImage: 'linear-gradient(45deg, #000000 25%, #000824 25%, #003352 50%, #000000 50%, #0d3357 75%, #003352 75%, #003352 100%)',
    backgroundSize: '707.11px 707.11px'
};

const heading = {
    width: '100%',
    display: 'block',
    margin: 'auto',
    marginLeft: '20%'
};

const headingTitle = {
    display: 'flex',
    margin: 'auto',
};

const title = {
    width: '60%',
    fontSize: '4em',
    marginLeft: '.5em',
    borderBottomStyle: 'solid',
    borderBottomColor: 'white',
    borderBottomWidth: '2px',
};

const headingLogo = {
    width: '100px',
    height: '100px'
};

const slogan = {
    opacity: '.5',
    color: 'white',
    marginLeft: '5.5em',
    marginTop: '.5em'
};

const ornament = {
    backgroundColor: '#2d74da',
    padding: '1.5em'
};

const blurb = {
    padding: '5em 10em 5em 10em',
    backgroundColor: '#00000C',
    textAlign: 'left',
    color: 'white',
};

const blurbTitle = {
    width: '50%',
    color: '#009bef',
    paddingBottom: '.3em',
    borderBottomStyle: 'solid',
    bordBottomColor: '#56acf2',
    borderBottomWidth: '3',
    marginBottom: '1em'
};

const paragraph = {
    color: 'white',
    display: 'block'
};


export default withRouter(Home);