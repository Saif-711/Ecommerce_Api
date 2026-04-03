import { createContext, useContext, useState, useEffect } from "react";
 
const AuthContext = createContext(null);
 
export function AuthProvider({ children }) {
  const [token, setToken]   = useState(() => localStorage.getItem("token"));
  const [user,  setUser]    = useState(null);
 
  useEffect(() => {
    if (!token) { setUser(null); return; }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const roles   = payload.roles || payload.authorities || [];
      setUser({
        email:   payload.sub,
        roles,
        isAdmin: roles.some((r) => r === "ROLE_ADMIN" || r === "ADMIN"),
      });
    } catch {
      logout();
    }
  }, [token]);
 
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };
 
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };
 
  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}
 
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}