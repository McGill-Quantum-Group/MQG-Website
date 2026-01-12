import React, { useState } from "react";
import { useEffect } from "react";
import "./PastEvents.css";

import mqgLogo from "../images/MQG.webp";

function EventCard({ events }) {
  const [startFade, setStartFade] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [allEventInfo, setAllEventInfo] = useState("");

  useEffect(() => {
    setStartFade(true);
  }, []);

  return (
    <div>
      {/* Render all info if the user clicks */}
      {showEvent ? (
        <div className="eventInfo">
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
              <img src={img}></img>
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {events.map((event) => (
        <button
          className={`${startFade ? "eventCard animate" : "eventCard"}`}
          onClick={() => {
            setShowEvent(true);
            setAllEventInfo(event.longInfo);
          }}
        >
          <div
            style={{
              margin: "5px",
              flex: 1,
            }}
          >
            <h1>{event.name}</h1>
            <br />
            {event.info}
          </div>
          <img
            src={mqgLogo}
            style={{ width: "200px", justifyContent: "right" }}
          />
        </button>
      ))}
    </div>
  );
}

function EventsPage(props) {
  const [startFade, setStartFade] = useState(false);
  const events = [
    {
      name: "QiSkit Fall Fest",
      info: "Our first run of a quantum hackathon! Pre-event workshops were lead before to ensure that people could start building right away the day of.",
      image: mqgLogo,
      longInfo: {
        title: "QiSkit Fall Fest",
        description: "We love to hack",
        images: [mqgLogo, mqgLogo],
      },
    },
    {
      name: "A",
      info: "what the hell is this event smh smh smh smh",
      image: mqgLogo,
    },
    {
      name: "A",
      info: "what the hell is this event smh smh smh smh",
      image: mqgLogo,
    },
    {
      name: "A",
      info: "what the hell is this event smh smh smh smh",
      image: mqgLogo,
    },
    {
      name: "A",
      info: "what the hell is this event smh smh smh smh",
      image: mqgLogo,
    },
  ];

  return (
    <div style={{ overflowY: "auto" }}>
      <EventCard events={events} />
    </div>
  );
}

export default EventsPage;
