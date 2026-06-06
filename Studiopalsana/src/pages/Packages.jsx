import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import { defaultPackages } from "../lib/studioData";

export default function Packages() {
  const [packages, setPackages] = useState(defaultPackages);

  useEffect(() => {
    api("/packages").then((data) => data.length && setPackages(data)).catch(() => {});
  }, []);

  return (
    <main className="page-top">
      <section className="page-hero">
        <p className="eyebrow">Simple, Transparent Pricing</p>
        <h1>Choose your perfect coverage.</h1>
        <p>Every package can be tailored to your events, location and creative vision.</p>
      </section>
      <section className="section-shell">
        <div className="grid gap-7 lg:grid-cols-3">
          {packages.map((plan, index) => (
            <article key={plan._id || plan.title} className={`relative rounded-[2rem] border bg-white p-8 ${plan.featured || index === 1 ? "border-[#b3264b] shadow-2xl" : "border-stone-200 shadow-sm"}`}>
              {(plan.featured || index === 1) && <span className="absolute right-6 top-6 rounded-full bg-[#b3264b] px-3 py-1 text-xs font-bold text-white">Most Popular</span>}
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#b3264b]">{plan.title || plan.name}</p>
              <h2 className="mt-4 font-serif text-4xl">₹{Number(plan.price).toLocaleString("en-IN")}{plan.priceSuffix}</h2>
              <p className="mt-3 min-h-12 text-stone-500">{plan.description}</p>
              <ul className="my-8 space-y-4">
                {plan.features?.map((feature) => <li key={feature} className="flex gap-3"><Check className="mt-0.5 text-[#b3264b]" size={18} /><span>{feature}</span></li>)}
              </ul>
              <Link to={`/booking?package=${encodeURIComponent(plan.title || plan.name)}`} className={index === 1 ? "btn-primary w-full justify-center" : "btn-secondary w-full justify-center"}>Book Now</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

