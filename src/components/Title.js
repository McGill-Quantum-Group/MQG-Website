import React, { useState } from "react";
import { useEffect } from "react";
import "./Title.css";
import qffTitleBackground from "../components/images/qff_no_title_background_edited1.png"
import qffPinkSticker from "../components/images/badge-pink.svg"

function openWin() {
  window.open("/QiskitFallFest2026.js");
}

function Title(props) {
  const [startFade, setStartFade] = useState(false);

  useEffect(() => {
    setStartFade(true);
  }, []);

  return (
    <div class="dashboard">
      <div class="dashboardBackground">
        <img id={"qffBackground"} src={qffTitleBackground} alt="Qiskit Fall Fest 2026"/>
        <div class="blurContainer">
          <div class="titleBox">
            <h1 id={"QFFTitle"}>Qiskit Fall Fest 2026</h1>
            <h2 id={"McGill"}>McGill University</h2>
          </div>
          <img id={"qffPinkSticker"} src={qffPinkSticker} alt="Qiskit Fall Fest 2026 Pink Sticker"/>
        </div>
        <button onPress={() => openWin()}>Details</button>
      </div>
    </div>
  );
}



export default Title;
