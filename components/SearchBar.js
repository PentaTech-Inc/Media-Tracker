/**
 * SearchBar
 * @summary This component is the default search bar used to query for movies or shows.
 */
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const SearchBar = props => {
    return (
        <div>
            <Form inline>
                <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
                <Button type="submit" variant="light" size="sm" onClick=""> Submit</Button>
            </Form>
        </div>
    );
};

export default SearchBar;