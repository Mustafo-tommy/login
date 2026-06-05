import { useAuth } from "../context/AuthContext.jsx";

function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div className="class"> 
        <h1 className="page">Salom Shashvar</h1>
    </div>
  );
}

export default HomePage;
