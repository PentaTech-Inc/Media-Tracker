/**
 * Search
 * This page will display search results.
 * Data for the search request is passed as a query string from the previous page.
 * Will request search results from our server here.
 */

import { searchMovieByTitle, searchShowByTitle } from '../utils/API';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';


const cardStyle = {
    backgroundColor: 'lightgray',
    borderRadius: 5,
    padding: 5,
    margin: 0
};

const itemStyle = {
    margin: 0
};

const Search = props => {
    const router = useRouter();
    const results = props.result; // save results of api call (saved as an array)

    return (
        <Layout>
            <h1>Search</h1>
            <br />
            <h5>Query</h5>
            <p>{`${router.query.title}`}</p>
            <h5>Results</h5>
            {
                results.map((item, index) => {
                    return (
                        <div key={index} style={cardStyle}>
                            <p style={itemStyle}>{`${index+1}) ${item.title}`}</p>
                        </div>
                    );
                })
            }

            <div>
                <p>{}</p>
            </div>
        </Layout>
    );
};

// possibly return query in return object to remove useRouter() dependency?
Search.getInitialProps = async ({req, query: { title }}) => {
    const res = await searchMovieByTitle(title);

    return { result: res.response }
};

export default Search;