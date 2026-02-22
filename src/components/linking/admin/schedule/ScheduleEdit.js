import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseConfig";
import EventModal from "../../EventModal";
import ScheduleAdd from "./ScheduleAdd";
import { secureDeleteRecord } from "../AdminUtils";
import "../Admin.css";

function ScheduleEdit() {
  const [loaded, setLoaded] = useState(false);
  const [events, setEvents] = useState([]);
  const [showEvent, setShowEvent] = useState(false);
  const [allEventInfo, setAllEventInfo] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  const handleUpdateSelectedEvents = (id) => {
    setSelectedIds((prevIds) => {
      // Only one can be selected: clicking the same one deselects, otherwise select only this one
      const newIds = prevIds.includes(id) ? [] : [id];
      return newIds;
    });
  };

  const handleModalRender = (e) => {
    console.log(e.images);
    const scheduleEvent = {
      title: e.title,
      description: e.description,
      date: e.date,
      images: e.images,
      location: e.location,
    };
    setAllEventInfo(scheduleEvent);
    setShowEvent(true);
  };

  const handleCloseModal = () => {
    setShowEvent(false);
    setAllEventInfo(null);
  };

  const handleShowEdit = () => {
    if (selectedIds.length === 0) {
      return alert("Select an event to edit.");
    }
    setShowEdit(true);
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

  return (
    <div
      class="adminModalOverlay"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div>
        {showEdit ? (
          <ScheduleAdd
            operation="update"
            data={events.find((e) => e.id === selectedIds[0])}
          />
        ) : (
          <div>
            <h1>Select event to edit</h1>
            {/* {showEvent ? (
              <EventModal
                isOpen={showEvent}
                onClose={handleCloseModal}
                allEventInfo={allEventInfo}
              />
            ) : (
              <div />
            )} */}

            {loaded ? (
              events.map((event, index) => (
                <div style={{ position: "relative" }}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(event.id)}
                    onChange={() => handleUpdateSelectedEvents(event.id)}
                  />
                  {event.title}
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )}
            <br />
            <button onClick={handleShowEdit}>Edit selected event</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScheduleEdit;
