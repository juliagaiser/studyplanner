

import React from 'react';

import Footer from "./Footer";
import Navbar from './Navbar';
import HeroView from './HeroView';


function HomePageTextView() {
    return (

        <div className="page-container">
            <Navbar />
            <div className="content-container">
                <HeroView />
            </div>
            <Footer />
        </div>
    );
}

export default HomePageTextView;

