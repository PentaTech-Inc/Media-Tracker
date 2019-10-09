/**
 * SearchBar
 * @summary This component is the default search bar used to query for movies or shows.
 */
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';


const SearchBar = props => {
    const router = useRouter();
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
        if (input === "")
            router.push('/search');
        else
            router.push('/search?title=' + input.split(" ").join("\+"));
    };

    return (
        <div>
            <Form inline>
                <FormControl size='sm' onChange={handleChange} type="text" placeholder="Search" className="mr-sm-2" />
                <Button size='sm' variant={props.buttonStyle ? props.buttonStyle : 'light'} type='submit' onClick={handleSubmit}><FaSearch /></Button>
            </Form>
        </div>
    );
};

export default SearchBar;