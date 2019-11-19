/**
 * SearchBar
 * @summary This component is the default search bar used to query for movies or shows.
 */
import React from 'react';
import { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';


const SearchBar = props => {
    const [input, setInput] = useState(''); // state of input in search bar

    // handles the changes in search bar's input field and updates the state of input var
    const handleChange = event => {
        setInput(event.target.value);
    };

    // handles submission of search form
    /*
        leading and trailing whitespace
        consecutive whitespace in between
    */
    const handleSubmit = event => {
        event.preventDefault();
        if (input === "") {
            props.history.push("/search");
        }
        else {
            props.history.push("/search?title=" + escape(input).split("%20").join("\+"))
        }
    };

    return (
        <div>
            <Form style={{ marginRight: 5 }} inline>
                <FormControl style={{ width: 164 }} size='sm' onChange={handleChange} type="text" placeholder="Search" className="mr-sm-2 " />
                <Button size='sm' variant={props.buttonStyle ? props.buttonStyle : 'light'} type='submit' onClick={handleSubmit}><FaSearch /></Button>
            </Form>
        </div>
    );
};

export default withRouter(SearchBar);