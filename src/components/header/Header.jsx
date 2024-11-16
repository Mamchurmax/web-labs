import "./header.css";
import React from "react";
import Logo from "../../assets/imgs/logologo.svg";
import {Link} from "react-router-dom";

function Header(){
    return (
        <div>
            <header className="header">


                <Link to={"/"}> <img className="logo" src={Logo} alt="logo"/></Link>

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