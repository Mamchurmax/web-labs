import "./header.css";
import React from "react";
import Logo from "../../assets/imgs/logologo.svg";
import BGscene from "../../assets/imgs/BackgroundScenebg.svg";

function Header(){
    return (
        <div>
        <div className="background-container">
            <img className="background-image" src={BGscene} alt="background-image"/>
        </div>
    <header className="header">


        <a href="#"> <img className="logo" src={Logo} alt="logo"/></a>

        <nav>

        <a href="">ABOUT</a>
                <a href="">HOW TO</a>
                <a href="">FAQS</a>
                <a className="contact-btn" href="">CONTACT US</a>

            </nav>
            <div className="hamburger">
                <div id="line1"></div>
                <div id="line2"></div>
                <div id="line3"></div>
            </div>

        </header>
        </div>
    );
}

export default Header;