/**
 * TitlesList
 * @summary A component that returns a list of titles
 */

import React from 'react';
import { useState, useEffect } from 'react';


const TitlesList = props => {
    let type = "";
    if (props.type)
        type = props.type;
    const [details, setDetails] = useState({ data: {} })
    const [lists, setLists] = useState({ data: {} })

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
                    });
            })
            .catch(err => {
                console.error(err);
                alert('Error checking for valid token.');
            });
    }, []);

    return (
        <div>
            <h5 style={heading}>{props.title}</h5>
            <ul style={listStyle}>
                {(type === "movie" && lists.data.movies) ? (lists.data.movies).map((item, index) => {
                    return (
                        <li key={index} style={itemStyle}>{item.title}</li>
                    );
                })
                    :
                    null
                }
                {(type === "tv" && lists.data.shows) ? (lists.data.shows).map((item, index) => {
                    return (
                        <li key={index} style={itemStyle}>{item.title}</li>
                    );
                })
                    :
                    null
                }
            </ul>
        </div>
    );
}

const heading = {
    fontFamily: 'Impact',
    fontSize: '25pt',
    color: '#b0bef3',
    marginTop: '5px',
    display: 'block',
    backgroundColor: '#1c496d',
    padding: '15px 10px 10px 10px'
};

const listStyle = {
    backgroundColor: '#d1d7f4',
    listStyle: 'none',
    paddingBottom: 1,
    paddingTop: 6,
    paddingLeft: 3,
    paddingRight: 5,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
    minHeight: 50,
    fontWeight: 'bold',
    marginBottom: '50px',
    color: '#252e6a'
}

const itemStyle = {
    marginBottom: 7,
    paddingLeft: 10,
    borderRadius: 5,
}

export default TitlesList;