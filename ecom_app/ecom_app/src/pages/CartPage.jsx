import { useState } from "react";
import { useCart } from "../hooks/useData";
 
export default function CartPage() {
  const [cartIdInput,   setCartIdInput]   = useState("");
  const [activeCartId,  setActiveCartId]  = useState(null);
  const { cart, loading, error, addItem } = useCart(activeCartId);
 
  const [itemForm,   setItemForm]   = useState({ productId: "", quantity: 1 });
  const [adding,     setAdding]     = useState(false);
  const [addError,   setAddError]   = useState(null);
  const [addSuccess, setAddSuccess] = useState(false);
 
  const handleAddItem = async () => {
    if (!itemForm.productId) return;
    setAdding(true);
    setAddError(null);
    setAddSuccess(false);
    try {
      await addItem({
        cartId:    Number(activeCartId),
        productId: Number(itemForm.productId),
        quantity:  Number(itemForm.quantity),
      });
      setAddSuccess(true);
      setItemForm({ productId: "", quantity: 1 });
    } catch (e) {
      setAddError(e.message);
    } finally {
      setAdding(false);
    }
  };
 
  const total = cart?.items?.reduce((s, i) => s + (i.price ?? 0) * (i.quantity ?? 1), 0) ?? 0;
 
  return (
    <div className="container py-4" style={{ maxWidth: 700 }}>
      <h4 className="fw-bold mb-4">Cart</h4>
 
      {/* Cart lookup */}
      <div className="card mb-4">
        <div className="card-body">
          <h6 className="fw-semibold mb-3">Load cart by ID</h6>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              placeholder="e.g. 1"
              value={cartIdInput}
              onChange={(e) => setCartIdInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && cartIdInput) setActiveCartId(cartIdInput); }}
            />
            <button className="btn btn-dark" onClick={() => setActiveCartId(cartIdInput)} disabled={!cartIdInput}>
              Load
            </button>
          </div>
        </div>
      </div>
 
      {error   && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="text-center py-4"><div className="spinner-border" /></div>}
 
      {/* Cart items */}
      {cart && !loading && (
        <div className="card mb-4">
          <div className="card-body">
            <h6 className="fw-semibold mb-3">Cart #{cart.id}</h6>
            {cart.items?.length > 0 ? (
              <>
                <table className="table table-sm">
                  <thead className="table-light">
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Unit price</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.items.map((item, i) => (
                      <tr key={i}>
                        <td>{item.productName || `Product #${item.productId}`}</td>
                        <td>{item.quantity}</td>
                        <td>${Number(item.price ?? 0).toFixed(2)}</td>
                        <td className="fw-semibold">
                          ${(Number(item.price ?? 0) * Number(item.quantity ?? 1)).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-end fw-bold">Total: ${total.toFixed(2)}</div>
              </>
            ) : (
              <p className="text-muted mb-0">Cart is empty.</p>
            )}
          </div>
        </div>
      )}
 
      {/* Add item */}
      {activeCartId && (
        <div className="card">
          <div className="card-body">
            <h6 className="fw-semibold mb-3">Add item</h6>
            {addError   && <div className="alert alert-danger py-2 small">{addError}</div>}
            {addSuccess && <div className="alert alert-success py-2 small">Item added successfully.</div>}
            <div className="row g-3 mb-3">
              <div className="col">
                <label className="form-label small">Product ID</label>
                <input className="form-control" type="number" min="1"
                  value={itemForm.productId}
                  onChange={(e) => setItemForm((f) => ({ ...f, productId: e.target.value }))}
                  placeholder="e.g. 5" />
              </div>
              <div className="col">
                <label className="form-label small">Quantity</label>
                <input className="form-control" type="number" min="1"
                  value={itemForm.quantity}
                  onChange={(e) => setItemForm((f) => ({ ...f, quantity: e.target.value }))} />
              </div>
            </div>
            <button className="btn btn-dark btn-sm"
              onClick={handleAddItem} disabled={adding || !itemForm.productId}>
              {adding ? "Adding…" : "Add to cart"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}