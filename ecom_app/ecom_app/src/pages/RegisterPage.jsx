import { useState } from "react";
import { api } from "../services/api";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    await api.post("/auth/register", {
      fullName,
      email,
      password
    });

    alert("Registered successfully");
  };

  return (
    <div>
      <h2>Register</h2>

      <input placeholder="Name" onChange={(e)=>setFullName(e.target.value)} />
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}