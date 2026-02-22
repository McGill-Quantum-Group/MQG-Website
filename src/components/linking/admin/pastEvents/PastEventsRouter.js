import { useNavigate } from "react-router-dom";

function PastEventsRouter() {
  const navigate = useNavigate();

  return (
    <div
      className="adminModalOverlay"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div>
        <h1>Modify the past events page</h1>
        <button onClick={() => navigate("/admin/past-events/add")}>
          <h3>Add a past event post</h3>
        </button>
        <br />
        <br />
        <button onClick={() => navigate("/admin/past-events/delete")}>
          <h3>Delete a past event post</h3>
        </button>
        <br />
        <br />
        <button onClick={() => navigate("/admin/past-events/edit")}>
          <h3>Edit an past event post</h3>
        </button>
      </div>
    </div>
  );
}

export default PastEventsRouter;
