/**
 * Profile
 * @summary A profile page for users.
 * Lists a user's username and profile picture, favorite TV shows & movies, and other statistics
 */

import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Slider from 'react-slick';
import { FaUserPlus, FaCommentDots, FaCalendar } from 'react-icons/fa';
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Profile.css';

const Profile = () => {
    const [details, setDetails] = useState({ data: {} });

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
    };

    useEffect(() => {
        fetch("/api/getUserDetails", { credentials: 'include' })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            }).then(data => {
                setDetails({ data: data });
            })
            .catch(err => {
                console.error(err);
                alert('Error checking for valid token.');
            });

    }, []);

    let date = details.data.dateJoined + ""; // make string
    date = date.substring(4, 7) + " " + date.substring(11, 15);
    return (
        <Layout>
            <h1 style={{ borderBottom: '1px solid black' }}>{details.data.username}</h1>
            <div className="fluid">
                <Row style={rowStyle} className="align-items-center">
                    <Col md={5} lg={4} className="justify-content-center">
                        <img src={details.data.avatar} alt="profile" style={profileImg} />
                        <br />
                        <h5 style={username}><FaCalendar /> Joined {date}</h5>
                    </Col>

                    <Col md={7} lg={8}>
                        <h3 style={underline}>Movies watched</h3>
                        <Slider style={{ marginTop: 10, marginBottom: 30 }} {...settings}>
                            <div style={{ width: 105, height: 198 }}>
                                {/* hard coded as backup */}
                                <Card style={{marginLeft: 5, marginRight: 5}}>
                                    <Card.Img src="http://image.tmdb.org/t/p/w185_and_h278_bestv2/vn94LlNrbUWIZZyAdmvUepFBeaY.jpg" />
                                </Card>                            </div>
                            <div style={{ width: 105, height: 198 }}>
                                {/* hard coded as backup */}
                                <Card style={{ marginLeft: 5, marginRight: 5 }}>
                                    <Card.Img src="http://image.tmdb.org/t/p/w185_and_h278_bestv2/lcq8dVxeeOqHvvgcte707K0KVx5.jpg" />
                                </Card>                            </div>
                            <div style={{ width: 105, height: 198 }}>
                                {/* hard coded as backup */}
                                <Card style={{ marginLeft: 5, marginRight: 5 }}>
                                    <Card.Img src="http://image.tmdb.org/t/p/w185_and_h278_bestv2/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg" />
                                </Card>                            </div>
                            <div style={{ width: 105, height: 198 }}>
                                {/* hard coded as backup */}
                                <Card style={{ marginLeft: 5, marginRight: 5 }}>
                                    <Card.Img src="http://image.tmdb.org/t/p/w185_and_h278_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg" />
                                </Card>                            </div>
                        </Slider>
                        <br />
                        <h3 style={underline}>Shows watched</h3>
                        <Slider style={{ marginTop: 10, marginBottom: 30 }} {...settings}>
                            <div style={{ width: 105, height: 198 }}>
                                <Card style={{ marginLeft: 5, marginRight: 5 }}>
                                    {/* <Card.Img src="http://image.tmdb.org/t/p/w185_and_h278_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg" /> */}
                                </Card>
                            </div>
                            <div style={{ width: 105, height: 198 }}>
                                {/* hard coded as backup */}
                                <Card style={{ marginLeft: 5, marginRight: 5 }}>
                                    {/* <Card.Img src="http://image.tmdb.org/t/p/w185_and_h278_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg" /> */}
                                </Card>                            </div>
                            <div style={{ width: 105, height: 198 }}>
                                {/* hard coded as backup */}
                                <Card style={{ marginLeft: 5, marginRight: 5 }}>
                                    {/* <Card.Img src="http://image.tmdb.org/t/p/w185_and_h278_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg" /> */}
                                </Card>                            </div>
                        </Slider>
                    </Col>
                </Row>


            </div>
        </Layout>
    );
};

const rowStyle = {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
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


export default Profile;