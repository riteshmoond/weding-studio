import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();

    if (data.email === "admin@studio.com" && data.password === "admin@9257") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl w-full max-w-md shadow-xl">
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Admin <span className="text-pink-400">Login</span>
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-white">Email</label>
            <input
              type="email"
              className="w-full mt-2 px-4 py-3 bg-black/30 text-white border border-white/20 rounded-xl"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>

          <div>
            <label className="text-white">Password</label>
            <input
              type="password"
              className="w-full mt-2 px-4 py-3 bg-black/30 text-white border border-white/20 rounded-xl"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>

          <button className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700">
            Login →
          </button>
        </form>
      </div>
    </div>
  );
}
