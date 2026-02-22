import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "../auth/AuthProvider";
import { useAuth } from "../auth/AuthProvider";

function ProtectedRoute() {
  // REPLACE WITH ACTUAL LOGIN HOOKS LATER
  const { user } = useAuth();
  const [showAdmin, setShowAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const adminString = process.env.REACT_APP_ADMIN_EMAILS || "[]";

    try {
      const admins = JSON.parse(adminString);

      if (user && admins.includes(user.email)) {
        setShowAdmin(true);
      }
    } catch (err) {
      console.error(`ERROR OCCURED IN ADMIN PARSING: ${err}`);
    } finally {
      setChecking(false);
    }
  }, [user]);

  if (checking) return null;

  return showAdmin ? <Outlet /> : <Navigate to="/*" replace />;
}

export default ProtectedRoute;
