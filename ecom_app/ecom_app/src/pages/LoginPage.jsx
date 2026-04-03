import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    const data = await api.post("/auth/login", {
      email,
      password
    });
    console.log(data);
    if(data.token){
        localStorage.setItem("token", data.token);
        alert("Logged in successfully");
        navigate("/products");
    }else{
        alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}