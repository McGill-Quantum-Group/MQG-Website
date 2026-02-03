import { useState } from "react";
import "./Login.css";
import googleIcon from "../images/google-icon.png";

function Signup() {
  // NOT SECURE! REPLACE LATER
  const [showPage, setShowPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const LoginPage = () => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const validateLogin = () => {
      setShowPage(true);
    };

    return (
      <div className="animateLogin loginPage">
        <form>
          <h1 style={{ color: "white", fontWeight: "normal" }}>
            {" "}
            Create a new account!
          </h1>
          <label className="loginText" for="username">
            Email:
          </label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            style={{ fontSize: "25px" }}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br />
          <br />

          <label className="loginText" or="password">
            Password:
          </label>
          <br />
          <input
            type="text"
            id="password"
            name="password"
            value={"●".repeat(password.length)}
            style={{ fontSize: "25px", marginBottom: "20px" }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />

          <button className="buttonLogin" onClick={() => validateLogin()}>
            Login
          </button>
          <hr />
          <p style={{ color: "white" }}>Sign up with:</p>
          <a>
            <img
              src={googleIcon}
              alt={"Google Logo Icon, by Icons8"}
              style={{ width: 48, height: 48 }}
            />
          </a>
        </form>
      </div>
    );
  };

  return (
    <div className="loginModalOverlay">
      <LoginPage />
    </div>
  );
}

export default Signup;
