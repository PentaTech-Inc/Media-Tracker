/**
 * SearchBar
 * @summary This component is the default search bar used to query for movies or shows.
 */
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { Nav } from 'react-bootstrap';

const buttonStyle = {
    backgroundColor: 'whitesmoke',
    borderRadius: 5,
}

const SearchBar = props => {

    return (
        <div>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Nav.Link href={"/search"} style={buttonStyle}>Search</Nav.Link>
            </Form>
        </div>
    );
};

export default SearchBar;