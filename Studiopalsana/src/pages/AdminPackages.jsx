import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { AdminShell } from "./AdminBookings";

const empty = { title: "", price: "", description: "", features: "", featured: false };

export default function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const load = async () => {
    try {
      setPackages(await api("/packages"));
    } catch {
      setPackages([]);
    }
  };
  useEffect(() => {
    void load();
  }, []);
  async function save(e) {
    e.preventDefault();
    const body = { ...form, price: Number(form.price), features: form.features.split("\n").map((x) => x.trim()).filter(Boolean) };
    await api(editing ? `/packages/${editing}` : "/packages", { method: editing ? "PATCH" : "POST", body: JSON.stringify(body) });
    setForm(empty); setEditing(null); load();
  }
  function edit(item) { setEditing(item._id); setForm({ ...item, features: item.features.join("\n") }); }
  async function remove(id) { await api(`/packages/${id}`, { method: "DELETE" }); load(); }
  return <AdminShell title="Package Management"><form onSubmit={save} className="rounded-2xl bg-white p-6 shadow-sm"><div className="form-grid"><label className="field-label">Package Name<input className="field-input" required value={form.title} onChange={(e) => setForm({...form,title:e.target.value})} /></label><label className="field-label">Price<input type="number" className="field-input" required value={form.price} onChange={(e) => setForm({...form,price:e.target.value})} /></label><label className="field-label sm:col-span-2">Description<textarea className="field-input" value={form.description} onChange={(e) => setForm({...form,description:e.target.value})} /></label><label className="field-label sm:col-span-2">Features, one per line<textarea className="field-input min-h-32" value={form.features} onChange={(e) => setForm({...form,features:e.target.value})} /></label></div><label className="mt-4 flex gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({...form,featured:e.target.checked})} /> Featured package</label><button className="btn-primary mt-5">{editing ? "Update Package" : "Add Package"}</button></form><div className="mt-7 grid gap-5 lg:grid-cols-3">{packages.length ? packages.map((item) => <article key={item._id} className="rounded-2xl bg-white p-6"><h2 className="font-serif text-2xl">{item.title}</h2><p className="mt-2 font-bold text-[#b3264b]">₹{Number(item.price).toLocaleString("en-IN")}</p><p className="mt-3 text-sm text-stone-500">{item.description}</p><div className="mt-5 flex gap-2"><button type="button" className="admin-action" onClick={() => edit(item)}>Edit</button><button type="button" className="admin-action text-red-700" onClick={() => remove(item._id)}>Delete</button></div></article>) : <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center text-stone-500 lg:col-span-3">No packages are set up yet. Add one to publish pricing options on the site.</div>}</div></AdminShell>;
}

