/**
 * Search
 * @summary This page will display search results.
 * Data for the search request is passed as a query string from the previous page.
 * Will request search results from our server here.
 */

import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { searchByTitle } from '../utils/API';
import 'bootstrap/dist/css/bootstrap.min.css';


const rowStyle = {
    width: '100%',
};

const colStyle = {
    padding: 0,
    margin: 0
};

const resultsStyle = {
    border: '1px solid #DDD',
    borderRadius: 5,
    padding: 3
};

const tabsStyle = {
    padding: 5
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
    const results = (props.result !== null ? props.result : null); // save results of API call in getIntialProps

    return (
        <Layout>
            <Container fluid>
                <Row style={rowStyle}>
                    <Col style={colStyle}><h1>Search</h1></Col>
                </Row>
                <br />
                <Row>
                    <Col style={colStyle}><SearchBar buttonStyle='dark' /></Col> {/* ...props to implement child components inheriting size? */}
                </Row>
                <br />
                <Row style={rowStyle}>
                    {
                        // If no search was made, just '--domain--/search', omit search results section
                        results !== null ?
                            <div>
                                <h5>Results for:</h5>

                                <p>{`${router.query.title}`}</p>
                                <div style={resultsStyle}>
                                    <Tabs style={tabsStyle} defaultActiveKey="movies" id="results-tab">
                                        <Tab eventKey="movies" title="Movies">
                                            {
                                                results.movies.map((item, index) => {
                                                    return (
                                                        <div key={index} style={cardStyle}>
                                                            <p style={itemStyle}><b>{index + 1}</b>) {item.title}</p>
                                                            <p style={itemStyle}><i>{item.overview}</i></p>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </Tab>
                                        <Tab eventKey="shows" title="Shows">
                                            {
                                                results.shows.map((item, index) => {
                                                    return (
                                                        <div key={index} style={cardStyle}>
                                                            <p style={itemStyle}><b>{index + 1}</b>) {item.name}</p>
                                                            <p style={itemStyle}><i>{item.overview}</i></p>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                            :
                            null
                    }
                </Row>
            </Container>
        </Layout>
    );
};

// possibly return query in return object to remove useRouter() dependency?
Search.getInitialProps = async ({ req, query: { title } }) => {
    // avoids unnecessary call to API if no query params were given
    if (typeof title !== 'undefined' && title.replace(/^\s+/, '').replace(/\s+$/, '') !== '') {
        const res = await searchByTitle(title);

        // returns object with movie and tv show results (res.response.movies OR res.response.shows)
        return { result: res.response }
    } else {
        return { result: null }
    }
};

export default Search;