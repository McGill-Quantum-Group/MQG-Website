import React, { useState } from "react";
import { useEffect } from "react";
import "./Pages.css";

import mqgLogo from "../images/MQG.webp";

function InformationPictures({ infoDict }) {
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {infoDict.map((info, index) => (
        <div key={index}>
          <img
            style={{ borderRadius: "50%", width: "200px" }}
            src={info.image}
            alt={`Exec #${index}`}
          />
          <p
            style={{
              textAlign: "center",
              margin: "0px",
            }}
          >
            <b>{info.name}</b>
            <br />
            {info.role}
          </p>
        </div>
      ))}
    </div>
  );
}

function AboutPage({ title, text }) {
  const [startFade, setStartFade] = useState(false);
  const executives = [
    { name: "A", role: "AA", image: mqgLogo },
    { name: "A", role: "VP", image: mqgLogo },
    { name: "A", role: "Prez", image: mqgLogo },
    { name: "A", role: "Teacher", image: mqgLogo },
    { name: "Wentao", role: "Laid off", image: mqgLogo },
  ];
  const professors = [
    { name: "Dr. Meta", role: "Chair of scrolling", image: mqgLogo },
    { name: "Doum Sckrol", role: "PhD Scrolling - Advisor", image: mqgLogo },
  ];
  const sponsors = [
    { name: "Instagram", image: mqgLogo },
    { name: "The House of Tao", image: mqgLogo },
  ];

  useEffect(() => {
    setStartFade(true);
  }, []);

  return (
    <div className={`${startFade ? "card animate" : "card"}`}>
      <div className="container">
        <h1>
          <b>Who are we?</b>
        </h1>
        <p>
          We are the McGill Quantum Group, an official SUS club! We run events
          meant for people interested in quantum computing.
        </p>
        <p>
          These events encapsulate everything from fun competitions, reading
          sessions, guest speakers, and even socials. We are planning it all!
        </p>
        <p>
          We are still a very new club (only founded last year) so we really
          appreciate you checking us out! If you want more information, check
          out the navigation bar at the top of the page, it'll redirect you to
          the important pages.
        </p>

        <h1>
          <b>Meet the team!</b>
        </h1>
        <InformationPictures infoDict={executives} />

        <h1>People/Organizations that Keep Us Running...</h1>
        <h2>Professors</h2>
        <InformationPictures infoDict={professors} />
        <h2>Sponsors</h2>
        <InformationPictures infoDict={sponsors} />
      </div>
    </div>
  );
}

export default AboutPage;
