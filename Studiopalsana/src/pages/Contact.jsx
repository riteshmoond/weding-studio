import { createElement, useState } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import { getCurrentUser, getToken } from "../lib/api";
import { studio } from "../lib/studioData";

export default function Contact() {
  const user = getCurrentUser();
  const hasCustomerAccess = Boolean(getToken() && user?.role === "customer");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [message, setMessage] = useState("");
  async function submit(e) {
    e.preventDefault();
    try {
      await api("/messages", { method: "POST", body: JSON.stringify(form) });
      setMessage("Thanks. Our team will contact you shortly.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) { setMessage(error.message); }
  }
  if (!hasCustomerAccess) {
    return <main className="page-top"><section className="page-hero"><p className="eyebrow">Let’s Talk</p><h1>Your celebration starts here.</h1><p>Share your plans with us, check availability or visit our Palsana studio.</p></section><section className="section-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><h2 className="font-serif text-4xl">Contact the studio</h2><div className="mt-8 space-y-4">{[[Phone,studio.phone,studio.phoneLink],[MessageCircle,"Chat on WhatsApp",studio.whatsapp],[Mail,studio.email,`mailto:${studio.email}`],[MapPin,studio.address,studio.directions]].map(([Icon,label,href]) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm hover:-translate-y-0.5"><span className="rounded-full bg-rose-50 p-3 text-[#b3264b]">{createElement(Icon)}</span><span className="font-semibold">{label}</span></a>)}</div><iframe title="Studio location" className="mt-5 h-64 w-full rounded-2xl border-0" src={`https://maps.google.com/maps?q=${encodeURIComponent(studio.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`} loading="lazy" /></div><div className="rounded-4xl bg-white p-8 shadow-xl sm:p-10"><h2 className="font-serif text-3xl">Customer login required</h2><p className="mt-4 text-stone-600">Message sending is available only after customer login. Public overview pages remain accessible.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link to="/account" className="btn-primary justify-center">Login / Register</Link><Link to="/gallery" className="btn-secondary justify-center">Explore Gallery</Link></div></div></section></main>;
  }

  return <main className="page-top"><section className="page-hero"><p className="eyebrow">Let’s Talk</p><h1>Your celebration starts here.</h1><p>Share your plans with us, check availability or visit our Palsana studio.</p></section><section className="section-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><h2 className="font-serif text-4xl">Contact the studio</h2><div className="mt-8 space-y-4">{[[Phone,studio.phone,studio.phoneLink],[MessageCircle,"Chat on WhatsApp",studio.whatsapp],[Mail,studio.email,`mailto:${studio.email}`],[MapPin,studio.address,studio.directions]].map(([Icon,label,href]) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm hover:-translate-y-0.5"><span className="rounded-full bg-rose-50 p-3 text-[#b3264b]">{createElement(Icon)}</span><span className="font-semibold">{label}</span></a>)}</div><iframe title="Studio location" className="mt-5 h-64 w-full rounded-2xl border-0" src={`https://maps.google.com/maps?q=${encodeURIComponent(studio.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`} loading="lazy" /></div><form onSubmit={submit} className="rounded-4xl bg-white p-7 shadow-xl sm:p-10"><h2 className="font-serif text-3xl">Send an enquiry</h2><div className="form-grid mt-7"><label className="field-label">Full Name<input className="field-input" required value={form.name} onChange={(e) => setForm({...form,name:e.target.value})} /></label><label className="field-label">Phone<input className="field-input" required value={form.phone} onChange={(e) => setForm({...form,phone:e.target.value})} /></label><label className="field-label sm:col-span-2">Email<input type="email" className="field-input" required value={form.email} onChange={(e) => setForm({...form,email:e.target.value})} /></label><label className="field-label sm:col-span-2">Message<textarea className="field-input min-h-36" required value={form.message} onChange={(e) => setForm({...form,message:e.target.value})} /></label></div><button className="btn-primary mt-6">Send Enquiry</button>{message && <p className="mt-4 text-sm text-[#b3264b]">{message}</p>}</form></section></main>;
}
