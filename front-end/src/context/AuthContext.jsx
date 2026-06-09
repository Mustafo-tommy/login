import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/auth.service.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getMe()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  const login = async (data) => {
    const user = await authService.login(data);
    setUser(user);
    return user; // 👈 возвращаем юзера
  };

  const register = async (data) => {
    const user = await authService.register(data);
    setUser(user);
    return user; // 👈 возвращаем юзера
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
