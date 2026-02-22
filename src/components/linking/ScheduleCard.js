import React, { useState } from "react";
import { useEffect } from "react";
import "./PastEvents.css";

import mqgLogo from "../images/MQG.webp";

function ScheduleCard({ event }) {
  const [startFade, setStartFade] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [allEventInfo, setAllEventInfo] = useState("");

  useEffect(() => {
    setStartFade(true);
  }, []);

  return (
    <div
      className="modalOverlay animateModal"
      onClick={() => {
        setShowEvent(false);
      }}
    >
      <div
        className="eventInfo"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1>{allEventInfo.title}</h1>
          <button
            style={{
              position: "relative",
              textAlign: "right",
              border: "none",
              backgroundColor: "#ca323200",
            }}
            onClick={() => {
              setShowEvent(false);
              setAllEventInfo("");
            }}
          >
            <h1>❌</h1>
          </button>
        </div>
        <p>{allEventInfo.description}</p>
        <div style={{ display: "flex" }}>
          {allEventInfo.images.map((img) => (
            <img className="eventImage" src={img}></img>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScheduleCard;
