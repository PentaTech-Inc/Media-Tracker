/**
 * Header
 * @summary This component defines our site header (nav bar).
 * Contains site branding, page links, and a search bar.
 */

import React from 'react';
import SearchBar from './SearchBar';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const brandStyle = {
    color: 'whitesmoke'
};

const navListStyle = {
    display: 'flex',
    flexDirection: 'row'
};

const linkStyle = {
    marginRight: 15,
    color: 'whitesmoke'
};

const Header = () => {
    return (
        <Navbar bg="primary" expand="sm">
            <Navbar.Brand href="/" style={brandStyle}>Media Tracker</Navbar.Brand>
            <Nav style={navListStyle}>
                <Nav.Link href="/" style={linkStyle}>Home</Nav.Link>
                <Nav.Link href="/about" style={linkStyle}>About</Nav.Link>
                <Nav.Link href="/profile" style={linkStyle}>Profile</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
                <SearchBar />
            </Nav>
            <a href="/auth" className="btn btn-outline-light btn-lg">Sign-up/Login</a>
        </Navbar>
    );
};

export default Header;