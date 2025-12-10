import React, { useState } from "react";

export default function Gallery() {
  const categories = ["All", "Wedding", "PreWedding", "Haldi", "Engagement"];

  const images = [
    { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", category: "Wedding" },
    { src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80", category: "Wedding" },
    { src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80", category: "PreWedding" },
    { src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80", category: "Haldi" },
    { src: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80", category: "Engagement" },
    { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80", category: "Wedding" },
    { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", category: "Haldi" },
    { src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80", category: "PreWedding" },
    { src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80", category: "Engagement" },
    { src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80", category: "Wedding" },
    { src: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80", category: "Haldi" },
    { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80", category: "PreWedding" },
    { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", category: "Engagement" },
    { src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80", category: "Wedding" },
    { src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80", category: "Haldi" },
    { src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80", category: "PreWedding" },
    { src: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80", category: "Engagement" },
    { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80", category: "Wedding" },
  ];

  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? images
      : images.filter((img) => img.category === active);

  return (
    <div className="bg-white text-gray-900">

      {/* -------------------------------- HERO -------------------------------- */}
      <section
        className="relative bg-cover bg-center bg-no-repeat h-[90vh] flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1665960213508-48f07086d49c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
          <h1 className="text-4xl sm:text-6xl font-bold text-white">
            Our <span className="text-pink-400">Gallery</span>
          </h1>
          <p className="mt-3 text-pink-200 max-w-2xl">
            Explore our royal moments from weddings, pre-weddings & ceremonies.
          </p>
        </div>
      </section>

      {/* -------------------------------- FILTER BUTTONS -------------------------------- */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                active === cat
                  ? "bg-pink-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* -------------------------------- IMAGES GRID -------------------------------- */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl shadow-lg group"
            >
              <img
                src={img.src}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                alt="gallery"
              />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
