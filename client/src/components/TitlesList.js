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
            <h5>{props.title}</h5>
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

const listStyle = {
    backgroundColor: '#C0C0C0',
    listStyle: 'none',
    paddingBottom: 1,
    paddingTop: 6,
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 5,
    minHeight: 50
}

const itemStyle = {
    backgroundColor: '#DCDCDC',
    marginBottom: 5,
    paddingLeft: 10,
    borderRadius: 5
}

export default TitlesList;