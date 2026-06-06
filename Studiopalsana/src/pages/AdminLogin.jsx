import { useState } from "react";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api, setSession } from "../lib/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await api("/auth/login", { method: "POST", body: JSON.stringify(form) });
      if (data.user.role !== "admin") throw new Error("Admin access required");
      setSession(data);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#17110f] p-5">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white shadow-2xl backdrop-blur">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#b3264b]"><LockKeyhole /></span>
        <p className="eyebrow mt-7">Secure Access</p>
        <h1 className="mt-2 font-serif text-4xl">Admin login</h1>
        <div className="mt-8 space-y-4">
          <input className="dark-input" type="email" placeholder="Admin email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="dark-input" type="password" placeholder="Password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {error && <p className="rounded-xl bg-red-500/15 p-3 text-sm text-red-200">{error}</p>}
          <button className="btn-primary w-full justify-center" disabled={loading}>{loading && <LoaderCircle size={18} className="animate-spin" />} Login</button>
        </div>
      </form>
    </main>
  );
}

