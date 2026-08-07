import React, { useState } from "react";
import { useEffect } from "react";
import "./Title.css";
import qffSticker from "../components/images/Fall Fest Sticker Large.png"

function Title(props) {
  const [startFade, setStartFade] = useState(false);

  useEffect(() => {
    setStartFade(true);
  }, []);

  const qffStickerStyle={
    width:"80%",
    height:"60%",
  };

  return (
    <div class="dashboardImage">
      <img src={qffSticker} alt="Qiskit Fall Fest 2026" style={qffStickerStyle}/>
    </div>
    <div class="dashboardBody">
      <h1>QISKIT FALL FEST 2026 IS BACK!</h1>
      <p>
        The McGill Quantum Group is hosting another Qiskit Fall Fest this year at the McGill Campus!
        This year, we are celebrating a decade of quantum computing on the cloud. 
      </p>
    </div>
  );
}

export default Title;
