import { useState } from "react";
import "./Login.css";
import googleIcon from "../../images/google-icon.png";
import { useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

function Signup() {
  const [showPage, setShowPage] = useState(false);
  const [loading, setLoading] = useState(false);
  // const { session, signUpNewUser } = UserAuth();
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [startFade, setStartFade] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setStartFade(true);
  }, []);

  // const validateLoginGoogle = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (!signingIn) {
  //       setSigningIn(true);

  //       const provider = new GoogleAuthProvider();
  //       const result = await signInWithPopup(auth, provider);
  //       const user = result.user;
  //     }
  //   } catch (err) {
  //     setError(err);
  //     setSigningIn(false);
  //   }
  // };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await sendEmailVerification(result.user);
      alert(
        "Account created! Please check your email for a verification link.",
      );
      console.log("User created:", result.user);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(
        `Signup error: ${err}. Please send a screenshot of this error to the developers.`,
      );
      setError(err.message);
    } finally {
      setLoading(false);
    }

    // try {
    //   const result = await signUpNewUser(email, password);
    //   console.log(password);

    //   if (result.success) {
    //     alert("signed up! Please check your email for your verification link.");
    //   } else {
    //     setError(result.error.message);
    //   }
    // } catch (err) {
    //   console.log(`An unknown error occured: ${err}`);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="loginModalOverlay">
      <div className="loginPage animateLogin">
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
        <form onSubmit={handleSignup}>
          <h1 style={{ color: "white", fontWeight: "normal" }}>
            Create a new account!
          </h1>

          <label className="loginText" htmlFor="email">
            Email:
          </label>
          <br />
          <input
            type="text"
            id="email"
            name="email"
            style={{ fontSize: "25px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />

          <label className="loginText" htmlFor="password">
            Password:
          </label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            style={{ fontSize: "25px", marginBottom: "20px" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <button
            onClick={() => {
              setError(null);
            }}
            className="buttonLogin"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign up"}
          </button>
          {error && (
            <p
              style={{
                color: "#ff0000",
                maxWidth: "20vw",
                textShadow:
                  "-1px -1px 0 #633030, 1px -1px 0 #633030, -1px  1px 0 #633030, 1px  1px 0 #633030",
              }}
            >
              An error occurred: {error}
            </p>
          )}

          <hr />
          <p style={{ color: "white" }}>Or sign up with:</p>
          <div style={{ cursor: "pointer" }}>
            <img
              src={googleIcon}
              alt={"Google Logo Icon, by Icons8"}
              style={{ width: 48, height: 48 }}
            />
          </div>
          <p style={{ color: "white" }}>
            Already have an account? <a href="/login">Log in here!</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
