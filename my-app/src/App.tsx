import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HeroSection from "./components/HeroSection/HeroSection";
import LearnMore from "./components/LearnMore/LearnMore";
import Apply from "./components/Apply/Apply";
import Clients from "./components/Clients/Clients";
import Isak2 from "./assets/imgs/isakPeterson.svg";
import Simon from "./assets/imgs/simon.svg";
import Isak from "./assets/imgs/isak.svg";

function App() {
    const clientsData = [
        {
            review: "Yes, you will need to have the landowner sign the permit application as the Permittee, and you sign the permit as the Applicant or Agent for the Permittee.",
            imgSrc: Isak2,
            name: "Isak Pettersson"
        },
        {
            review: "From most barricade or traffic control companies located in the phone book. They employ certified Traffic Control Supervisors (TCS) who can generate and certify the traffic control plan.",
            imgSrc: Simon,
            name: "Simon Sandberg"
        },
        {
            review: "An A-Line, or access restriction deed is a property right that has been obtained by CDOT for the sole purpose of prohibiting direct",
            imgSrc: Isak,
            name: "Isak Pettersson"
        }
    ];

    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <LearnMore />
                <Apply />
                <Clients clients={clientsData} />
            </main>
            <Footer />
        </>
    );
}

export default App;