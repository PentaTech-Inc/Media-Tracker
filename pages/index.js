/**
 * Index
 * @summary The home page of our website.
 */

import React from 'react';
import Layout from '../components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import TitlesCarousel from '../components/TitlesCarousel';
import TitlesList from '../components/TitlesList';
import 'bootstrap/dist/css/bootstrap.min.css';


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

    return (
        <Layout>
            <Container fluid={true} style={containerStyle}>
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
            </Container>
        </Layout>
    );
};


export default Home;