import { useState } from "react";
import "./Login.css";
import googleIcon from "../../images/google-icon.png";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { auth } from "./firebaseConfig";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function Login() {
  // NOT SECURE! REPLACE LATER
  const [showPage, setShowPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const { session, signUpNewUser } = UserAuth();
  const [err, setError] = useState();
  const navigate = useNavigate();

  const validateLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login success!");
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Signup error:", err.code);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const validateLoginGoogle = async (e) => {
    e.preventDefault();
    setLoading(false);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      navigate("/", { replace: true });
    } catch (err) {
      setError("Signup error:", err.code);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset request sent! Check your email.");
      })
      .catch((error) => {
        alert(
          `An error occured: \n${error}\n Please send this error to the devs to diagnose the issue.`,
        );
      });
  };

  return (
    <div className="loginModalOverlay">
      <div className="animateLogin loginPage">
        <X
          size={48}
          color="white"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            cursor: "pointer",
            zIndex: 50 /* Ensures it stays above the gradient */,
          }}
          onClick={() => navigate(-1)}
        />
        <form onSubmit={validateLogin}>
          <label className="loginText" for="username">
            Email:
          </label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            style={{ fontSize: "25px" }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <br />

          <label className="loginText" or="password">
            Password:
          </label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            style={{ fontSize: "25px", marginBottom: "20px" }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />

          <button className="buttonLogin" type="submit">
            Login
          </button>
          <p style={{ color: "#a20000" }}>{err}</p>
          <p style={{ color: "white" }}>
            Forgot your password? <a href="/reset">Reset Password</a>
          </p>
          <hr />
          <p style={{ color: "white" }}>Or sign in with...</p>
          <a href="#" onClick={validateLoginGoogle}>
            <img
              src={googleIcon}
              alt={"Google Logo Icon, by Icons8"}
              style={{ width: 48, height: 48 }}
            />
          </a>
          <p style={{ color: "white" }}>
            Don't have an account? <a href="/sign-up">Sign up!</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
