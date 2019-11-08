import React from 'react';

const cardStyle = {
    backgroundColor: 'lightgray',
    borderRadius: 5,
    padding: 5,
    margin: 5
};

const itemStyle = {
    margin: 0
};

const ResultCard = props => {
    const title = props.title;
    const overview = props.overview;
    const release_date = props.release_date;

    return (
        <div style={cardStyle}>
            <p style={itemStyle}>{title} ({release_date.substring(0, 4)})</p>
            <p style={itemStyle}><i>{overview}</i></p>
        </div>
    );
};

export default ResultCard;