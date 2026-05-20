import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (
      email === "aayush1@gmail.com" &&
      password === "aayush123"
    ) {

      localStorage.setItem("admin", "true");

      navigate("/dashboard");

    } else {

      alert("Invalid credentials");
    }
  };

  return (

    <div className="min-h-screen bg-slate-900 flex items-center justify-center">

      <div className="bg-slate-800 p-8 rounded-2xl w-[400px]">

        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          Admin Login
        </h1>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Admin Email"
            className="w-full p-3 rounded-xl bg-slate-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl bg-slate-700 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 py-3 rounded-xl text-white"
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}