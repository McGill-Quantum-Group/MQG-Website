import React, { useState } from "react";
import { useEffect } from "react";
import "./Title.css";

function Title(props) {
  const [startFade, setStartFade] = useState(false);

  useEffect(() => {
    setStartFade(true);
  }, []);

  return (
    <div className="textOverlay">
      <div className={`${startFade ? "text animate" : "text"}`}>
        <p>
          <b>Hello!</b>
        </p>
        <p style={{ fontSize: "34px", fontWeight: "325" }}>
          We are the McGill Quantum Group.
          <br />
          Join our{" "}
          <a
            style={{
              color: "#ff5d5d",
              textDecoration: "none",
            }}
            href="https://discord.gg/KY4e9BrQNe"
          >
            Discord
          </a>{" "}
          to find the quickest updates.
        </p>
      </div>
      <a
        className={`${startFade ? "animate" : ""}`}
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          color: "white",
          textAlign: "center",
          padding: "10px",
          textDecoration: "none",
        }}
        href="https://github.com/McGill-Quantum-Group/MQG-Website"
      >
        Made with ❤️ using React
      </a>
    </div>
  );
}

export default Title;
