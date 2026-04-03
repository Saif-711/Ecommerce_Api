import { useState, useEffect, useCallback } from "react";
import { productAPI, cartAPI } from "../services/api";

// ── Products ──────────────────────────────────────────────
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setProducts((await productAPI.getAll()) || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const createProduct = async (data) => {
    const created = await productAPI.create(data);
    setProducts((p) => [...p, created]);
    return created;
  };

  const updateProduct = async (id, data) => {
    const updated = await productAPI.update(id, data);
    setProducts((p) => p.map((x) => (x.id === id ? updated : x)));
    return updated;
  };

  const deleteProduct = async (id) => {
    await productAPI.delete(id);
    setProducts((p) => p.filter((x) => x.id !== id));
  };

  return { products, loading, error, refetch: fetchProducts, createProduct, updateProduct, deleteProduct };
}

// ── Single cart ───────────────────────────────────────────
export function useCart(cartId) {
  const [cart,    setCart]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const fetchCart = useCallback(async () => {
    if (!cartId) return;
    setLoading(true);
    setError(null);
    try {
      setCart(await cartAPI.getById(cartId));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [cartId]);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addItem = async (request) => {
    const res = await cartAPI.addItem(request);
    await fetchCart();
    return res;
  };

  return { cart, loading, error, refetch: fetchCart, addItem };
}

// ── All carts (admin only) ────────────────────────────────
export function useAllCarts() {
  const [carts,   setCarts]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        setCarts((await cartAPI.getAllCarts()) || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { carts, loading, error };
}