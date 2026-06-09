import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="class">
      <h1 className="page">Salom {user?.name}</h1>
      <p>Rol: {user?.role}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default HomePage;
