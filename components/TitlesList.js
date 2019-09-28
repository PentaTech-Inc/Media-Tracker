/**
 * TitlesList
 * @summary A component that returns a list of titles
 */

import React from 'react';

const listStyle = {
    backgroundColor: '#C0C0C0',
    listStyle: 'none',
    paddingBottom: 1,
    paddingTop: 6,
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 5
}

const itemStyle = {
    backgroundColor: '#DCDCDC',
    marginBottom: 5,
    paddingLeft: 10,
    borderRadius: 5
}

const TitlesList = props => {

    return (
        <div>
            <h5>{props.title}</h5>
            <ul style={listStyle}>
                <li style={itemStyle}>The Office</li>
                <li style={itemStyle}>Parks and Rec</li>
                <li style={itemStyle}>Game of Thrones</li>
                <li style={itemStyle}>The Office</li>
                <li style={itemStyle}>Parks and Rec</li>
                <li style={itemStyle}>Game of Thrones</li>
            </ul>
        </div>
    );
}

export default TitlesList;