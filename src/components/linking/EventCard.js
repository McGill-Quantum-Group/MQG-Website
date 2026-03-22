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
          className={`eventCard ${startFade ? "animateEventCard" : ""}`}
          onClick={() => {
            setShowEvent(true);
            setAllEventInfo(event.longInfo);
          }}
          key={index}
        >
          {/* Text Container */}
          <div className="eventCard-content">
            <h1 style={{ margin: 0 }}>{event.name}</h1>
            <p style={{ marginTop: "10px" }}>{event.info}</p>
          </div>

          {/* Image Container */}
          <img src={event.image} alt="Event" className="eventCard-image" />
        </button>
      ))}
    </div>
  );
}

export default EventCard;
