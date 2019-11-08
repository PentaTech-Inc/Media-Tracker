/**
 * Header
 * @summary This component defines our site header (nav bar).
 * Contains site branding, page links, and a search bar.
 */

import React from 'react';
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
};

const logoStyle = {
    width: 40,
    height: 40
};

const Header = () => {
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
                    <Nav.Link href="/profile" style={linkStyle}>Profile</Nav.Link>
                </Nav>
                <SearchBar className="mr-sm-2" />
                <Nav.Link href="/login"><Button style={linkStyleLogin} size="sm" variant="none">Login</Button></Nav.Link>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;