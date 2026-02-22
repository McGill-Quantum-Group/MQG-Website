import { useNavigate } from "react-router-dom";
import "../Posts.css";

function ScheduleRouter() {
  const navigate = useNavigate();

  return (
    <div
      className="adminModalOverlay"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div className="adminPage">
        <h1>Modify the schedule</h1>
        <button onClick={() => navigate("/admin/schedule/add")}>
          <h3>Add an event to the schedule</h3>
        </button>
        <br />
        <br />
        <button onClick={() => navigate("/admin/schedule/delete")}>
          <h3>Delete an event from the schedule</h3>
        </button>
        <br />
        <br />
        <button onClick={() => navigate("/admin/schedule/edit")}>
          <h3>Edit an event</h3>
        </button>
      </div>
    </div>
  );
}

export default ScheduleRouter;
