import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function ProtectedRoute({ children, guest = false }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="loading">Загрузка...</div>;

  if (guest && user) return <Navigate to="/home" replace />;
  if (!guest && !user) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
