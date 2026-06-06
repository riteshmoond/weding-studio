import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { AdminShell } from "./AdminBookings";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("Loading reviews...");
  const load = async () => {
    try {
      setMessage("Loading reviews...");
      setReviews(await api("/reviews/admin"));
      setMessage("");
    } catch (e) {
      setMessage(e.message);
      setReviews([]);
    }
  };
  useEffect(() => {
    void load();
  }, []);

  async function update(id, status) {
    const changed = await api(`/reviews/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
    setReviews((items) => items.map((item) => item._id === id ? changed : item));
  }
  async function remove(id) {
    await api(`/reviews/${id}`, { method: "DELETE" });
    setReviews((items) => items.filter((item) => item._id !== id));
  }

  return <AdminShell title="Review Management">{message && <p className="mb-5 rounded-xl bg-white p-4 shadow-sm">{message}</p>}<div className="grid gap-5 lg:grid-cols-2">{reviews.length ? reviews.map((review) => <article key={review._id} className="rounded-2xl bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><strong>{review.name}</strong><span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold">{review.status}</span></div><p className="mt-2 text-amber-600">{"★".repeat(review.rating || 0)}</p><p className="mt-4 text-stone-600">{review.comment}</p><div className="mt-5 flex gap-2"><button type="button" className="admin-action text-emerald-700" onClick={() => update(review._id, "Approved")}>Approve</button><button type="button" className="admin-action text-amber-700" onClick={() => update(review._id, "Rejected")}>Reject</button><button type="button" className="admin-action text-red-700" onClick={() => remove(review._id)}>Delete</button></div></article>) : !message ? <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center text-stone-500 lg:col-span-2">No reviews yet. Customer feedback will appear here for moderation.</div> : null}</div></AdminShell>;
}

