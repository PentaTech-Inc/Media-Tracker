/**
 * TitlesCarousel
 * @summary A component that returns a responsive carousel with cover photos for lists
 */

import React from 'react';
import Carousel from 'nuka-carousel';
import theOfficeCover from '../assets/The_Office_Cover.png';
import parksAndRecCover from '../assets/Parks_And_Rec_Cover.png';
import gotCover from '../assets/GOT_Cover.jpg';

const listStyle = {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "grey",
};

const TitlesCarousel = props => {
    mixins: [Carousel.ControllerMixin];
    return (
        <div style={{ width: '100%' }}>
            <h5>{props.title}</h5>
            <div style={listStyle}>
                <Carousel slidesToShow={3} cellAlign="left" slidesToScroll={3} cellSpacing={10}
                    renderCenterLeftControls={({ previousSlide }) => (
                        <button onClick={previousSlide}>&lt;</button>)}
                    renderCenterRightControls={({ nextSlide }) => (
                        <button onClick={nextSlide}>&gt;</button>)} >
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

export default TitlesCarousel;