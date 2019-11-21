/**
 * Layout
 * @summary This component gives basic styling to the structure of the page.
 * Will help keep the site's identity consistent throughout pages.
 * Header will be present in all pages to provide navigation.
 * {props.children} is to display all other components that inside Layout.
 */

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/index.css';


const layoutStyle = {
    backgroundColor: 'whitesmoke',
    margin: 20,
    padding: 20,
    border: '1px solid #DDD',
    borderRadius: 5,
    minHeight: '45vh'
};

const site = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
};

const siteContent = {
    flex: '1 0 auto',
    padding: 'var(--space) var(--space) 0',
    width: '100%'
};



/**
 * @param props consists of the components between <Layout> *props* </Layout> tags
 * @returns Layout component with Header and formatted page content
 */
const Layout = props => {
    return (
        // <div className="Site">
        <div style={site}>
            {/* <div className="Site-content"> */}
             <div style={siteContent}>
                <Header /> {/* will be displayed across all pages */}
                <div style={layoutStyle}>
                    {props.children} {/* page's actual content */}
                </div>
            </div>
            <Footer /> {/* will be displayed on all pages */}
        </div>
    );
};

export default Layout;