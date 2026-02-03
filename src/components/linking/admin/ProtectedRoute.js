import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  // REPLACE WITH ACTUAL LOGIN HOOKS LATER
  const user = true;

  return user ? <Outlet /> : <Navigate to="/admin" />;
}

export default ProtectedRoute;
