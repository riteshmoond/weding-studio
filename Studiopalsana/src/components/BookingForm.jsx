import React from "react";
import { CalendarHeart } from "lucide-react";

export default function BookingCTA() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">

        <div className="bg-gradient-to-r from-pink-700 to-purple-700 text-white rounded-3xl p-10 md:p-16 shadow-lg text-center">

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <CalendarHeart className="w-14 h-14 text-white opacity-90" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
            Book Your <span className="text-yellow-300">Dream Wedding Shoot</span> Today
          </h2>

          {/* Description */}
          <p className="mt-4 text-pink-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Limited dates available! Reserve your special day and let us capture your unforgettable 
            wedding memories with timeless cinematic visuals.
          </p>

          {/* CTA Button */}
          <div className="mt-8">
            <a
              href="/contact"
              className="inline-block bg-white text-pink-700 font-semibold px-8 py-3 rounded-lg text-lg shadow-md hover:bg-pink-50 hover:shadow-lg transition"
            >
              Book Now →
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
