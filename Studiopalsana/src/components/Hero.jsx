import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat h-[99vh] flex items-center justify-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1665960213508-48f07086d49c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3ZWRkaW5nJTIwY291cGxlfGVufDF8fHx8MTc2MzUyODQ3NHww&ixlib=rb-4.1.0&q=80&w=1080')" }} // change image
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
          Capturing Your <span className="text-pink-400">Royal Moments</span>
        </h1>

        <p className="text-pink-100 mt-4 text-base sm:text-lg max-w-xl mx-auto">
          Crafting timeless wedding stories through cinematic photography & videography — 
          based in Jaipur, Rajasthan.
        </p>

        <div className="mt-6 flex gap-4 justify-center">
          <Link
            to="/gallery"
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg text-sm sm:text-base shadow-md transition"
          >
            View Gallery
          </Link>

          <Link
            to="/contact"
            className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 px-6 py-3 rounded-lg text-sm sm:text-base shadow-md transition"
          >
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
}
