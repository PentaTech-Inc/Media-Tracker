/**
 * Footer
 * @summary This component defines our site footer.
 * This will contain information about who we are and
 * links to other parts of the website
 */

//  imports to make footer functional
import React from 'react';
import SearchBar from './SearchBar';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';
import { Link } from 'react-router-dom';
import 'mdbreact/dist/css/mdb.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {

    return (

        <MDBFooter color="#78909c" className="font-small pt-4 mt-4">
            <MDBContainer fluid className="text-center text-md-center">
                <MDBRow>
                    <MDBCol md="4" className="text-center">
                        <h4 className="title"><strong>Quick Links</strong></h4>
                        <ul>
                            <li className="list-unstyled">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="list-unstyled">
                                <Link to="/about">About</Link>
                            </li>
                            <li className="list-unstyled">
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>
                    </MDBCol>
                    <MDBCol md="4" className="text-center">
                        <h4 className="title"><strong>Media Tracker</strong> by PentaTech Inc</h4>
                        <p><medium>
                            <strong>Media Tracker</strong> is an application that helps you keep track of shows and movies you watch, while also making it social!
                            Participate in forums for each title and contribute to its rating.
                            </medium>
                        </p>
                    </MDBCol>
                    <MDBCol md="4" >
                        <SearchBar />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright <a href="http://cs480-projects.github.io/teams-fall2019/PentaTech-Inc/index.html">PentaTech Inc</a>
                </MDBContainer>
            </div>
        </MDBFooter>
    );
};

export default Footer;