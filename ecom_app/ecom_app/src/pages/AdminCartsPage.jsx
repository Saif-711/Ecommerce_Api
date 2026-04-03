import { useAllCarts } from "../hooks/useData";
 
export default function AdminCartsPage() {
  const { carts, loading, error } = useAllCarts();
 
  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-1">All Carts</h4>
      <p className="text-muted mb-4 small">Admin view — {carts.length} cart{carts.length !== 1 ? "s" : ""}</p>
 
      {error   && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="text-center py-5"><div className="spinner-border" /></div>}
 
      {!loading && carts.map((cart) => (
        <div key={cart.id} className="card mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <span className="fw-semibold">Cart #{cart.id}</span>
                {cart.userEmail && <span className="text-muted ms-2 small">{cart.userEmail}</span>}
              </div>
              <span className="badge bg-info text-dark">
                {cart.items?.length ?? 0} item{cart.items?.length !== 1 ? "s" : ""}
              </span>
            </div>
 
            {cart.items?.length > 0 ? (
              <table className="table table-sm mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item, i) => (
                    <tr key={i}>
                      <td>{item.productName || `Product #${item.productId}`}</td>
                      <td>{item.quantity}</td>
                      <td>${Number(item.price ?? 0).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted mb-0 small">Empty cart.</p>
            )}
          </div>
        </div>
      ))}
 
      {!loading && carts.length === 0 && !error && (
        <p className="text-muted">No carts found.</p>
      )}
    </div>
  );
}