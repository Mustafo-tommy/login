import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function ProtectedRoute({ children, guest = false, role = null }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="loading">Загрузка...</div>;

  if (guest && user) {
    // Редирект по роли
    if (user.role === "admin") return <Navigate to="/about" replace />;
    return <Navigate to="/home" replace />;
  }

  if (!guest && !user) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) return <Navigate to="/home" replace />;

  return children;
}

export default ProtectedRoute;
