/**
 * Profile
 * @summary A profile page for users.
 * Lists a user's username and profile picture, favorite TV shows & movies, and other statistics
 */

import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import { FaUserPlus, FaCommentDots, FaCalendar } from 'react-icons/fa';
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

const rowStyle = {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: '5%',
    marginRight: '5%'
};

const colStyle = {
    width: '100%',
};

const alignCenter = {
    textAlign: 'center'
};

const underline = {
    textAlign: 'left',
    color: '#1f57a4',
    borderBottomStyle: 'solid',
    borderBottomColor: 'cornflowerBlue',
    borderBottomWidth: 2
};

const profileCard = {
    display: 'block',
    width: 350,
    padding: 20,
    borderStyle: 'solid',
    borderColor: '#d8d8d8',
    borderWidth: 2,

};

const profileImg = {
    width: 250,
    height: 250,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 0.4,
    borderRadius: 500
};

const username = {
    textAlign: 'center',
};

const icon = {
    color: '#1d3458',
    width: 45
};

const tabs = {
    fontSize: 30,
    width: '100%'
};

const tab = {
    color: 'black',
    borderStyle: 'solid',
    borderColor: '#d8d8d8',
    borderWidth: 1,
    borderTop: 'none'
};

const section = {
    padding: 50,
    marginLeft: 50,
    marginRight: 50
};


const Profile = () => {
    const [details, setDetails] = useState({ data: {} });

    useEffect(() => {
        fetch("/api/getUserDetails", { credentials: 'include' })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            }).then(data => {
                setDetails({ data: data });
            })
            .catch(err => {
                console.error(err);
                alert('Error checking for valid token.');
            });

    }, []);

    let date = details.data.dateJoined + ""; // make string
    date = date.substring(4, 7) + " " + date.substring(11, 15);
    return (
        <Layout>
            <h1 style={{ borderBottom: '1px solid black' }}>{details.data.username}</h1>
            <div className="fluid">
                <Row style={rowStyle}>
                    <Col md={6} lg={4}>
                        <img src={details.data.avatar} alt="profile" style={profileImg} />
                        <br />
                        <h5 style={username}><FaCalendar /> Joined {date}</h5>
                    </Col>

                    <Col md={6} lg={8}>
                        <h3 style={underline}>Movies watched</h3>
                        <br />
                        <h3 style={underline}>Shows watched</h3>
                    </Col>
                </Row>

                {/**
                <Tabs defaultActiveKey="statistics" id="tabs" style={tabs} className="nav-justified">
                    <Tab eventKey="statistics" title="Statistics" style={tab}>
                        <div style={section}>
                            <p>Blah</p>
                        </div>
                    </Tab>
                    <Tab eventKey="favorites" title="Favorites" style={tab}>
                        <div style={section}>
                            <p>Blah</p>
                        </div>
                    </Tab>
                    <Tab eventKey="friends" title="Friends" style={tab}>
                        <div style={section}>
                            <p>Blah</p>
                        </div>
                    </Tab>
                </Tabs>
                */}
            </div>
        </Layout>
    );
};

export default Profile;