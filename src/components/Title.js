import React, { useState } from "react";
import { useEffect } from "react";
import "./Title.css";
import qffTitleBackground from "../components/images/qff_no_title_background.png"
import qffPinkSticker from "../components/images/badge-pink.svg"

function Title(props) {
  const [startFade, setStartFade] = useState(false);

  useEffect(() => {
    setStartFade(true);
  }, []);

  return (
    <div class="dashboard">
      <div class="dashboardBackground">
        <img id={"qffBackground"} src={qffTitleBackground} alt="Qiskit Fall Fest 2026"/>
        <h1 id={"QFFTitleColor"}>Qiskit Fall Fest 2026</h1>
        <h2 id={"McGillColor"}>McGill University</h2>
        <img id={"qffPinkSticker"} src={qffPinkSticker} alt="Qiskit Fall Fest 2026 Pink Sticker"/>
      </div>
    </div>
  );
}



export default Title;
