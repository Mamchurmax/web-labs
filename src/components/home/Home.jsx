import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import HeroSection from "./HeroSection";

import './Home.css';

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <HeroSection />
            </main>
            <Footer />
        </>
    );
}
