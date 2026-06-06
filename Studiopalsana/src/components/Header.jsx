import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { studio } from "../lib/studioData";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Gallery", "/gallery"],
  ["Packages", "/packages"],
  ["Reviews", "/reviews"],
  ["Contact", "/contact"],
  ["Account", "/account"],
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#17110f]/90 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        <Link to="/" className="leading-tight">
          <span className="block font-serif text-xl font-bold tracking-wide text-[#e8c27a]">
            Royal Wedding
          </span>
          <span className="text-[10px] uppercase tracking-[0.35em] text-stone-300">Studio</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? "text-[#e8c27a]" : "text-stone-200 hover:text-white"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href={studio.phoneLink} className="rounded-full border border-white/20 p-3 hover:bg-white/10" aria-label="Call now">
            <Phone size={17} />
          </a>
          <Link to="/booking" className="rounded-full bg-[#b3264b] px-5 py-3 text-sm font-semibold hover:bg-[#941d3d]">
            Book Your Date
          </Link>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-[#17110f] px-5 py-5 lg:hidden">
          {links.map(([label, path]) => (
            <NavLink key={path} to={path} onClick={() => setOpen(false)} className="block border-b border-white/10 py-3 text-stone-200">
              {label}
            </NavLink>
          ))}
          <Link to="/booking" onClick={() => setOpen(false)} className="mt-5 block rounded-full bg-[#b3264b] px-5 py-3 text-center font-semibold">
            Book Your Date
          </Link>
        </nav>
      )}
    </header>
  );
}
