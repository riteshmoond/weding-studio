import React from "react";

export default function Packages() {
  const plans = [
    {
      name: "Gold Package",
      price: "₹49,999",
      desc: "Perfect for small weddings & engagement ceremonies.",
      features: [
        "Candid + Traditional Photography",
        "1 Professional Photographer",
        "Full-Event Coverage",
        "Basic Cinematic Teaser",
        "50 Edited Photos",
      ],
      color: "from-pink-500 to-rose-600",
    },
    {
      name: "Platinum Package",
      price: "₹99,999",
      desc: "Our most popular package for full wedding coverage.",
      features: [
        "Candid + Traditional Photography",
        "Cinematic Videography (4K)",
        "Drone Aerial Shots",
        "2 Photographers + 1 Cinematographer",
        "150 Edited Photos",
        "3–5 Min Cinematic Teaser",
        "Full Wedding Film",
      ],
      color: "from-purple-600 to-pink-600",
      highlight: true,
    },
    {
      name: "Royal Diamond Package",
      price: "₹1,49,999",
      desc: "Premium royal package for destination & grand weddings.",
      features: [
        "Full Wedding + Pre-Wedding",
        "Luxury Cinematic Film (4K)",
        "Drone + Gimbal + Multi-cam Setup",
        "Creative Couple Shoot",
        "300 Edited Photos",
        "Premium Album (50 Pages)",
        "Same-Day Wedding Teaser",
        "Dedicated 6 Member Team",
      ],
      color: "from-yellow-500 to-orange-600",
    },
  ];

  return (
    <div className="bg-white text-gray-900">

      {/* --------------------------- HERO --------------------------- */}
      <section
        className="relative bg-cover bg-center bg-no-repeat h-[90vh] flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1665960213508-48f07086d49c?')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-4xl sm:text-6xl font-bold text-white">
            Our <span className="text-pink-400">Packages</span>
          </h1>
          <p className="mt-3 text-pink-200 max-w-2xl">
            Choose from our premium wedding photography & cinematography packages.
          </p>
        </div>
      </section>

      {/* --------------------------- PLAN CARDS --------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-3xl shadow-xl p-8 border hover:scale-105 transition bg-white relative ${
                plan.highlight ? "ring-4 ring-pink-500" : ""
              }`}
            >
              {/* Badge */}
              {plan.highlight && (
                <div className="absolute top-4 right-4 bg-pink-600 text-white text-xs px-3 py-1 rounded-full shadow">
                  Most Popular
                </div>
              )}

              {/* Title */}
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {plan.name}
              </h3>

              {/* Price */}
              <p className="text-4xl font-extrabold text-pink-600 mb-3">
                {plan.price}
              </p>

              <p className="text-gray-600 mb-6">{plan.desc}</p>

              {/* Features */}
              <ul className="space-y-3 text-gray-700">
                {plan.features.map((f, idx) => (
                  <li
                    key={idx}
                    className="flex gap-2 items-center bg-gray-50 p-3 rounded-xl shadow-sm"
                  >
                    <span className="w-3 h-3 bg-pink-600 rounded-full"></span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <a
                href="/contact"
                className={`block text-center mt-8 text-white font-semibold py-3 rounded-xl bg-gradient-to-r ${plan.color} hover:opacity-90`}
              >
                Book Now →
              </a>
            </div>
          ))}

        </div>
      </section>

      {/* --------------------------- CTA --------------------------- */}
      <section className="py-20 bg-gradient-to-r from-pink-700 to-purple-700 text-center text-white">
        <h2 className="text-4xl font-bold">
          Want a Custom Wedding Package?
        </h2>
        <p className="mt-3 text-pink-200 max-w-2xl mx-auto">
          Every wedding is unique — tell us your requirements and we’ll create a plan specially for you.
        </p>

        <a
          href="/contact"
          className="inline-block mt-8 bg-white text-pink-700 font-semibold px-10 py-4 rounded-lg text-lg hover:bg-pink-50"
        >
          Get Custom Quote →
        </a>
      </section>
    </div>
  );
}
