/**
* Home
* @summary The home page of our website.
*/
import React from 'react';
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Slider from 'react-slick';
import { Container, Row, Col, Card } from 'react-bootstrap';
import TitlesCarousel from '../components/TitlesCarousel';
import TitlesList from '../components/TitlesList';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import logo from '../assets/app_logo_circle_medium.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Profile.css';
const containerStyle = {
    padding: 0,
    margin: 0
};
const rightColStyle = {
    padding: 0
};
const rowStyle = {
    width: '100%',
    paddingLeft: 0,
    paddingRight: 0
};
const rowStyle1 = {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: '5%',
    marginRight: '5%'
};
const Home = props => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [popularMovies, setPopularMovies] = useState(null);
    const [popularShows, setPopularShows] = useState(null);
    const [username, setUsername] = useState("");
    const basePosterPath = "http://image.tmdb.org/t/p/w185_and_h278_bestv2";
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        variableWidth: false,
        adaptiveHeight: false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };
    // if logged in redirect to profile
    fetch("/api/getUserDetails", { credentials: 'include' })
        .then(res => {
            if (res.status === 200) {
                setLoggedIn(true);
                return res.json();
            }
        }).then(data => {
            setUsername(data.username);
        })
        .catch(err => {
            // user not logged in, or error
        });
    useEffect(() => {
        fetch("/api/getPopularMovies")
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            }).then(data => {
                setPopularMovies(data);
            })
            .catch(err => {
                //
            });
        fetch("/api/getPopularShows")
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            }).then(data => {
                setPopularShows(data);
            })
            .catch(err => {
                //
            })
    }, [])
    const handleLogout = event => {
        event.preventDefault();
        fetch("/api/logout"
            , { credentials: 'include' })
            .then(res => {
                if (res.status === 200) {
                    props.history.push('/login');
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error logging out. Please try again.');
            });
    };

    const handleMediaPage = (id, type) => (event) => {
        event.preventDefault();
        fetch("/api/addTitle?id=" + id + "&type=" + type)
            .then(res => {
                if (res.status === 200) {
                    props.history.push("/media?id=" + id + "&type=" + type);
                } else if (res.status === 202) {
                    props.history.push("/media?id=" + id + "&type=" + type);
                } else if (res.status === 500) {
                    console.log(res);
                    alert("Error: Insufficient information for title. Available only as a search result.")
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error navigating to title\'s page. Please try again.');
            });
    };

    return (
        <div>
            {loggedIn ?
                // LOGGED IN
                <div fluid={true} style={containerStyle}>
                    <Header />
                    <h1 style={headingStyle}><strong>Welcome back, {username}</strong></h1>
                    <br />

                    <div style={homeBody}>
                        <Row style={rowStyle}>
                            <Col md={3} lg={3} xl={3}>
                                <TitlesList title="My Movies" type="movie" />
                                <TitlesList title="My TV Shows" type="tv" />
                            </Col>
                            <Col md={8} lg={9} xl={9}>
                                <Row className="justify-content-md-right" style={{backgroundColor: '#e1ebf7', padding: 20, borderRadius: 5}}>
                                    <Col>
                                        <h3 style={underline}>Trending Movies</h3>
                                        <Slider style={{ marginTop: 30, marginBottom: 40, backgroundColor: '#a8c0f3', padding: 20, borderRadius: 8 }} {...settings}>
                                            {popularMovies ?
                                                popularMovies.map((item, index) => {
                                                    return (
                                                        <div style={{ width: 218, height: 330}}>
                                                            <Card style={{ width: '95%', height: '95%', marginLeft: '5%', marginRight: '5%' }} as="div">
                                                                <a style={{ cursor: 'pointer' }} onClick={handleMediaPage(item.id, "movie")}>
                                                                    <Card.Img style={{ width: '100%', height: '100%'}} src={basePosterPath + item.poster_path} />
                                                                </a>
                                                            </Card>
                                                        </div>
                                                    );
                                                })
                                                :
                                                <div>Loading...</div>
                                            }
                                        </Slider>

                                        <h3 style={underline}>Trending TV Shows</h3>
                                        <Slider style={{ marginTop: 30, marginBottom: 40, backgroundColor: '#a8c0f3', padding: 20, borderRadius: 8}} {...settings}>
                                            {popularShows ?
                                                popularShows.map((item, index) => {
                                                    return (
                                                        <div key={index} style={{ width: 218, height: 330 }}>
                                                            <Card style={{ width: '95%', height: '95%', marginLeft: '5%', marginRight: '5%' }} as="div">
                                                                <a style={{ cursor: 'pointer' }} onClick={handleMediaPage(item.id, "tv")}>
                                                                    <Card.Img style={{ width: '100%', height: '100%' }} src={basePosterPath + item.poster_path} />
                                                                </a>
                                                            </Card>
                                                        </div>
                                                    );
                                                })
                                                :
                                                <div>Loading...</div>
                                            }
                                        </Slider>
                                    </Col>
                                </Row>
                                <br />
                            </Col>
                        </Row>
                    </div>
                    <Footer />
                </div>
                : // NOT LOGGED IN
                <div fluid style={body}>
                    <Header />
                    <Row style={header}>
                        <div style={heading}>
                            <span style={headingTitle}>
                                <img style={headingLogo} src={logo} alt="Logo" />
                                <h1 style={title}>MEDIA TRACKER</h1>
                            </span>
                            <h4 style={slogan}>Keep all of your shows and movies in one place.</h4>
                        </div>
                    </Row>
                    <div style={ornament} />
                    <Row style={blurb}>
                        <h3 style={blurbTitle}><strong>Keep Track of your Media</strong></h3>
                        <p style={paragraph}><strong>Media Tracker</strong> is an application that helps you keep track of your TV shows and movies while also connecting you with others who share the same interests. With Media Tracker, you can rate and organize your shows, keep track of trending series, and discuss your favorite media in forums while gaining titles, friends, and more! </p>
                        <p style={paragraph}>Your input helps others discover your favorite shows and movies. Start contributing today and become a part of the Media Tracker community!
                    <br />
                        </p>
                    </Row>
                    <Footer />
                </div>
            }
        </div>
    );
};
const NextArrow = props => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, borderRadius: 50, display: "block", background: "lightgrey" }}
            onClick={onClick}
        />
    );
}
const PrevArrow = props => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, borderRadius: 50, display: "block", background: "lightgrey" }}
            onClick={onClick}
        />
    );
}
const underline = {
    textAlign: 'left',
    color: '#1F57A4',
    borderBottomStyle: 'solid',
    borderBottomColor: 'cornflowerBlue',
    borderBottomWidth: 2,
    fontSize: '25pt',
    fontFamily: 'Impact'
};

