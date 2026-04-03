import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
 
export default function LoginPage() {
  const { login }   = useAuth();
  const navigate    = useNavigate();
  const [form,    setForm]    = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
 
  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await authAPI.login(form);
      login(res.token);
      navigate("/products");
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm" style={{ width: 380 }}>
        <div className="card-body p-4">
          <h4 className="mb-1 fw-bold">Sign in</h4>
          <p className="text-muted mb-4 small">
            No account? <Link to="/register">Create one</Link>
          </p>
 
          {error && <div className="alert alert-danger py-2 small">{error}</div>}
 
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-semibold">Email</label>
              <input className="form-control" name="email" type="email"
                value={form.email} onChange={set} placeholder="you@example.com" required />
            </div>
            <div className="mb-3">
              <label className="form-label small fw-semibold">Password</label>
              <input className="form-control" name="password" type="password"
                value={form.password} onChange={set} placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn btn-dark w-100" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}