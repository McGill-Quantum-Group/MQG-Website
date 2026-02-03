import { useState } from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import Schedule from "./Schedule";
import Posts from "./Posts";

function Admin() {
  // NOT SECURE! REPLACE LATER
  const [showPage, setShowPage] = useState(false);
  const navigate = useNavigate();

  const LoginPage = () => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const validateLogin = () => {
      setShowPage(true);
    };

    return (
      <div className="adminPage">
        <form>
          <label className="adminText" for="username">
            Username:
          </label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br />
          <br />

          <label className="adminText" or="password">
            Password:
          </label>
          <br />
          <input
            type="text"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
        </form>

        <button onClick={() => validateLogin()}>Login</button>
      </div>
    );
  };

  const AddPage = () => {
    return (
      <div>
        <h1>Add Content</h1>
        <button onClick={() => navigate("/admin/schedule")}>
          <h2>Add event to schedule</h2>
        </button>
        <br />
        <br />
        <button onClick={() => navigate("/admin/posts")}>
          <h2>Add event to past events</h2>
        </button>
      </div>
    );
  };

  return (
    <div className="adminModalOverlay">
      {showPage ? <AddPage /> : <LoginPage />}
    </div>
  );
}

export default Admin;
