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

const Header = () => {
    return (
        <NavBar bg="primary" expand="sm">
            <NavBar.Brand href="/" style={{ color: "whitesmoke" }}>Media Tracker</NavBar.Brand>
            <Nav style={{ display: 'flex', flexDirection: 'row', }}>
                <NavLink title="Home" />
                <NavLink title="About" />
            </Nav>
            <SearchBar />
        </NavBar>
    );
};

export default Header;