import React from 'react';
import { Card, Button } from 'react-bootstrap';

const cardImageStyle = {
    width: 185,
    height: 278,
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
        <Card style={{ width: '18rem' }} className="text-center">
            <Card.Header>
                <Card.Img variant="top" style={cardImageStyle} src={posterBaseURL + posterPath} />
            </Card.Header>
            <Card.Body>
                <Card.Title>{title} ({releaseDate.length > 4 ? releaseDate.substring(0, 4) : ""})</Card.Title>
                <Card.Text>
                    <i>{overview}</i>
                </Card.Text>
                <Button variant="primary">Add to list</Button>
            </Card.Body>
        </Card>
    );
};

export default ResultCard;