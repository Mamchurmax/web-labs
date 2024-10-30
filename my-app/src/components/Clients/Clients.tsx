import React from "react";
import "./Clents.css";
import Isak from "../../assets/imgs/isak.svg";
import Simon from "../../assets/imgs/simon.svg";
import Isak2 from "../../assets/imgs/isakPeterson.svg";
function Clients(){
    return (
        <section className="clients">

            <h2 className="arkr">ABOUT US</h2>
            <p className="clients-text">Our Awesome Clients</p>

            <div className="clients-div">
                <div className="client first">
                    <p className="client-review">Yes, you will need to have the landowner sign the permit application as
                        the Permittee, and you sign the permit as the Applicant or Agent for the Permittee.</p>
                    <div className="client-info">
                        <img src={Isak2} alt="Isak1"/>
                        <h6>Isak Pettersson</h6>
                    </div>
                </div>
                <div className="client second">
                    <p className="client-review">From most barricade or traffic control companies located in the phone
                        book. They employ certified Traffic Control Supervisors (TCS) who can generate and certify the
                        traffic control plan. </p>
                    <div className="client-info">
                        <img src={Simon} alt="Simon"/>
                        <h6>Simon Sandberg</h6>
                    </div>

                </div>
                <div className="client third">
                    <p className="client-review">An A-Line, or access restriction deed is a property right that has been
                        obtained by CDOT for the sole purpose of prohibiting direct</p>
                    <div className="client-info">
                        <img src={Isak} alt="Isak2"/>
                        <h6>Isak Pettersson</h6>
                    </div>
                </div>

            </div>
        </section>
    )
}
export default Clients