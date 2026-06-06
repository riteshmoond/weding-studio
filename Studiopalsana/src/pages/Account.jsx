import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, clearSession, getCurrentUser, getToken, setSession } from "../lib/api";

export default function Account() {
  const [user, setUser] = useState(getCurrentUser());
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (getToken() && user?.role === "customer") {
      api("/bookings").then(setBookings).catch((error) => setMessage(error.message));
    }
  }, [user]);

  async function submit(e) {
    e.preventDefault();
    setMessage("");
    try {
      const result = await api(`/auth/${mode}`, { method: "POST", body: JSON.stringify(form) });
      setSession(result);
      setUser(result.user);
    } catch (error) {
      setMessage(error.message);
    }
  }

  if (user?.role === "customer") {
    return <main className="page-top"><section className="page-hero"><p className="eyebrow">Customer Account</p><h1>Welcome, {user.name}.</h1><p>Track the wedding requests submitted from your signed-in account.</p></section><section className="section-shell"><div className="mb-7 flex flex-wrap justify-between gap-4"><h2 className="font-serif text-3xl">My Bookings</h2><div className="flex gap-3"><Link to="/booking" className="btn-primary">New Booking</Link><button className="btn-secondary" onClick={() => { clearSession(); setUser(null); setBookings([]); }}>Logout</button></div></div>{bookings.length ? <div className="grid gap-5 md:grid-cols-2">{bookings.map((booking) => <article key={booking._id} className="rounded-2xl bg-white p-6 shadow-sm"><div className="flex justify-between gap-4"><h3 className="font-serif text-2xl">{booking.eventType}</h3><span className="h-fit rounded-full bg-stone-100 px-3 py-1 text-xs font-bold">{booking.status}</span></div><p className="mt-3 text-stone-500">{new Date(booking.eventDate).toLocaleDateString("en-IN")} · {booking.venue}</p><p className="mt-2 font-bold text-[#b3264b]">{booking.packageName} Package</p><small className="mt-4 block text-stone-400">{booking.bookingId}</small></article>)}</div> : <div className="rounded-2xl bg-white p-10 text-center"><p className="text-stone-500">No account-linked bookings yet.</p><Link to="/booking" className="btn-primary mt-5">Book Your Date</Link></div>}</section></main>;
  }

  return <main className="page-top"><section className="section-shell"><form onSubmit={submit} className="mx-auto max-w-lg rounded-[2rem] bg-white p-8 shadow-xl"><p className="eyebrow">Customer Access</p><h1 className="mt-2 font-serif text-4xl">{mode === "login" ? "Welcome back" : "Create your account"}</h1><div className="mt-7 space-y-4">{mode === "register" && <><input className="field-input" placeholder="Full name" required value={form.name} onChange={(e) => setForm({...form,name:e.target.value})} /><input className="field-input" placeholder="Phone number" value={form.phone} onChange={(e) => setForm({...form,phone:e.target.value})} /></>}<input className="field-input" type="email" placeholder="Email address" required value={form.email} onChange={(e) => setForm({...form,email:e.target.value})} /><input className="field-input" type="password" minLength="6" placeholder="Password" required value={form.password} onChange={(e) => setForm({...form,password:e.target.value})} />{message && <p className="text-sm text-red-600">{message}</p>}<button className="btn-primary w-full justify-center">{mode === "login" ? "Login" : "Register"}</button></div><button type="button" className="mt-5 w-full text-sm font-bold text-[#b3264b]" onClick={() => setMode(mode === "login" ? "register" : "login")}>{mode === "login" ? "New customer? Create an account" : "Already registered? Login"}</button></form></section></main>;
}
