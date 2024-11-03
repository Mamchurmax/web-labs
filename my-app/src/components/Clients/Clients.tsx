import "./Clents.css";
import React from "react";

type Client = {
    review: string;
    imgSrc: string;
    name: string;
};

type ClientsProps = {
    clients: Client[];
};

function Clients({ clients }: ClientsProps) {
    return (
        <section className="clients">
            <h2 className="arkr">ABOUT US</h2>
            <p className="clients-text">Our Awesome Clients</p>
            <div className="clients-div">
                {clients.map((client, index) => (
                    <div key={index} className={`client ${index === 0 ? "first" : index === 1 ? "second" : "third"}`}>
                        <p className="client-review">{client.review}</p>
                        <div className="client-info">
                            <img src={client.imgSrc} alt={client.name} />
                            <h6>{client.name}</h6>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Clients;
