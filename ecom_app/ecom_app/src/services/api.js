const BASE_URL = "http://localhost:8081";
 
function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
 
async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Error ${res.status}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
 
// Auth
export const authAPI = {
  register: (data) =>
    fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
 
  login: (data) =>
    fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
};
 
// Products
export const productAPI = {
  getAll: () =>
    fetch(`${BASE_URL}/products`, { headers: getHeaders() }).then(handleResponse),
 
  getById: (id) =>
    fetch(`${BASE_URL}/products/${id}`, { headers: getHeaders() }).then(handleResponse),
 
  create: (product) =>
    fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(product),
    }).then(handleResponse),
 
  update: (id, product) =>
    fetch(`${BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(product),
    }).then(handleResponse),
 
  delete: (id) =>
    fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    }).then(handleResponse),
};
 
// Cart
export const cartAPI = {
  getAllCarts: () =>
    fetch(`${BASE_URL}/api/cart`, { headers: getHeaders() }).then(handleResponse),
 
  getById: (cartId) =>
    fetch(`${BASE_URL}/api/cart/${cartId}`, { headers: getHeaders() }).then(handleResponse),
 
  addItem: (request) =>
    fetch(`${BASE_URL}/api/cart/items`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(request),
    }).then(handleResponse),
};