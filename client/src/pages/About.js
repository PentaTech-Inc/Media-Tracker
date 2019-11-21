/**
 * About
 * @summary The about page for our site.
 * Describes what the service does and how it benefits users.
 */

import React from 'react';
import Layout from '../components/Layout';
import pentatechLogo from '../assets/team_logo_large_words.png';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

const body = {
    width: '100%'
};

const description = {
    marginLeft: 50,
    marginRight: 50,
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 75,
    paddingRight: 75,
    borderRadius: 5,
    backgroundColor: 'whiteSmoke'
};

const heading = {
    width: '50%',
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    fontFamily: 'Impact',
    fontSize: '45pt',
    color: '#2d74da',
    borderBottomStyle: 'solid',
    bordBottomColor: '#25467a',
    borderBottomWidth: '3'
};

const paragraph = {
    color: '#25467a',
    fontSize: '18pt'
};

const sig = {
    textAlign: 'right'
};

const logo = {
    width: 250,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
};

const About = () => {

    return (
        <div>
            <Header />
            <div style={body}>
                <br />
                <h1 style={heading}>Media Tracker</h1>
                <br />
                <div style={description}>
                    <p style={paragraph}><strong>Media Tracker</strong> is an application that helps you keep track of your TV shows and movies while also connecting you with others who share the same interests. With Media Tracker, you can rate and organize your shows, keep track of trending series, and discuss your favorite media in forums while gaining titles, friends, and more! </p>

                    <p style={paragraph}>Your input helps others discover your favorite shows and movies. Start contributing today and become a part of the Media Tracker community!
                    <br /><br />
                    </p>
                    <p style={sig}>- <strong>The PentaTech Team</strong></p>
                    <br />
                    <img src={pentatechLogo} alt="pentatech logo" style={logo} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;