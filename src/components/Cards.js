import React, { useState } from "react";
import { useEffect } from "react";
import "./Cards.css";

function Cards({ title, text }) {
  const [startFade, setStartFade] = useState(false);

  useEffect(() => {
    setStartFade(true);
  }, []);

  return (
    <div className={`${startFade ? "card animate" : "card"}`}>
      <div className="container">
        <h4>
          <b>{title}</b>
        </h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Cards;
