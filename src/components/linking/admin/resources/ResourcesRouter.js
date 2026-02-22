import { useNavigate } from "react-router-dom";

function ResourcesRouter() {
  const navigate = useNavigate();

  return (
    <div
      className="adminModalOverlay"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div>
        <h1>Modify the resources page</h1>
        <button onClick={() => navigate("/admin/resources/add")}>
          <h3>Add a resource</h3>
        </button>
        <br />
        <br />
        <button onClick={() => navigate("/admin/resources/delete")}>
          <h3>Delete a resource</h3>
        </button>
        <br />
        <br />
        <button onClick={() => navigate("/admin/resources/edit")}>
          <h3>Edit a resource</h3>
        </button>
      </div>
    </div>
  );
}

export default ResourcesRouter;
