/**
 * Header
 * @summary This component defines our site header (nav bar).
 * Contains site branding, page links, and a search bar.
 */

import SearchBar from './SearchBar';
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavLink from './NavLink';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';


const brandStyle = {
    color: 'whitesmoke'
};

const navListStyle = {
    display: 'flex',
    flexDirection: 'row'
};

const Header = () => {
    return (
        <NavBar bg="primary" expand="sm">
            <NavBar.Brand href="/" style={brandStyle}>Media Tracker</NavBar.Brand>
            <Nav style={navListStyle}>
                <NavLink title="Home" />
                <NavLink title="About" />
                <NavLink title="Profile" />
            </Nav>
            <Nav className="ml-auto">
                <SearchBar />
            </Nav>
            <a href="/auth" className="btn btn-outline-light btn-lg">Sign-up/Login</a>
        </NavBar>
    );
};

export default Header;