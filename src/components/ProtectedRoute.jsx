import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, adminOnly = false }) {
  const { isLoggedIn, isLoading, isAdmin } = useContext(AuthContext);

  // Wait until authentication finishes
  if (isLoading) {
    return <p className="loading">Checking authentication...</p>;
  }

  // User not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Admin-only route
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;

