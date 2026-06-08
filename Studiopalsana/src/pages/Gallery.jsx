import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import { api } from "../lib/api";

const categories = ["All", "Wedding", "Bride", "Groom", "Couple", "Pre-Wedding", "Engagement", "Haldi", "Mehndi", "Reception", "Drone", "Cinematic"];

export default function Gallery() {
  const [active, setActive] = useState("All");
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api("/gallery").then((data) => {
      setItems(Array.isArray(data) ? data.map((item) => ({ ...item, src: item.imageUrl })) : []);
    }).catch(() => setItems([]));
  }, []);

  const filtered = active === "All" ? items : items.filter((item) => item.category === active);

  return (
    <main className="page-top">
      <section className="page-hero">
        <p className="eyebrow">Our Portfolio</p>
        <h1>Stories told in light and emotion.</h1>
        <p>Explore weddings, portraits, celebrations, destination stories and cinematic frames.</p>
      </section>
      <section className="section-shell">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => <button key={category} onClick={() => setActive(category)} className={`rounded-full px-4 py-2 text-sm font-bold ${active === category ? "bg-[#b3264b] text-white" : "bg-white text-stone-600 hover:bg-stone-100"}`}>{category}</button>)}
        </div>
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {filtered.map((item, index) => (
            <button key={item._id || `${item.src}-${index}`} onClick={() => setSelected(item)} className="group relative mb-5 block w-full overflow-hidden rounded-2xl text-left">
              {item.mediaType === "video" ? <video src={item.imageUrl} className="w-full" /> : <img src={item.src || item.imageUrl} alt={item.title || item.category} className="w-full transition duration-700 group-hover:scale-105" />}
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-5 opacity-0 transition group-hover:opacity-100">
                <span className="text-white"><strong className="block font-serif text-xl">{item.title || item.category}</strong><small>{item.category}</small></span>
              </span>
              {item.mediaType === "video" && <Play className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white" fill="currentColor" />}
            </button>
          ))}
        </div>
        {!filtered.length && <p className="py-20 text-center text-stone-500">No work has been added to this category yet.</p>}
      </section>
      {selected && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-5" onClick={() => setSelected(null)}><button className="absolute right-6 top-6 text-white"><X size={32} /></button><img src={selected.src || selected.imageUrl} alt={selected.title} className="max-h-[85vh] max-w-full rounded-xl object-contain" /></div>}
    </main>
  );
}

