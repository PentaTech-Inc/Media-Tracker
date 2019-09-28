/**
 * SearchBar
 * @summary This component is the default search bar used to query for movies or shows.
 */
import { Form, FormControl } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { useState } from 'react';


const buttonStyle = {
    backgroundColor: 'whitesmoke',
    borderRadius: 5,
}

const SearchBar = () => {
    const [input, setInput] = useState('');

    // handles the changes in search bar's input field and updates the state of input var
    const handleChange = event => {
        setInput(event.target.value);
    };

    return (
        <div>
            <Form inline>
                <FormControl onChange={handleChange} type="text" placeholder="Search" className="mr-sm-2" />
                <Nav.Link href={ "/search?title=" + input } style={buttonStyle}>Search</Nav.Link>
            </Form>
        </div>
    );
};

export default SearchBar;