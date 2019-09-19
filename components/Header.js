/**
 * Header
 * @summary This component defines our site header (nav bar).
 * Contains site branding, page links, and a search bar.
 */

import SearchBar from './SearchBar';
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

// easily apply CSS rules to components in JSON
const linkStyle = {
    marginRight: 15,
    color: 'whitesmoke'
};

/** Component to help clean up links in NavBar 
 * @returns <Nav.Link> component with appropriate contextual data
*/
const NavLink = props => {
    return (
        <Nav.Link href={props.title === "Home" ? '/' : '/' + props.title.toLowerCase()} // if "Home" replace with '/' else return appropriately titled page
            style={linkStyle} >
            {props.title}
        </Nav.Link>
    );
};

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