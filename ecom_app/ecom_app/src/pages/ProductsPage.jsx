import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then(setProducts);
  }, []);

  return (
    <div>
      <h2>Products</h2>

      {products.map(p => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>{p.price}</p>
        </div>
      ))}
    </div>
  );
}