import { useState } from "react";
import { useProducts } from "../hooks/useData";
import { useAuth } from "../contexts/AuthContext";
 
const EMPTY = { name: "", description: "", price: "", quantity: 0 };
 
function ProductModal({ title, initial, onSave, onClose, saving }) {
  const [form, setForm] = useState({ ...initial });
  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
 
  return (
    <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.4)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input className="form-control" name="name" value={form.name} onChange={set} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input className="form-control" name="description" value={form.description} onChange={set} />
            </div>
            <div className="row g-3">
              <div className="col">
                <label className="form-label">Price ($)</label>
                <input className="form-control" name="price" type="number" step="0.01" min="0"
                  value={form.price} onChange={set} required />
              </div>
              <div className="col">
                <label className="form-label">Quantity</label>
                <input className="form-control" name="quantity" type="number" min="0"
                  value={form.quantity} onChange={set} required />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-dark" onClick={() => onSave(form)} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default function ProductsPage() {
  const { products, loading, error, createProduct, updateProduct, deleteProduct } = useProducts();
  const { user } = useAuth();
 
  const [modal,  setModal]  = useState(null);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState(null);
  const [search, setSearch] = useState("");
 
  const filtered = products.filter((p) =>
    `${p.name} ${p.description}`.toLowerCase().includes(search.toLowerCase())
  );
 
  const handleSave = async (form) => {
    setSaving(true);
    setActionError(null);
    try {
      modal.mode === "create"
        ? await createProduct(form)
        : await updateProduct(modal.product.id, form);
      setModal(null);
    } catch (e) {
      setActionError(e.message);
    } finally {
      setSaving(false);
    }
  };
 
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try { await deleteProduct(id); }
    catch (e) { setActionError(e.message); }
  };
 
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="mb-0 fw-bold">Products</h4>
          <small className="text-muted">{products.length} items</small>
        </div>
        {user?.isAdmin && (
          <button className="btn btn-dark btn-sm" onClick={() => setModal({ mode: "create" })}>
            + Add product
          </button>
        )}
      </div>
 
      <input
        className="form-control mb-4"
        placeholder="Search products…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
 
      {error        && <div className="alert alert-danger">{error}</div>}
      {actionError  && <div className="alert alert-danger">{actionError}</div>}
      {loading      && <div className="text-center py-5"><div className="spinner-border" /></div>}
 
      {!loading && (
        <div className="row g-3">
          {filtered.map((p) => (
            <div key={p.id} className="col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <h6 className="card-title mb-0">{p.name}</h6>
                    <span className="badge bg-success ms-2">${Number(p.price || 0).toFixed(2)}</span>
                  </div>
                  {p.description && <p className="card-text text-muted small mb-2">{p.description}</p>}
                  <small className="text-muted mt-auto">Qty: {p.quantity ?? "—"}</small>
 
                  {user?.isAdmin && (
                    <div className="d-flex gap-2 mt-3">
                      <button className="btn btn-outline-secondary btn-sm flex-fill"
                        onClick={() => setModal({ mode: "edit", product: p })}>Edit</button>
                      <button className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(p.id)}>Delete</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
 
          {filtered.length === 0 && (
            <p className="text-muted">No products found.</p>
          )}
        </div>
      )}
 
      {modal && (
        <ProductModal
          title={modal.mode === "create" ? "Add product" : "Edit product"}
          initial={modal.product || EMPTY}
          onSave={handleSave}
          onClose={() => setModal(null)}
          saving={saving}
        />
      )}
    </div>
  );
}