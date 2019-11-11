/**
 * Header
 * @summary This component defines our site header (nav bar).
 * Contains site branding, page links, and a search bar.
 */

import React from 'react';
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import SearchBar from './SearchBar';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import mediaTrackerLogo from '../assets/MediaTrackerLogoDark.png';


const brandStyle = {
    color: 'whitesmoke',
    fontWeight: 'bold'
};

const linkStyle = {
    marginRight: 15,
    color: 'whitesmoke'
};

const linkStyleLogin = {
    border: "1px solid whitesmoke",
    borderRadius: 5,
    backgroundColor: 'whitesmoke',
    color: '#4688F1',
    fontWeight: 'bold',
    marginRight: 0,
    marginLeft: 0
};

const logoStyle = {
    width: 40,
    height: 40
};

const Header = props => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [details, setDetails] = useState({ data: {} });
    const [username, setUsername] = useState("");

    useEffect(() => {
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
    }, [loggedIn]);

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
        <Navbar bg="primary" expand="lg">
            <Navbar.Brand href="/" style={brandStyle}>
                <img src={mediaTrackerLogo} alt="media tracker logo" style={logoStyle} />
            </Navbar.Brand>
            <Navbar.Brand href="/" style={brandStyle}>Media Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/" style={linkStyle}>Home</Nav.Link>
                    <Nav.Link href="/about" style={linkStyle}>About</Nav.Link>
                    {loggedIn ?
                        <Nav.Link href={"/profile/" + username} style={linkStyle}>Profile</Nav.Link>
                        :
                        null
                    }
                </Nav>
                <SearchBar className="mr-sm-2" />
                {
                    !loggedIn ?
                        (
                            <Nav>
                                <Nav.Link href="/login"><Button style={linkStyleLogin} size="sm" variant="none">Login</Button></Nav.Link>
                                <Nav.Link href="/register"><Button style={linkStyleLogin} size="sm" variant="none">Register</Button></Nav.Link>
                            </Nav>
                        )
                        :
                        <Nav.Link href=""><Button onClick={handleLogout} style={linkStyleLogin} size="sm" variant="none">Logout</Button></Nav.Link>
                }
            </Navbar.Collapse>
        </Navbar>
    );
};

export default withRouter(Header);