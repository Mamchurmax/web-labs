import React from "react";
import "./LearnMore.css";
import Illustraton from "../../assets/imgs/Illustration.svg";
function LearnMore(){
    return (
        <section className="About">
            <div>
                <div className="about-top">
                    <h2 className="US">ABOUT US</h2>
                    <p className="about-p">The occupational traffic permit is one of the most important things in the
                        company when carrying out freight transport. In fact, it is a prerequisite for doing business
                        traffic at all. </p>
                </div>
                <div className="about-bot">
                    <p className="about info">How do you do when you need to obtain
                        a commercial traffic permit for freight transport to your business?</p>
                </div>
            </div>
            <img className="ill" src={Illustraton} alt="illustration"/>

        </section>

    )
}
export default LearnMore