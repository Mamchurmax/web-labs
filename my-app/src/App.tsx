import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HeroSection from "./components/HeroSection/HeroSection";
import LearnMore from "./components/LearnMore/LearnMore";
import Apply from "./components/Apply/Apply";
import Clients from "./components/Clients/Clients";

function App(){
    return(
        <>
            <Header/>
            <main>
                <HeroSection/>
                <LearnMore/>
                <Apply/>
                <Clients/>
            </main>
            <Footer/>
        </>
    );
}
export default App;