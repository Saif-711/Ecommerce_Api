import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
 
export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated)            return <Navigate to="/login"    replace />;
  if (adminOnly && !user?.isAdmin) return <Navigate to="/products" replace />;
  return children;
}