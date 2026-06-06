import { createElement } from "react";
import { ArrowRight, Camera, Film, Heart, MapPin, Play, Quote, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { galleryItems, projects, studio } from "../lib/studioData";
import heroImage from "../assets/1.jpg";

const stats = [
  ["10+", "Years Experience"],
  ["500+", "Weddings Covered"],
  ["1000+", "Happy Clients"],
  ["25+", "Creative Experts"],
];

export default function Home() {
  return (
    <main>
      <section className="relative flex min-h-screen items-end overflow-hidden bg-[#17110f] pb-20 pt-32 text-white lg:items-center lg:pb-0">
        <img src={heroImage} alt="Indian wedding couple" className="absolute inset-0 h-full w-full object-cover opacity-65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17110f] via-transparent to-black/20" />
        <div className="relative mx-auto w-full max-w-7xl px-6">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.38em] text-[#e8c27a]">Luxury Wedding Photography & Cinematography</p>
          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.02] sm:text-7xl lg:text-8xl">
            Every love story deserves a <span className="italic text-[#e8c27a]">royal frame.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-200">
            Capturing your special moments with creativity, emotion and timeless cinematic elegance.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link to="/booking" className="btn-primary">Book Now <ArrowRight size={18} /></Link>
            <Link to="/gallery" className="btn-outline"><Play size={17} /> View Portfolio</Link>
            <a href={studio.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost">WhatsApp Us</a>
          </div>
        </div>
      </section>

      <section className="bg-[#211815] text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-4 py-9 lg:grid-cols-4">
          {stats.map(([number, label]) => (
            <div key={label} className="px-4 py-3 text-center">
              <strong className="block font-serif text-3xl text-[#e8c27a] sm:text-4xl">{number}</strong>
              <span className="mt-1 block text-xs uppercase tracking-widest text-stone-400">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div className="relative">
          <img src={galleryItems[1].src} alt="Wedding portrait" className="h-[560px] w-full rounded-[2rem] object-cover" />
          <div className="absolute -bottom-6 -right-3 hidden max-w-xs rounded-2xl bg-[#b3264b] p-7 text-white shadow-2xl sm:block">
            <Quote className="mb-3 text-[#e8c27a]" />
            <p className="font-serif text-xl italic">We preserve the feeling behind every beautiful frame.</p>
          </div>
        </div>
        <div>
          <p className="eyebrow">Our Story</p>
          <h2 className="section-title">Memories crafted with heart and artistry.</h2>
          <p className="section-copy">
            For over a decade, our Jaipur-based team has documented celebrations across India. We blend candid photography, editorial portraits and cinematic storytelling into one seamless experience.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              [Camera, "Creative Frames"],
              [Film, "4K Films"],
              [Heart, "Real Emotions"],
            ].map(([Icon, label]) => (
              <div key={label} className="rounded-2xl border border-stone-200 bg-white p-5">
                {createElement(Icon, { className: "mb-3 text-[#b3264b]" })}
                <span className="font-semibold">{label}</span>
              </div>
            ))}
          </div>
          <Link to="/about" className="mt-8 inline-flex items-center gap-2 font-bold text-[#b3264b]">Meet our team <ArrowRight size={17} /></Link>
        </div>
      </section>

      <section className="bg-[#17110f] py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Selected Work</p>
              <h2 className="section-title text-white">Latest wedding stories.</h2>
            </div>
            <Link to="/gallery" className="inline-flex items-center gap-2 text-[#e8c27a]">Explore all stories <ArrowRight size={17} /></Link>
          </div>
          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {projects.map((project) => (
              <article key={project.title} className="group overflow-hidden rounded-[1.6rem] bg-white/5">
                <div className="h-80 overflow-hidden">
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl">{project.title}</h3>
                  <p className="mt-3 flex items-center gap-2 text-sm text-stone-400"><MapPin size={15} /> {project.location} · {project.date}</p>
                  <Link to="/gallery" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#e8c27a]">View Album <ArrowRight size={15} /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell text-center">
        <p className="eyebrow">Kind Words</p>
        <h2 className="section-title">Loved by our couples.</h2>
        <div className="mx-auto mt-10 max-w-3xl rounded-[2rem] bg-white p-8 shadow-xl shadow-stone-200/60 sm:p-12">
          <div className="mb-5 flex justify-center gap-1 text-[#d9a441]">{[1,2,3,4,5].map((n) => <Star key={n} fill="currentColor" size={19} />)}</div>
          <blockquote className="font-serif text-2xl italic leading-relaxed text-stone-700">
            “The team made us feel completely at ease and captured moments we did not even know were happening. Our wedding film feels like us.”
          </blockquote>
          <p className="mt-6 font-bold">Rohan & Priya</p>
          <p className="text-sm text-stone-500">Jaipur</p>
          <Link to="/reviews" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#b3264b]">Read all reviews <ArrowRight size={15} /></Link>
        </div>
      </section>

      <section className="mx-auto mb-24 max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#b3264b] px-7 py-16 text-center text-white sm:px-14">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[40px] border-white/5" />
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#f3d994]">Your date is special</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-semibold sm:text-6xl">Let us turn it into a story you will relive forever.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/booking" className="btn-light">Check Availability</Link>
            <a href={studio.phoneLink} className="btn-outline">Call {studio.phone}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
