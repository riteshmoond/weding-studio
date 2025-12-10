import React from "react";

export default function Services() {
  const services = [
    {
      title: "Wedding Photography",
      img: "https://images.unsplash.com/photo-1573676048035-9c2a72b6a12a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2VkZGluZyUyMFBob3RvZ3JhcGh5fGVufDB8fDB8fHww",
      desc: "Experience the royal elegance of wedding photography with cinematic lighting, royal frames & timeless storytelling.",
      points: [
        "Candid & Traditional Photography",
        "On-location Premium Shoots",
        "High-End Retouching",
        "Premium Wedding Albums",
      ],
    },
    {
      title: "Cinematic Videography",
      img: "https://images.unsplash.com/photo-1670411952195-fffeca152dd2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2luZW1hdGljJTIwVmlkZW9ncmFwaHl8ZW58MHx8MHx8fDA%3D",
      desc: "Experience 4K cinematic films with drone shots, slow-motion sequences & emotionally crafted wedding storytelling.",
      points: [
        "4K Cinematic Films",
        "Drone Aerial Shots",
        "Teaser + Full Wedding Movie",
        "Voiceover & Music Sync",
      ],
    },
    {
      title: "Pre-Wedding Shoot",
      img: "https://images.unsplash.com/photo-1721655426205-53214210577d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8UHJlLVdlZGRpbmclMjBTaG9vdHxlbnwwfHwwfHx8MA%3D%3D",
      desc: "Romantic, cinematic, and picture-perfect pre-wedding shoots at royal locations across Jaipur & Rajasthan.",
      points: [
        "Royal & Heritage Locations",
        "Drone + Cinematic Shots",
        "Creative Concept Planning",
        "Outfit & Pose Assistance",
      ],
    },

    {
      title: "Wedding Packages",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fFdlZGRpbmclMjBQYWNrYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
      desc: "All-inclusive wedding packages combining photography & videography for a seamless royal wedding experience.",
      points: [
        "Customizable Packages",
        "Photography + Videography",
        "Multiple Event Coverage",
        "Priority Editing & Delivery",
      ],
    },
  ];

  return (
    <div className="bg-white text-gray-800">

      {/* ------------------------------------------------ HERO ------------------------------------------------ */}
      <section
        className="relative bg-cover bg-center bg-no-repeat h-[90vh] flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1665960213508-48f07086d49c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/30" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-wide">
            Our <span className="text-pink-400">Premium Services</span>
          </h1>
          <p className="mt-3 max-w-2xl text-pink-100">
            Luxury wedding storytelling crafted with cinematic excellence.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------ MAIN SERVICES ------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          What We <span className="text-pink-600">Offer</span>
        </h2>

        <div className="space-y-20">
          {services.map((s, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={s.img}
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                  alt={s.title}
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-3xl font-bold text-gray-800">{s.title}</h3>

                <p className="text-gray-600 mt-4 text-lg">{s.desc}</p>

                <ul className="mt-6 space-y-3 text-gray-700">
                  {s.points.map((p, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 bg-pink-50 border-l-4 border-pink-500 p-3 rounded-lg shadow-sm"
                    >
                      <span className="w-3 h-3 bg-pink-600 rounded-full"></span>
                      {p}
                    </li>
                  ))}
                </ul>

                <a
                  href="/contact"
                  className="inline-block mt-8 bg-pink-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-pink-700 transition"
                >
                  Book This Service →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* ------------------------------------------------ CTA BLOCK ------------------------------------------------ */}
      <section className="py-20 bg-gradient-to-r from-pink-700 to-purple-700 text-white text-center">
        <h2 className="text-4xl font-bold">
          Ready to Capture Your <span className="text-yellow-300">Dream Wedding?</span>
        </h2>
        <p className="max-w-2xl mx-auto mt-4 text-pink-100">
          Secure your dates now and let us craft the magical story of your big day.
        </p>

        <a
          href="/contact"
          className="inline-block mt-10 bg-white text-pink-700 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-pink-50 transition "
        >
          Book Now →
        </a>
      </section>
    </div>
  );
}
