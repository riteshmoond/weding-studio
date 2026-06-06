import { useEffect, useState } from "react";
import { LoaderCircle, Star } from "lucide-react";
import { api } from "../lib/api";

const fallback = [
  { _id: "one", name: "Rahul Sharma", rating: 5, comment: "Amazing photography service. The team captured every emotion beautifully." },
  { _id: "two", name: "Neha & Sahil", rating: 5, comment: "Professional, patient and wonderfully creative. Our cinematic film is stunning." },
];

export default function Reviews() {
  const [reviews, setReviews] = useState(fallback);
  const [form, setForm] = useState({ name: "", email: "", rating: 5, comment: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { api("/reviews").then((data) => data.length && setReviews(data)).catch(() => {}); }, []);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await api("/reviews", { method: "POST", body: JSON.stringify(form) });
      setForm({ name: "", email: "", rating: 5, comment: "" });
      setMessage("Thank you. Your review will appear after admin approval.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-top">
      <section className="page-hero"><p className="eyebrow">Client Love</p><h1>Words that stay with us.</h1><p>Real experiences from couples whose celebrations became part of our story.</p></section>
      <section className="section-shell grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <div className="grid gap-5 sm:grid-cols-2">
          {reviews.map((review) => <article key={review._id} className="rounded-2xl bg-white p-7 shadow-sm"><div className="flex gap-1 text-[#d9a441]">{Array.from({ length: review.rating }, (_, i) => <Star key={i} size={17} fill="currentColor" />)}</div><p className="mt-5 leading-7 text-stone-600">“{review.comment}”</p><p className="mt-5 font-bold">{review.name}</p></article>)}
        </div>
        <form onSubmit={submit} className="h-fit rounded-[2rem] bg-[#211815] p-8 text-white">
          <p className="eyebrow">Share Your Experience</p><h2 className="font-serif text-3xl">Add a review</h2>
          <div className="mt-7 space-y-4">
            <input className="dark-input" placeholder="Your name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="dark-input" placeholder="Email address" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <select className="dark-input" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}>{[5,4,3,2,1].map((n) => <option key={n} value={n}>{n} Stars</option>)}</select>
            <textarea className="dark-input min-h-32" placeholder="Tell us about your experience" required value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
            <button className="btn-primary w-full justify-center" disabled={loading}>{loading && <LoaderCircle className="animate-spin" size={18} />} Submit Review</button>
            {message && <p className="text-sm text-[#f3d994]">{message}</p>}
          </div>
        </form>
      </section>
    </main>
  );
}

