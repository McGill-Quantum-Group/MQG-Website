import React, { useState } from "react";
import { useEffect } from "react";
import "./Title.css";

function Title(props) {
  const [startFade, setStartFade] = useState(false);

  useEffect(() => {
    setStartFade(true);
  }, []);

  return (
    <div className="mainDashboard">
      <img src="../components/images/Fall Fest Sticker Large.png", alt="QFF 2026 Official Event">
    </div>
  );
}

export default Title;
