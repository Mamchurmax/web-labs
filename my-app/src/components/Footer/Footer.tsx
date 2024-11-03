import "./footer.css";
import React from "react";
import Logo from "../../assets/imgs/logologo.svg";
import Facebook from "../../assets/imgs/f.svg";
import Twitter from "../../assets/imgs/t.svg";
import Instagram from "../../assets/imgs/i.svg";

function Footer(){
    return(
        <footer>
            <h4>Copyright @ 2019</h4>
            <img className="foot-logo" src={Logo} alt="logo"/>
            <div className="social">
                <a href=""><img src={Facebook} alt="facebook"/></a>
                <a href=""><img src={Twitter} alt="twitter"/></a>
                <a href=""><img src={Instagram} alt="instagram"/></a>
            </div>
        </footer>
    );
}
export default Footer;