import { useMemo, useState } from "react";
import { CalendarDays, Check, ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { createBooking, getCurrentUser, getToken } from "../lib/api";

const steps = ["Your Details", "Event", "Date & Venue", "Package", "Add-ons", "Confirm"];
const eventTypes = ["Wedding", "Engagement", "Haldi", "Mehndi", "Reception", "Pre-Wedding", "Other"];
const packages = ["Basic", "Premium", "Luxury", "Custom"];
const addOns = ["Drone Coverage", "LED Screen", "Live Streaming", "Crane Camera", "Extra Photographer"];

export default function Booking() {
  const location = useLocation();
  const user = getCurrentUser();
  const hasCustomerAccess = Boolean(getToken() && user?.role === "customer");
  const initialPackage = new URLSearchParams(location.search).get("package") || "";
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [form, setForm] = useState({
    name: "", phone: "", email: "", city: "", eventType: "Wedding",
    eventDate: "", eventTime: "", venue: "", packageName: initialPackage,
    requirements: [], notes: "",
  });

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);
  const update = (name, value) => setForm((old) => ({ ...old, [name]: value }));
  const toggleRequirement = (item) =>
    update("requirements", form.requirements.includes(item)
      ? form.requirements.filter((value) => value !== item)
      : [...form.requirements, item]);

  const canContinue = [
    form.name && form.phone && form.email && form.city,
    form.eventType,
    form.eventDate && form.eventTime && form.venue,
    form.packageName,
    true,
    true,
  ][step];

  async function submit() {
    setStatus({ type: "loading", message: "" });
    try {
      const result = await createBooking(form);
      setStatus({ type: "success", message: `Booking request ${result.bookingId || ""} submitted successfully.` });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  }

  if (status.type === "success") {
    return (
      <main className="page-top section-shell">
        <div className="mx-auto max-w-2xl rounded-4xl bg-white p-10 text-center shadow-xl">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Check size={30} /></span>
          <h1 className="mt-6 font-serif text-4xl">Your date is on our calendar.</h1>
          <p className="mt-4 text-stone-600">{status.message} Our team will contact you shortly.</p>
          <button onClick={() => window.location.assign("/")} className="btn-primary mt-8">Back to Home</button>
        </div>
      </main>
    );
  }

  if (!hasCustomerAccess) {
    return (
      <main className="page-top">
        <section className="bg-[#17110f] px-6 py-20 text-center text-white">
          <p className="eyebrow">Reserve Your Date</p>
          <h1 className="font-serif text-5xl sm:text-6xl">Start your wedding story.</h1>
          <p className="mx-auto mt-4 max-w-xl text-stone-300">Booking is available only after customer login. You can still explore the website overview freely.</p>
        </section>
        <section className="section-shell">
          <div className="mx-auto max-w-2xl rounded-4xl bg-white p-8 text-center shadow-xl">
            <h2 className="font-serif text-3xl">Customer login required</h2>
            <p className="mt-4 text-stone-600">Please sign in or create a customer account to submit a booking request.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/account" className="btn-primary justify-center">Login / Register</Link>
              <Link to="/gallery" className="btn-secondary justify-center">Explore Gallery</Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-top">
      <section className="bg-[#17110f] px-6 py-20 text-center text-white">
        <p className="eyebrow">Reserve Your Date</p>
        <h1 className="font-serif text-5xl sm:text-6xl">Start your wedding story.</h1>
        <p className="mx-auto mt-4 max-w-xl text-stone-300">Complete this quick booking request. No payment is required right now.</p>
      </section>

      <section className="section-shell">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {steps.map((label, index) => (
              <div key={label} className={`rounded-xl p-3 text-center text-xs font-bold ${index <= step ? "bg-[#b3264b] text-white" : "bg-white text-stone-400"}`}>
                <span className="block text-base">{index + 1}</span>{label}
              </div>
            ))}
          </div>

          <div className="rounded-4xl bg-white p-6 shadow-xl shadow-stone-200/60 sm:p-10">
            <h2 className="font-serif text-3xl">{steps[step]}</h2>
            <p className="mt-2 text-stone-500">Step {step + 1} of {steps.length}</p>

            <div className="mt-8">
              {step === 0 && (
                <div className="form-grid">
                  <Field label="Full Name" value={form.name} onChange={(e) => update("name", e.target.value)} />
                  <Field label="Mobile Number" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                  <Field label="Email Address" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
                  <Field label="City" value={form.city} onChange={(e) => update("city", e.target.value)} />
                </div>
              )}
              {step === 1 && <ChoiceGrid items={eventTypes} selected={form.eventType} onSelect={(value) => update("eventType", value)} />}
              {step === 2 && (
                <div className="form-grid">
                  <Field label="Event Date" type="date" min={minDate} value={form.eventDate} onChange={(e) => update("eventDate", e.target.value)} />
                  <Field label="Event Time" type="time" value={form.eventTime} onChange={(e) => update("eventTime", e.target.value)} />
                  <label className="field-label sm:col-span-2">Venue Location<input className="field-input" value={form.venue} onChange={(e) => update("venue", e.target.value)} placeholder="Venue name and full address" /></label>
                </div>
              )}
              {step === 3 && <ChoiceGrid items={packages} selected={form.packageName} onSelect={(value) => update("packageName", value)} />}
              {step === 4 && (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {addOns.map((item) => (
                      <label key={item} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${form.requirements.includes(item) ? "border-[#b3264b] bg-rose-50" : "border-stone-200"}`}>
                        <input type="checkbox" checked={form.requirements.includes(item)} onChange={() => toggleRequirement(item)} className="accent-[#b3264b]" />
                        <span className="font-semibold">{item}</span>
                      </label>
                    ))}
                  </div>
                  <label className="field-label mt-6">Anything else?<textarea className="field-input min-h-28" value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Share your vision, guest count or special requests" /></label>
                </>
              )}
              {step === 5 && (
                <div className="grid gap-4 rounded-2xl bg-stone-50 p-6 sm:grid-cols-2">
                  {[
                    ["Name", form.name], ["Phone", form.phone], ["Event", form.eventType],
                    ["Date", `${form.eventDate} at ${form.eventTime}`], ["Venue", form.venue],
                    ["Package", form.packageName], ["Add-ons", form.requirements.join(", ") || "None"],
                  ].map(([label, value]) => <div key={label}><p className="text-xs font-bold uppercase tracking-wider text-stone-400">{label}</p><p className="mt-1 font-semibold">{value}</p></div>)}
                </div>
              )}
            </div>

            {status.type === "error" && <p className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">{status.message}</p>}
            <div className="mt-9 flex justify-between gap-4">
              <button disabled={step === 0} onClick={() => setStep(step - 1)} className="btn-secondary disabled:opacity-30"><ChevronLeft size={18} /> Back</button>
              {step < steps.length - 1 ? (
                <button disabled={!canContinue} onClick={() => setStep(step + 1)} className="btn-primary disabled:cursor-not-allowed disabled:opacity-40">Continue <ChevronRight size={18} /></button>
              ) : (
                <button onClick={submit} disabled={status.type === "loading"} className="btn-primary">
                  {status.type === "loading" ? <LoaderCircle className="animate-spin" size={18} /> : <CalendarDays size={18} />} Submit Booking
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({ label, ...props }) {
  return <label className="field-label">{label}<input className="field-input" required {...props} /></label>;
}

function ChoiceGrid({ items, selected, onSelect }) {
  return <div className="grid gap-3 sm:grid-cols-2">{items.map((item) => <button key={item} type="button" onClick={() => onSelect(item)} className={`rounded-xl border p-5 text-left font-bold transition ${selected === item ? "border-[#b3264b] bg-[#b3264b] text-white" : "border-stone-200 hover:border-[#b3264b]"}`}>{item}</button>)}</div>;
}

