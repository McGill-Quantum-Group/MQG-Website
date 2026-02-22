import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseConfig";
import EventModal from "../../EventModal";
import { secureDeleteRecord } from "../AdminUtils";
import "../Admin.css";

function ResourcesDelete() {
  const [loaded, setLoaded] = useState(false);
  const [events, setEvents] = useState([]);
  const [showEvent, setShowEvent] = useState(false);
  const [allEventInfo, setAllEventInfo] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const handleUpdateSelectedEvents = (id) => {
    setSelectedIds((prevIds) => {
      const newIds = prevIds.includes(id)
        ? prevIds.filter((selectedId) => selectedId !== id) // Remove if exists
        : [...prevIds, id]; // Add if doesn't exist

      return newIds;
    });
  };

  const handleModalRender = (e) => {
    const scheduleEvent = {
      title: e.title,
      description: e.description,
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

  const handleDelete = async () => {
    if (selectedIds.length === 0)
      return alert("Select at least one event to delete.");

    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedIds.length} event(s)?`,
      )
    ) {
      return;
    }

    setLoaded(false);

    try {
      // Execute all delete requests in parallel
      await Promise.all(
        selectedIds.map((id) => secureDeleteRecord("resources", id)),
      );

      alert("Events successfully deleted!");

      // Remove the deleted events from the local UI state without a page refresh
      setEvents((prevEvents) =>
        prevEvents.filter((event) => !selectedIds.includes(event.id)),
      );
      setSelectedIds([]);
    } catch (error) {
      console.error("Deletion failed:", error);
      alert("Failed to delete: " + error.message);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoaded(false);
      const { data, error } = await supabase
        .from("resources")
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
        <h1>Select event to delete</h1>
        <h2>Click an event for more information</h2>
        {showEvent ? (
          <EventModal
            isOpen={showEvent}
            onClose={handleCloseModal}
            allEventInfo={allEventInfo}
          />
        ) : (
          <div />
        )}

        {loaded ? (
          events.map((event, index) => (
            <div style={{ position: "relative" }}>
              <input
                type="checkbox"
                checked={selectedIds.includes(event.id)}
                onChange={() => handleUpdateSelectedEvents(event.id)}
              />
              <button
                onClick={() => {
                  handleModalRender(event);
                }}
              >
                {event.title}
              </button>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
        <br />
        <button onClick={handleDelete}>Delete selected events</button>
      </div>
    </div>
  );
}

export default ResourcesDelete;
