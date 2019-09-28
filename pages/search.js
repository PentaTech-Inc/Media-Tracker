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


const Search = props => {
    const router = useRouter();

    return (
        <Layout>
            <h1>Search</h1>
            <p>{`Res: ${props.result.data}`}</p>
            <p>{`Query: ${router.query.title}`}</p>
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