const body = {
    width: '100%',
    overflowY: 'hide'
};

const headingStyle = {
    width: '50%',
    margin: '30px auto 0 auto',
    display: 'block',
    fontFamily: 'Impact',
    fontSize: '35pt',
    textAlign: 'center',
    color: '#2d74da',
};

const homeBody = {
    // backgroundColor: 'whiteSmoke',
    // paddingTop: 50,
    // paddingBottom: 30,
    // paddingLeft: 50,
    // paddingRight: 50,
    marginTop: 10,
    marginRight: 50,
    marginBottom: 20,
    marginLeft: 50,
    borderRadius: 5
};

const header = {
    height: '84vh',
    width: '99.7vw',
    backgroundColor: 'black',
    color: 'white',
    backgroundImage: 'linear-gradient(45deg, #000000 25%, #000824 25%, #003352 50%, #000000 50%, #0D3357 75%, #003352 75%, #003352 100%)',
    backgroundSize: '707.11px 707.11px'
};

const heading = {
    width: '100%',
    display: 'block',
    margin: 'auto',
    marginLeft: '20%'
};
const headingTitle = {
    display: 'flex',
    margin: 'auto',
};
const title = {
    width: '60%',
    fontSize: '4em',
    fontFamily: 'Impact',
    marginLeft: '.5em',
    borderBottomStyle: 'solid',
    borderBottomColor: 'white',
    borderBottomWidth: '2px',
};
const headingLogo = {
    width: '100px',
    height: '100px'
};
const slogan = {
    opacity: '.5',
    color: 'white',
    marginLeft: '5.5em',
    marginTop: '.5em'
};
const ornament = {
    backgroundColor: '#2D74DA',
    padding: '1.5em'
};
const blurb = {
    padding: '5% 10% 5% 10%',
    backgroundColor: '#0d1a26',
    textAlign: 'left',
    color: 'white',
    width: '99.7vw'
};
const blurbTitle = {
    width: '50%',
    color: '#009BEF',
    paddingBottom: '.3em',
    borderBottomStyle: 'solid',
    bordBottomColor: '#56ACF2',
    borderBottomWidth: '3',
    marginBottom: '1em'
};
const paragraph = {
    color: 'white',
    display: 'block',
    fontSize: '1.2em'
};
export default withRouter(Home);