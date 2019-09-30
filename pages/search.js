/**
 * Search
 * This page will display search results.
 * Data for the search request is passed as a query string from the previous page.
 * Will request search results from our server here.
 */

import Layout from '../components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import { useRouter } from 'next/router';
import { searchMovieByTitle, searchShowByTitle } from '../utils/API';
import 'bootstrap/dist/css/bootstrap.min.css';


const containerStyle = {
    padding: 0,
    margin: 0
};

const rowStyle = {
    width: '100%',
    paddingLeft: 0,
    paddingRight: 0
};

const cardStyle = {
    backgroundColor: 'lightgray',
    borderRadius: 5,
    padding: 5,
    margin: 5
};

const itemStyle = {
    margin: 0
};

const Search = props => {
    const router = useRouter();
    const results = props.result; // save results of api call (saved as an array)

    return (
        <Layout>
            <Container style={containerStyle}>
            <Row style={rowStyle}>
            <Col><h1>Search</h1></Col>
            </Row>
            <br />
            <Row style={rowStyle} float='center'>
            <Col><SearchBar /></Col> {/* ...props to implemenet child components inheriting size */}
            </Row>
            <br />
            { 
                // If no search was made, just '--domain--/search', omit search results section
                typeof router.query.title !== 'undefined' ?
                    <div>
                        <h5>Results for:</h5>
                        <p>{`${router.query.title}`}</p>
                        {
                            results.map((item, index) => {
                                return (
                                    <div key={index} style={cardStyle}>
                                        <p style={itemStyle}><b>{index+1}</b>) {item.title}</p>
                                        <p style={itemStyle}><i>{item.overview}</i></p>
                                    </div>
                                );
                            })
                        }
                    </div>
                :
                    null
            }
            </Container>
        </Layout>
    );
};

// possibly return query in return object to remove useRouter() dependency?
Search.getInitialProps = async ({req, query: { title }}) => {
    // avoids unneccessary call to API if no query params were given
    if (typeof title !== 'undefined') {
        console.log('in here')
        const res = await searchMovieByTitle(title);

        return { result: res.response }
    } else {
        console.log('it worked');
        return { result: 'undefined'}
    }
};

export default Search;