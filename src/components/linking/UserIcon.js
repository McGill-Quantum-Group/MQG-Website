import { User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import "./UserIcon.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";

function UserIcon() {
  const [showSignout, setShowSignout] = useState(false);
  const auth = getAuth();
  const { user } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef();

  const handleLogout = () => {
    signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    // Check to see if the click was outside the ref
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowSignout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the listener when the component disappears
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      <button
        className="buttonIcon"
        onClick={() => setShowSignout(!showSignout)}
      >
        <User size={36} style={{ color: "black" }} />
      </button>
      {showSignout && (
        <div
          style={{
            backgroundColor: "white",
            position: "absolute",
            top: "100%",
            right: 0,
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
            whiteSpace: "nowrap", // Prevents text from wrapping awkwardly
            marginTop: "5px",
            zIndex: 100,
          }}
        >
          <p>You are currently signed in as {user.email}</p>
          <button
            onClick={handleLogout}
            style={{
              cursor: "pointer",
              background: "none",
              border: "none",
              color: "red",
              fontWeight: "bold",
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default UserIcon;
