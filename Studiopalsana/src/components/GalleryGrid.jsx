import React from "react";

export default function GalleryPreview() {
  const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800">
            Our <span className="text-pink-600">Gallery</span>
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            A glimpse of beautiful wedding moments captured by us.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition"
            >
              <div className="h-56 sm:h-64 lg:h-72 overflow-hidden">
                <img
                  src={src}
                  alt={`gallery-${index}`}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>

        {/* View Button */}
        <div className="text-center mt-10">
          <a
            href="/gallery"
            className="inline-flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg text-sm sm:text-base transition"
          >
            View Full Gallery
          </a>
        </div>

      </div>
    </section>
  );
}
