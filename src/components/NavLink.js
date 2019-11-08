/** Component to help clean up links in NavBar 
 * @returns <Nav> component with appropriate contextual data
*/

import React from 'react';
import { Nav } from 'react-bootstrap';

// easily apply CSS rules to components in JSON
const linkStyle = {
    marginRight: 15,
    color: 'whitesmoke'
};

const NavLink = props => {
    return (
        <Nav.Link href={props.title === "Home" ? '/' : '/' + props.title.toLowerCase()} // if "Home" replace with '/' else return appropriately titled page
            style={linkStyle} >
            {props.title}
        </Nav.Link>
    );
};

export default NavLink;