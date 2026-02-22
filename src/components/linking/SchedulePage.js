import "./SchedulePage.css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import EventModal from "./EventModal";
import { supabase } from "../supabaseConfig";

function SchedulePage() {
  const [events, setEvents] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [showEvent, setShowEvent] = useState(false);
  const [allEventInfo, setAllEventInfo] = useState("");

  // const handleOpenModal = (event) => {
  //   //
  // };

  const handleCloseModal = () => {
    setShowEvent(false);
    setAllEventInfo(null);
  };

  const handleModalRender = (e) => {
    const scheduleEvent = {
      title: e.title,
      description: e.description,
      images: e.images,
      location: e.location,
      date: e.date,
    };
    setAllEventInfo(scheduleEvent);
    setShowEvent(true);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoaded(false);
      const { data, error } = await supabase
        .from("events-schedule")
        .select("*")
        .order("date");
      if (error) {
        console.log(error);
      } else {
        setEvents(data);
        setLoaded(true);
      }
    };

    fetchEvents();
  }, []);

  const isSameDay = (d1, d2) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const tileContent = ({ date, view }) => {
    // Only show content in "Month" view (not year/decade)
    if (view === "month") {
      // Find the event for this specific day
      const dayEvents = events.filter((e) => isSameDay(new Date(e.date), date));

      // If found, return JSX to display
      if (dayEvents.length > 0) {
        return (
          <div
            className="schedule-scrollbar"
            style={{
              maxHeight: "14vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              width: "100%",
              paddingRight: "2px",
            }}
            onWheel={(e) => e.stopPropagation()}
          >
            {dayEvents.map((dayEvent, index) => (
              <div key={index} style={{ position: "relative" }}>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModalRender(dayEvent);
                    console.log(dayEvent);
                  }}
                  className="event-button"
                  style={{ cursor: "pointer" }}
                >
                  {dayEvent.title}
                </div>
              </div>
            ))}
          </div>
        );
      }
    }
  };

  return loaded ? (
    <div>
      <div
        style={{
          display: "flex",
          position: "relative",
          justifyContent: "center",
        }}
      >
        <Calendar tileContent={tileContent} />
        {showEvent ? (
          <EventModal
            isOpen={showEvent}
            onClose={handleCloseModal}
            allEventInfo={allEventInfo}
          />
        ) : (
          <div />
        )}
      </div>
      <div
        style={{
          display: "flex",
          position: "relative",
          justifyContent: "center",
          fontSize: 20,
          color: "white",
        }}
      >
        <p>Click on an event for more info!</p>
      </div>
    </div>
  ) : (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "90vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div className="loader spin" />
        <h1 style={{ color: "white", marginTop: "20px", marginBottom: "0px" }}>
          Loading, please wait...
        </h1>
      </div>
    </div>
  );
}

export default SchedulePage;
