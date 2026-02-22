import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseConfig";
import "../Admin.css";
import ResourcesAdd from "./ResoucesAdd";

function ResourcesEdit() {
  const [loaded, setLoaded] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  const handleUpdateSelectedEvents = (id) => {
    setSelectedIds((prevIds) => {
      // Only one can be selected: clicking the same one deselects, otherwise select only this one
      const newIds = prevIds.includes(id) ? [] : [id];
      return newIds;
    });
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
        .from("resources")
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

  return (
    <div
      class="adminModalOverlay"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div>
        {showEdit ? (
          <ResourcesAdd
            operation="update"
            data={events.find((e) => e.id === selectedIds[0])}
          />
        ) : (
          <div>
            <h1>Select event to edit</h1>

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

export default ResourcesEdit;
