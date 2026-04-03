const BASE_URL = "http://localhost:8081";

export const api = {
  async post(endpoint, data) {
    const res = await fetch(BASE_URL + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async get(endpoint) {
    const token = localStorage.getItem("token");

    const res = await fetch(BASE_URL + endpoint, {
      headers: {
        "Authorization": token ? `Bearer ${token}` : ""
      }
    });
    return res.json();
  }
};