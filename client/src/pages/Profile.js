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

const Profile = props => {
    const [details, setDetails] = useState({ data: {} });
    const [lists, setLists] = useState({ data: {} });
    const [stats, setStats] = useState({
        totalMoviesWatched: 0,
        totalShowsWatched: 0,
        totalRuntimeMovies: 0,
        totalEpisodeCount: 0
    });

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    useEffect(() => {
        fetch("/api/getUserDetails", { credentials: 'include' })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            }).then(data => {
                setDetails({ data: data });
                fetch("/api/getUserLists?name=" + data.username)
                    .then(res => {
                        if (res.status === 200) {
                            return res.json();
                        }
                    }).then(data => {
                        setLists({ data: data });
                        let runtime = 0;
                        let seasonCount = 0; // seasons count
                        data.movies.map((item, index) => {
                            runtime += item.runtime;
                        });
                        data.shows.map((item, index) => {
                            seasonCount += item.seasons;
                        });
                        setStats({
                            totalMoviesWatched: data.movies.length,
                            totalShowsWatched: data.shows.length,
                            totalRuntimeMovies: runtime,
                            totalSeasonCount: seasonCount
                        });
                    });
            })
            .catch(err => {
                console.error(err);
                alert('Error checking for valid token.');
            });
    }, []);

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

    let date = details.data.dateJoined + ""; // make string
    date = date.substring(4, 7) + " " + date.substring(11, 15);
    return (
        <Layout>
            <h1 style={{ borderBottom: '1px solid black' }}>{details.data.username}</h1>
            <div className="fluid">
                <Row style={rowStyle} className="align-items-center">
                    <Col md={5} lg={4} className="justify-content-center">
                        <div>
                            <img src={details.data.avatar} alt="profile" style={profileImg} />
                            <br />
                            <h5 style={username}><FaCalendar /> Joined {date}</h5>
                        </div>
                        <br />
                        <div>
                            <h4 style={underline}>Statistics</h4>
                            <ul style={{ textAlign: 'left', listStyle: 'none' }}>
                                <li><strong>Movies watched: </strong>{stats.totalMoviesWatched} movies</li>
                                <li><strong>Total runtime: </strong>{stats.totalRuntimeMovies} min</li>
                                <li><strong>Shows watched: </strong>{stats.totalShowsWatched} shows</li>
                                <li><strong>Seasons binged: </strong>{stats.totalSeasonCount} seasons</li>
                            </ul>
                        </div>
                    </Col>

                    <Col md={7} lg={8}>
                        <h3 style={underline}>Movies Watched</h3>
                        <Slider style={{ marginTop: 10, marginBottom: 30 }} {...settings}>
                            {lists.data.movies ? (lists.data.movies).map((item, index) => {
                                return (
                                    <div key={index} style={{ width: 105, height: 198 }}>
                                        <Card style={{ marginLeft: 5, marginRight: 5 }}>
                                            <a style={{ cursor: 'pointer' }} onClick={handleMediaPage(item.id, "movie")}>
                                                <Card.Img src={"http://image.tmdb.org/t/p/w185_and_h278_bestv2" + item.posterPath} />
                                            </a>
                                        </Card>
                                    </div>
                                );
                            })
                                :
                                <div>
                                    <p>Use Search to add movies!</p>
                                </div>
                            }
                        </Slider>
                        <br />
                        <h3 style={underline}>Shows Watched</h3>
                        <Slider style={{ marginTop: 10, marginBottom: 30 }} {...settings}>
                            {lists.data.shows ? (lists.data.shows).map((item, index) => {
                                return (
                                    <div key={index} style={{ width: 105, height: 198 }}>
                                        <Card style={{ marginLeft: 5, marginRight: 5 }}>
                                            <a style={{ cursor: 'pointer' }} onClick={handleMediaPage(item.id, "tv")}>
                                                <Card.Img src={"http://image.tmdb.org/t/p/w185_and_h278_bestv2" + item.posterPath} />
                                            </a>
                                        </Card>
                                    </div>
                                );
                            })
                                :
                                <div>
                                    <p>Use Search to add shows!</p>
                                </div>
                            }
                        </Slider>
                    </Col>
                </Row>


            </div>
        </Layout >
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