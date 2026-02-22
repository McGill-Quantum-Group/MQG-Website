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
          key="index"
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
            src={event.image}
            style={{ width: "200px", justifyContent: "right" }}
          />
        </button>
      ))}
    </div>
  );
}

export default EventCard;
