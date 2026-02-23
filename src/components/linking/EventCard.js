import React, { useState } from "react";
import { useEffect } from "react";
import "./PastEvents.css";
import EventModal from "./EventModal";

function EventCard({ events }) {
  const [startFade, setStartFade] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [allEventInfo, setAllEventInfo] = useState("");

  useEffect(() => {
    setStartFade(true);
  }, []);

  // const handleOpenModal = (event) => {
  //   setAllEventInfo(event.longInfo);
  //   setShowEvent(true);
  // };

  const handleCloseModal = () => {
    setShowEvent(false);
    setAllEventInfo(null);
  };

  return (
    <div>
      {showEvent ? (
        <EventModal
          isOpen={showEvent}
          onClose={handleCloseModal}
          allEventInfo={allEventInfo}
        />
      ) : (
        <div></div>
      )}
      {events.map((event, index) => (
        <button
          className={`${startFade ? "eventCard animateEventCard" : "eventCard"}`}
          onClick={() => {
            setShowEvent(true);
            setAllEventInfo(event.longInfo);
          }}
          key={index}
          style={{
            padding: 0,
            overflow: "hidden",
            display: "flex",
            textAlign: "left",
          }}
        >
          {/* Text Container */}
          <div
            style={{
              padding: "20px",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h1 style={{ margin: 0 }}>{event.name}</h1>
            <p style={{ marginTop: "10px" }}>{event.info}</p>
          </div>

          {/* Image Container */}
          <img
            src={event.image}
            alt="Event"
            style={{
              width: "200px",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </button>
      ))}
    </div>
  );
}

export default EventCard;
