import { Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { studio } from "../lib/studioData";

export default function Footer() {
  return (
    <footer className="bg-[#17110f] px-6 pb-8 pt-16 text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-12 md:grid-cols-3">
        <div><h2 className="font-serif text-3xl text-[#e8c27a]">{studio.name}</h2><p className="mt-4 max-w-sm leading-7">{studio.tagline}. Luxury photography and films for celebrations across India.</p><div className="mt-5 flex gap-3"><a className="social-link" href="#"><Instagram size={18} /></a><a className="social-link" href="#"><Youtube size={18} /></a></div></div>
        <div><h3 className="font-bold text-white">Explore</h3><div className="mt-4 grid grid-cols-2 gap-3 text-sm"><Link to="/about">About</Link><Link to="/gallery">Gallery</Link><Link to="/packages">Packages</Link><Link to="/booking">Booking</Link><Link to="/reviews">Reviews</Link><Link to="/admin/login">Admin</Link></div></div>
        <div><h3 className="font-bold text-white">Contact</h3><div className="mt-4 space-y-4 text-sm"><a className="flex gap-3" href={studio.phoneLink}><Phone size={18} className="text-[#e8c27a]" />{studio.phone}</a><a className="flex gap-3" href={`mailto:${studio.email}`}><Mail size={18} className="text-[#e8c27a]" />{studio.email}</a><a className="flex gap-3" href={studio.directions}><MapPin size={18} className="text-[#e8c27a]" />{studio.address}</a></div></div>
      </div>
      <div className="mx-auto mt-7 flex max-w-7xl flex-col justify-between gap-3 text-xs text-stone-500 sm:flex-row"><p>© {new Date().getFullYear()} {studio.name}. All rights reserved.</p><p>Made for timeless celebrations.</p></div>
      <a href={studio.whatsapp} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-xl">Book on WhatsApp</a>
    </footer>
  );
}

