import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

function LoginPage() {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: localStorage.getItem("savedEmail") || "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    if (e.target.name === "email") {
      localStorage.setItem("savedEmail", e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await login({ email: form.email, password: form.password });
      } else {
        await register({
          name: form.name,
          email: form.email,
          password: form.password,
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{isLogin ? "Войти" : "Регистрация"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              className="auth-input"
              name="name"
              placeholder="Имя"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            className="auth-input"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="auth-input"
            name="password"
            type="password"
            placeholder="Пароль"
            value={form.password}
            onChange={handleChange}
            required
          />
          {error && <p className="auth-error">{error}</p>}
          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Загрузка..." : isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>
        <div className="auth-switch">
          {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Зарегистрироваться" : "Войти"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
