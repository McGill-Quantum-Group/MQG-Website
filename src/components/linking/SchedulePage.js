import "./SchedulePage.css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import EventModal from "./EventModal";
import { supabase } from "../supabaseConfig";

function SchedulePage() {
  const [events, setEvents] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [startFade, setStartFade] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [allEventInfo, setAllEventInfo] = useState("");

  const handleOpenModal = (event) => {
    //
  };

  const handleCloseModal = () => {
    setShowEvent(false);
    setAllEventInfo(null);
  };

  const handleModalRender = (e) => {
    console.log(e.images);
    const scheduleEvent = {
      title: e.title,
      description: e.description,
      images: e.images,
      location: e.location,
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
        console.log(data);
        setEvents(data);
        setLoaded(true);
      }
    };

    fetchEvents();
  }, []);

  const isSameDay = (d1, d2) => {
    return (
      // UTC conversion bc the thing keeps breaking for no reason
      d1.getUTCFullYear() === d2.getFullYear() &&
      d1.getUTCMonth() === d2.getMonth() &&
      d1.getUTCDate() === d2.getDate()
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
          <div>
            {/* Example: A small dot or the event title */}
            {dayEvents.map((dayEvent, index) => (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => {
                    handleModalRender(dayEvent);
                    console.log(dayEvent);
                  }}
                  className="event-button"
                >
                  {dayEvent.title}
                </button>
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
