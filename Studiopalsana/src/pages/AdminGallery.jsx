import { useEffect, useState } from "react";
import { api, resolveMediaUrl } from "../lib/api";
import { AdminShell } from "./AdminBookings";

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", category: "Wedding", album: "", image: null });
  const [message, setMessage] = useState("");
  const load = async () => {
    try {
      setMessage("");
      setItems(await api("/gallery"));
    } catch (e) {
      setMessage(e.message);
    }
  };
  useEffect(() => {
    void load();
  }, []);
  async function upload(e) {
    e.preventDefault();
    if (!form.image) return;
    const body = new FormData();
    Object.entries(form).forEach(([key,value]) => body.append(key, value));
    setMessage("Uploading...");
    try { await api("/gallery/upload", { method: "POST", body }); setForm({ title: "", category: "Wedding", album: "", image: null }); setMessage("Upload complete."); load(); }
    catch (error) { setMessage(error.message); }
  }
  async function remove(id) { await api(`/gallery/${id}`, { method: "DELETE" }); load(); }
  return <AdminShell title="Gallery Management"><form onSubmit={upload} className="rounded-2xl bg-white p-6 shadow-sm"><div className="form-grid"><label className="field-label">Title<input className="field-input" value={form.title} onChange={(e) => setForm({...form,title:e.target.value})} /></label><label className="field-label">Category<select className="field-input" value={form.category} onChange={(e) => setForm({...form,category:e.target.value})}>{["Wedding","Bride","Groom","Couple","Pre-Wedding","Engagement","Haldi","Mehndi","Reception","Drone","Cinematic"].map((x) => <option key={x}>{x}</option>)}</select></label><label className="field-label">Album<input className="field-input" value={form.album} onChange={(e) => setForm({...form,album:e.target.value})} /></label><label className="field-label">Photo or video<input type="file" accept="image/*,video/*" className="field-input" required onChange={(e) => setForm({...form,image:e.target.files[0]})} /></label></div><button className="btn-primary mt-5">Upload to Cloudinary</button>{message && <p className="mt-3 text-sm">{message}</p>}</form><div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">{items.length ? items.map((item) => { const mediaUrl = resolveMediaUrl(item.imageUrl); return <article key={item._id} className="overflow-hidden rounded-2xl bg-white">{item.mediaType === "video" ? <video src={mediaUrl} controls className="h-44 w-full object-cover" /> : <img src={mediaUrl} alt={item.title} className="h-44 w-full object-cover" />}<div className="p-4"><strong>{item.title || "Untitled"}</strong><small className="block text-stone-500">{item.category}</small><small className="mt-2 block break-all text-xs text-stone-400">{mediaUrl}</small><button type="button" className="admin-action mt-3 text-red-700" onClick={() => remove(item._id)}>Delete</button></div></article>; }) : <div className="col-span-full rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center text-stone-500">No gallery items yet. Upload photos, videos, or album covers to start building the portfolio.</div>}</div></AdminShell>;
}

