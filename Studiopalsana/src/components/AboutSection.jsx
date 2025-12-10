import React from "react";

export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Image */}
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"   // <- put image in public/about/
            alt="About Us"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 leading-snug">
            Creating <span className="text-pink-600">Royal Wedding Stories</span>
            <br /> With Heart & Art
          </h2>

          <p className="mt-4 text-gray-600 leading-relaxed">
            At Royal Wedding Studio, we capture emotions, candid smiles, and 
            magical wedding moments with cinematic perfection. Based in Jaipur, 
            we’ve worked with hundreds of couples to turn their beautiful day 
            into a timeless memory.
          </p>

          {/* Bullet Points */}
          <ul className="mt-6 space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-pink-600 rounded-full"></span>
              7+ Years of Wedding Photography Experience
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-pink-600 rounded-full"></span>
              Cinematic 4K Wedding Films & Drone Shoots
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-pink-600 rounded-full"></span>
              Premium Albums & Creative Pre-Wedding Shoots
            </li>
          </ul>

          {/* CTA Button */}
          <a
            href="/about"
            className="inline-block mt-8 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition"
          >
            Learn More About Us
          </a>
        </div>

      </div>
    </section>
  );
}
