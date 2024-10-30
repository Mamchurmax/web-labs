import React from "react";
import "./Apply.css";
import Applyimg from "../../assets/imgs/apply.svg";
function Apply(){
    return (
        <section className="apply">
            <div className="apply-div-img">
                <img className="apply-img" src={Applyimg} alt="apply"/>
            </div>
            <div className="apply-info">
                <h2>HOW TO APPLY</h2>
                <p className="apply-text">
                    When applying for a traffic permit, there are certain requirements that you must meet that are
                    included in the examination: requirements for professional knowledge, solid establishment, good
                    reputation and financial resources. Important to remember is to confirm your application for a
                    traffic permit by the company's company signer or CEO.
                </p>
            </div>
        </section>

    )
}
export default Apply