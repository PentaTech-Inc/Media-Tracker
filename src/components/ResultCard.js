import React from 'react';
import { Card, Button } from 'react-bootstrap';

const cardStyle = {
    backgroundColor: '#212121'
};

const cardHeaderStyle = {
    backgroundColor: 'whitesmoke'
};

const cardImageStyle = {
    width: 185,
    height: 278,
};

const cardTitleStyle = {
    color: 'whitesmoke',
    height: '4rem'
};

const cardTextStyle = {
    color: 'lightgrey',
    height: '3rem'
};

const ResultCard = props => {
    let title = "";
    let overview = "";
    let releaseDate = "";
    let posterPath = "";
    if (props.title)
        title = props.title;
    if (props.overview)
        overview = props.overview;
    if (props.release_date)
        releaseDate = props.release_date;
    if (props.poster)
        posterPath = props.poster;
    const posterBaseURL = "http://image.tmdb.org/t/p/w185_and_h278_bestv2/"

    return (
        <Card style={cardStyle} className="text-center">
            <Card.Header style={cardHeaderStyle}>
                <Card.Img variant="top" style={cardImageStyle} src={posterBaseURL + posterPath} />
            </Card.Header>
            <Card.Body>
                <Card.Title style={cardTitleStyle}>{title} ({releaseDate.length > 4 ? releaseDate.substring(0, 4) : ""})</Card.Title>
                <Card.Text style={cardTextStyle}>
                    <i>{overview.length < 100 ? overview : overview.substring(0, 96) + "..."}</i>
                </Card.Text>
                <Card.Footer>
                    <Button>Add to list</Button>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};

export default ResultCard;