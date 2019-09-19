/**
 * About
 * @summary The about page for our site.
 * Describes what the service does and how it benefits users.
 */

import Layout from '../components/Layout';

const About = () => {

    return (
        <Layout>
            <h1>About</h1>
            <p><strong>Media Tracker</strong> is an application that helps keep track of the shows
            and movies you watch, while also making it social! Participate in a
            forum for each title and contribute to its rating. Your input helps
            others discover your favorite shows and movies by giving them the
            confidence to start watching.
            <br />
                - <strong>The PentaTech Team</strong>
            </p>
        </Layout>
    );
};

export default About;