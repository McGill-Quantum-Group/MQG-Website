import React, { useState } from "react";
import { useEffect } from "react";
import "./Title.css";

function Title(props) {
  const [startFade, setStartFade] = useState(false);

  useEffect(() => {
    setStartFade(true);
  }, []);

  return (
    <div className={`${startFade ? "text animate" : "text"}`}>
      <p>
        <b>Hello!</b>
        <br />
        We are the McGill Quantum Group. Take a look around...
      </p>
    </div>
  );
}

export default Title;
