import React, { useState } from "react";
import { useEffect } from "react";
import "./Title.css";
import qffTitleBackground from "../components/images/qff_no_title_background.png"

function Title(props) {
  const [startFade, setStartFade] = useState(false);

  useEffect(() => {
    setStartFade(true);
  }, []);

  const qffTitleBackgroundStyle={
    width:"80%",
  };

  return (
    <div class="dashboard">
      <div class="dashboardImage">
        <img src={qffTitleBackground} alt="Qiskit Fall Fest 2026" style={qffTitleBackgroundStyle}/>
      </div>
    </div>
  );
}



export default Title;
