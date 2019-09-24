import React from 'react';
import Carousel from 'nuka-carousel';
import theOfficeCover from '../assets/The_Office_Cover.png';
import parksAndRecCover from '../assets/Parks_And_Rec_Cover.png';
import gotCover from '../assets/GOT_Cover.jpg';
import '../styles/index.css';

const listStyle = {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "grey"
};

const CardsList = props => {
    mixins: [Carousel.ControllerMixin];
    return (
        <div>
            <h5>{props.title}</h5>
            <div style={listStyle}>
                <Carousel slidesToShow={3} cellAlign="left" slidesToScroll={3} cellSpacing={10}>
                    <img src={theOfficeCover} />
                    <img src={parksAndRecCover} />
                    <img src={gotCover} />
                    <img src={theOfficeCover} />
                    <img src={parksAndRecCover} />
                    <img src={gotCover} />
                </Carousel>
            </div>
        </div>
    );
};

export default CardsList;