import { useState } from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import ScheduleAdd from "./schedule/ScheduleAdd";
import Posts from "./pastEvents/PastEventsAdd";

function Admin() {
  const navigate = useNavigate();
  // const LoginPage = () => {
  //   const [password, setPassword] = useState("");
  //   const [username, setUsername] = useState("");

  //   const validateLogin = () => {
  //     setShowPage(true);
  //   };

  //   return (
  //     <div className="adminPage">
  //       <form>
  //         <label className="adminText" for="username">
  //           Username:
  //         </label>
  //         <br />
  //         <input
  //           type="text"
  //           id="username"
  //           name="username"
  //           value={username}
  //           onChange={(e) => {
  //             setUsername(e.target.value);
  //           }}
  //         />
  //         <br />
  //         <br />

  //         <label className="adminText" or="password">
  //           Password:
  //         </label>
  //         <br />
  //         <input
  //           type="text"
  //           id="password"
  //           name="password"
  //           value={password}
  //           onChange={(e) => {
  //             setPassword(e.target.value);
  //           }}
  //         />
  //         <br />
  //       </form>

  //       <button onClick={() => validateLogin()}>Login</button>
  //     </div>
  //   );
  // };

  const AddPage = () => {
    return (
      <div>
        <h1>Welcome back, fellow admin!</h1>
        <h2>What do you want to do today?</h2>
        <button onClick={() => navigate("/admin/schedule")}>
          <h3>Modify schedule</h3>
        </button>
        <br />
        <br />
        <button onClick={() => navigate("/admin/past-events")}>
          <h3>Modify past events</h3>
        </button>
        <br />
        <br />
        <button onClick={() => navigate("/admin/resources")}>
          <h3>Modify resources</h3>
        </button>
      </div>
    );
  };

  return (
    <div
      className="adminModalOverlay"
      style={{ display: "flex", alignItems: "center" }}
    >
      <AddPage />
    </div>
  );
}

export default Admin;
