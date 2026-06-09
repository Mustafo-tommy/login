import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Xush kelibsiz, {user?.name}!</p>
      <button onClick={() => navigate("/home")}>Orqaga</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default AdminPage;
