import React, { useState } from "react";
import { useEffect } from "react";
import "./Title.css";

function Title(props) {
  const [startFade, setStartFade] = useState(false);

  useEffect(() => {
    setStartFade(true);
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "90vh" }}
    >
      <div className={`${startFade ? "text animate" : "text"}`}>
        <p>
          <b>Hello!</b>
          <br />
          We are the McGill Quantum Group. Take a look around...
        </p>
      </div>
      <div
        className={`${startFade ? "animate" : ""}`}
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100vw",
          color: "white",
          textAlign: "center",
          padding: "10px",
        }}
      >
        Made with ❤️ using React
      </div>
    </div>
  );
}

export default Title;
