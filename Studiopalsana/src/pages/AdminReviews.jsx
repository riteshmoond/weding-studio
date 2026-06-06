import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { AdminShell } from "./AdminBookings";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("Loading reviews...");
  const load = () => api("/reviews/admin").then((data) => { setReviews(data); setMessage(""); }).catch((e) => setMessage(e.message));
  useEffect(load, []);

  async function update(id, status) {
    const changed = await api(`/reviews/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
    setReviews((items) => items.map((item) => item._id === id ? changed : item));
  }
  async function remove(id) {
    await api(`/reviews/${id}`, { method: "DELETE" });
    setReviews((items) => items.filter((item) => item._id !== id));
  }

  return <AdminShell title="Review Management">{message && <p className="mb-5">{message}</p>}<div className="grid gap-5 lg:grid-cols-2">{reviews.map((review) => <article key={review._id} className="rounded-2xl bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><strong>{review.name}</strong><span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold">{review.status}</span></div><p className="mt-2 text-amber-600">{"★".repeat(review.rating)}</p><p className="mt-4 text-stone-600">{review.comment}</p><div className="mt-5 flex gap-2"><button className="admin-action text-emerald-700" onClick={() => update(review._id, "Approved")}>Approve</button><button className="admin-action text-amber-700" onClick={() => update(review._id, "Rejected")}>Reject</button><button className="admin-action text-red-700" onClick={() => remove(review._id)}>Delete</button></div></article>)}</div></AdminShell>;
}

