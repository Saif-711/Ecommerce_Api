import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    api.get("/cart").then(setCart);//         api/cart
  }, []);
 
  return (
    <div>
      <h2>My Cart</h2>

      {cart.map(item => (
        <div key={item.id}>
          {item.productName} - {item.quantity}
        </div>
      ))}
    </div>
  );
}