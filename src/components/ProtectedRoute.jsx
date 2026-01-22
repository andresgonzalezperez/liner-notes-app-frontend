import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, adminOnly = false }) {
  const { isLoggedIn, user } = useContext(AuthContext);

  if (!isLoggedIn) return <Navigate to="/login" />;

  if (adminOnly && user.role !== "admin") return <Navigate to="/" />;

  return children;
}

export default ProtectedRoute;

