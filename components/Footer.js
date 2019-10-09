/**
 * Footer
 * @summary This component defines our site footer.
 * This will contain information about who we are and
 * links to other parts of the website
 */

//  imports to make footer functional
import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import 'mdbreact/dist/css/mdb.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {

    return (

        <MDBFooter color="blue" className="font-small pt-4 mt-4">  
            <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                    <MDBCol className="text-center" md="6">
                        <h5 className="title">PentaTech Inc</h5>
                        <p>
                            We can further explain what our website is about and how to learn
                            more about it. 
                        </p>
                    </MDBCol>
                    <MDBCol md="6" className="text-center">
                        <h5 className="title">Links</h5>
                        <ul>
                            <li className="list-unstyled">
                                <a href="#!">Link 1</a>
                            </li>
                        </ul>

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: <a href="http://cs480-projects.github.io/teams-fall2019/PentaTech-Inc/index.html"> PentaTech Inc </a>
                </MDBContainer>
            </div>
        </MDBFooter>
    );
};

export default Footer;