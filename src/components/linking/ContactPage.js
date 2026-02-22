import React, { useState } from "react";
import { useEffect } from "react";
import "./Pages.css";
import { Mail } from "lucide-react";

import mqgLogo from "../images/MQG.webp";

function ContactPage({ title, text }) {
  const [startFade, setStartFade] = useState(false);

  useEffect(() => {
    setStartFade(true);
  }, []);

  return (
    <div className={`${startFade ? "card animateCard" : "card"}`}>
      <div className="container">
        <h1>
          <b>Want to contact us?</b>
        </h1>
        <p>Please find our contact methods below.</p>
        <p>
          Additionally, you can also contact one of the executives through our
          Discord, which you can find in the navigation bar above.
        </p>
        <hr
          style={{
            color: "black",
            backgroundColor: "black",
            borderColor: "black",
            height: 1,
            marginTop: "10px",
            marginBottom: "20px",
          }}
        />
        <h2>Contacts:</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <Mail size={24} />
          <a
            href="mailto:mcgillquantumgroup@gmail.com"
            style={{ color: "#000000" }}
          >
            mcgillquantumgroup@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
