import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
 
export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate    = useNavigate();
  const { pathname } = useLocation();
 
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
 
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/products">ShopCLI</Link>
 
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
        <span className="navbar-toggler-icon" />
      </button>
 
      <div className="collapse navbar-collapse" id="nav">
        {isAuthenticated && (
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link${pathname.startsWith("/products") ? " active" : ""}`} to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link${pathname.startsWith("/cart") ? " active" : ""}`} to="/cart">
                Cart
              </Link>
            </li>
            {user?.isAdmin && (
              <li className="nav-item">
                <Link className={`nav-link${pathname.startsWith("/admin") ? " active" : ""}`} to="/admin/carts">
                  All Carts
                </Link>
              </li>
            )}
          </ul>
        )}
 
        <div className="ms-auto d-flex align-items-center gap-2">
          {isAuthenticated ? (
            <>
              <span className="text-secondary small">{user?.email}</span>
              {user?.isAdmin && <span className="badge bg-warning text-dark">Admin</span>}
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Sign out</button>
            </>
          ) : (
            <>
              <button className="btn btn-outline-light btn-sm" onClick={() => navigate("/login")}>Sign in</button>
              <button className="btn btn-light btn-sm" onClick={() => navigate("/register")}>Register</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}