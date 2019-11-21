import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const ResultCard = props => {
    let id = -1;
    let type = "";
    let title = "";
    let overview = "";
    let releaseDate = "";
    let posterPath = "";
    if (props.id)
        id = props.id;
    if (props.type)
        type = props.type;
    if (props.title)
        title = props.title;
    if (props.overview)
        overview = props.overview;
    if (props.release_date)
        releaseDate = props.release_date;
    if (props.poster)
        posterPath = props.poster;
    const posterBaseURL = "http://image.tmdb.org/t/p/w185_and_h278_bestv2/";

    const handleMediaPage = (event) => {
        event.preventDefault();
        fetch("/api/addTitle?id=" + id + "&type=" + type)
            .then(res => {
                if (res.status === 200) {
                    props.history.push("/media?id=" + id + "&type=" + type);
                } else if (res.status === 202) {
                    props.history.push("/media?id=" + id + "&type=" + type);
                } else if (res.status === 500) {
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

    const handleClick = (event) => {
        event.preventDefault();
        fetch("/api/addTitle?id=" + id + "&type=" + type)
            .then(res => {
                if (res.status === 200) {
                    console.log("Title added successfully.");
                } else if (res.status === 202) {
                    console.log("Title already in database.");
                } else if (res.status === 500) {
                    alert("Error adding title to list.");
                    return;
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error adding title to list. Please try again, or email us for further assistance.');
                return;
            });
        fetch("/api/addToList?id=" + id + "&type=" + type)
            .then(res => {
                if (res.status === 200) {
                    alert("Added to list!");
                } else if (res.status === 202) {
                    alert("Added to list");
                } else if (res.status === 500) {
                    alert("Error: Insufficient information for title. Available only as a search result.")
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error adding title to list. Please try again.');
            });
    };

    return (
        <Card style={cardStyle} className="card text-center">
            <Card.Header style={cardHeaderStyle}>
                <a style={{ cursor: 'pointer' }} onClick={handleMediaPage}>
                    <Card.Img variant="top" style={cardImageStyle} src={posterBaseURL + posterPath} />
                </a>
            </Card.Header>
            <Card.Body>
                <Card.Title style={cardTitleStyle}>{title} ({releaseDate.length > 4 ? releaseDate.substring(0, 4) : ""})</Card.Title>
                <Card.Text style={cardTextStyle}>
                    <i>{overview.length < 100 ? overview : overview.substring(0, 96) + "..."}</i>
                </Card.Text>
                <Card.Footer>
                    <Button onClick={handleClick}>Add to list</Button>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};

const cardStyle = {
    backgroundColor: '#212121'
};

const cardHeaderStyle = {
    backgroundColor: 'whitesmoke'
};

const cardImageStyle = {
    width: '185px',
    height: '278px',
};

const cardTitleStyle = {
    color: 'whitesmoke',
    height: '65px'
};

const cardTextStyle = {
    color: 'lightgrey',
    height: '40px'
};

export default withRouter(ResultCard);