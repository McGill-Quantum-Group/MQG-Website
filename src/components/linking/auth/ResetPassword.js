import { useState } from "react";
import "./Login.css";
import googleIcon from "../../images/google-icon.png";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { auth } from "./firebaseConfig";
import { useAuth } from "./authContext";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ResetPassword() {
  // NOT SECURE! REPLACE LATER
  const [showPage, setShowPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const { session, signUpNewUser } = UserAuth();
  const [err, setError] = useState();
  const navigate = useNavigate();

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
          onClick={() => navigate("/")}
        />
        <form onSubmit={resetPassword}>
          <label className="loginText" for="username">
            Type the email associated to your account:
          </label>
          <br />
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
          <button className="buttonLogin" type="submit">
            Reset Password
          </button>
          <br />
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
