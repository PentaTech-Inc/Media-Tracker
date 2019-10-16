/**
 * Profile
 * @summary A profile page for users.
 * Lists a user's username and profile picture, favorite TV shows & movies, and other statistics
 */

import Layout from '../components/Layout';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FaUserPlus } from 'react-icons/fa';
import { FaCommentDots } from 'react-icons/fa';

const rowStyle = {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 100,
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


/*
Install FontAwesome icons:
npm install react-icons --save

Usage: 
import { FaBeer } from 'react-icons/fa';
<FaBeer /> 
*/

const Profile = () => {

    return (
        <Layout fluid={true}>
            <Row style={rowStyle}>
                <Col style={colStyle}>
                    <div style={profileCard}>
                        <img src="" alt="profile picture" style={profileImg} />
                        <br />
                        <h3 style={username}>Username</h3>

                        <Row style={alignCenter}>
                            <Col>
                                <a href=""><FaUserPlus style={icon} size="xs" /><br /><small>Add User</small></a>
                            </Col>
                            <Col>
                                <a href=""><FaCommentDots style={icon} size="xs" /><br /><small>Message</small></a>
                            </Col>
                        </Row>
                        <br />
                    </div>
                </Col>

                <Col style={colStyle}>
                    <div>
                        <h3 style={underline}>Latest Updates</h3>

                    </div>
                </Col>
            </Row>

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

        </Layout>
    );
};

export default Profile;