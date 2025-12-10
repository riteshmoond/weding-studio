// import React from "react";

// export default function About() {
//   return (
//     <div className="bg-white text-gray-800">

//       {/* ----------------------- HERO ----------------------- */}
//       <section
//         className="relative bg-cover bg-center bg-no-repeat h-[99vh] flex items-center justify-center"
//         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1665960213508-48f07086d49c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg')" }} // <-- change image
//       >
//         <div className="absolute inset-0 bg-black/50" />

//         <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6">
//           <h1 className="text-4xl sm:text-5xl font-bold text-white">
//             About <span className="text-pink-400">Royal Wedding Studio</span>
//           </h1>
//           <p className="text-pink-100 mt-3 max-w-2xl">
//             Capturing love, emotions, and beautiful memories since 2016.
//           </p>
//         </div>
//       </section>

//       {/* ----------------------- ABOUT STORY ----------------------- */}
//       <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

//         <div className="rounded-2xl overflow-hidden shadow-xl">
//           <img
//             src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
//             alt="studio"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         <div>
//           <h2 className="text-4xl font-bold text-gray-800 leading-tight">
//             Our Story:  
//             <span className="text-pink-600"> Capturing Emotions Since 2022</span>
//           </h2>

//           <p className="text-gray-600 mt-4 leading-relaxed">
//             Royal Wedding Studio is based in Jaipur and specializes in luxury wedding
//             photography & cinematography. We believe every wedding tells a unique story,
//             and we are passionate about preserving yours beautifully.
//           </p>

//           <p className="text-gray-600 mt-4 leading-relaxed">
//             Our team has covered 350+ weddings across India, blending modern cinematic
//             techniques with royal aesthetics.
//           </p>

//           <p className="text-gray-600 mt-4 leading-relaxed">
//             We are dedicated to capturing the genuine emotions, candid moments, and
//             intricate details that make your wedding day truly special.
//           </p>

//           <p className="text-gray-600 mt-4 leading-relaxed">
//             At Royal Wedding Studio, we turn your wedding memories into timeless
//             cinematic stories that you will cherish forever.
//           </p>

//           <a
//             href="/contact"
//             className="inline-block mt-8 bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
//           >
//             Book Your Wedding Shoot →
//           </a>
//         </div>

//       </section>

//       {/* ----------------------- WHY CHOOSE US ----------------------- */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <h2 className="text-4xl font-bold mb-4">
//             Why <span className="text-pink-600">Choose Us?</span>
//           </h2>

//           <p className="text-gray-600 max-w-2xl mx-auto mb-12">
//             We deliver top-quality wedding films & photographs with creativity, passion, 
//             and perfection.
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

//             <div className="p-8 bg-white shadow rounded-2xl hover:shadow-xl transition">
//               <div className="text-5xl mb-3">🎥</div>
//               <h3 className="text-xl font-semibold mb-2">Cinematic Wedding Films</h3>
//               <p className="text-gray-600">
//                 4K storytelling films with drone shots & premium editing.
//               </p>
//             </div>

//             <div className="p-8 bg-white shadow rounded-2xl hover:shadow-xl transition">
//               <div className="text-5xl mb-3">📸</div>
//               <h3 className="text-xl font-semibold mb-2">Creative Photography</h3>
//               <p className="text-gray-600">
//                 Royal & candid photography capturing true emotions.
//               </p>
//             </div>

//             <div className="p-8 bg-white shadow rounded-2xl hover:shadow-xl transition">
//               <div className="text-5xl mb-3">🏆</div>
//               <h3 className="text-xl font-semibold mb-2">Experienced Team</h3>
//               <p className="text-gray-600">
//                 Over 350+ weddings covered with excellence.
//               </p>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* ----------------------- TEAM SECTION ----------------------- */}
//       <section className="py-20 max-w-7xl mx-auto px-6">
//         <h2 className="text-4xl font-bold text-center mb-10">
//           Meet Our <span className="text-pink-600">Team</span>
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">

//           <div className="shadow-lg p-6 rounded-2xl hover:shadow-xl transition">
//             <img
//               src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80"
//               className="w-28 h-28 object-cover rounded-full mx-auto mb-4"
//               alt="team"
//             />
//             <h3 className="text-lg font-semibold">Ritesh Verma</h3>
//             <p className="text-gray-600 text-sm">Lead Photographer</p>
//           </div>

//           <div className="shadow-lg p-6 rounded-2xl hover:shadow-xl transition">
//             <img
//               src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80"
//               className="w-28 h-28 object-cover rounded-full mx-auto mb-4"
//               alt="team"
//             />
//             <h3 className="text-lg font-semibold">Aman Singh</h3>
//             <p className="text-gray-600 text-sm">Cinematic Director</p>
//           </div>

//           <div className="shadow-lg p-6 rounded-2xl hover:shadow-xl transition">
//             <img
//               src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
//               className="w-28 h-28 object-cover rounded-full mx-auto mb-4"
//               alt="team"
//             />
//             <h3 className="text-lg font-semibold">Priya Sharma</h3>
//             <p className="text-gray-600 text-sm">Creative Editor</p>
//           </div>

//         </div>
//       </section>


//     </div>
//   );
// }



import React from "react";

export default function About() {
  return (
    <div className="bg-white text-gray-900">

      {/* ------------------------------------------------ HERO SECTION ------------------------------------------------ */}
      <section
        className="relative bg-cover bg-center bg-no-repeat h-[90vh] flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1665960213508-48f07086d49c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>

        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white drop-shadow-xl tracking-wide">
            Royal Wedding Studio
          </h1>

          <p className="mt-3 text-pink-200 max-w-2xl text-lg sm:text-xl">
            Luxury Wedding Photography & Cinematic Films Crafted With Perfection.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------ SIGNATURE QUOTE ------------------------------------------------ */}
      <section className="py-20 text-center max-w-4xl mx-auto px-6">
        <p className="text-2xl sm:text-3xl italic text-gray-700 font-light leading-relaxed">
          “We don’t just click pictures —  
          we craft <span className="text-pink-600 font-semibold">timeless stories</span> 
          through emotions, elegance, and artistry.”
        </p>
      </section>

      {/* ------------------------------------------------ ABOUT STORY ------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        <div className="rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
            alt="studio"
            className="w-full h-full object-cover hover:scale-105 transition duration-700"
          />
        </div>

        <div>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-gray-800">
            Crafting <span className="text-pink-600">Luxury Wedding Experiences</span> Since 2016
          </h2>

          <p className="mt-5 text-gray-600 leading-relaxed text-lg">
            Our signature style blends cinematic frames with timeless elegance.  
            From royal destination weddings to intimate celebrations —  
            we capture every moment with unmatched creativity and perfection.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 text-gray-700 font-medium">
            <div className="p-4 bg-pink-50 border-l-4 border-pink-500 rounded-lg shadow-sm">
              350+ Weddings Captured
            </div>
            <div className="p-4 bg-pink-50 border-l-4 border-pink-500 rounded-lg shadow-sm">
              Award-Winning Cinematic Films
            </div>
            <div className="p-4 bg-pink-50 border-l-4 border-pink-500 rounded-lg shadow-sm">
              Premium Photo Albums
            </div>
            <div className="p-4 bg-pink-50 border-l-4 border-pink-500 rounded-lg shadow-sm">
              Destination Wedding Experts
            </div>
          </div>

          <a
            href="/contact"
            className="inline-block mt-10 bg-pink-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-pink-700 shadow-lg transition"
          >
            Book Your Wedding Shoot →
          </a>
        </div>
      </section>

      {/* ------------------------------------------------ AWARDS SECTION ------------------------------------------------ */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold text-gray-800">
            Our <span className="text-pink-600">Achievements</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            We are proud to be recognized by leading wedding & photography platforms.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-14">
            <div className="p-8 bg-white rounded-2xl shadow-xl hover:scale-105 transition">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="font-semibold text-xl">Best Wedding Film Studio</h3>
              <p className="text-gray-600 mt-2">Jaipur 2023</p>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-xl hover:scale-105 transition">
              <div className="text-5xl mb-4">📸</div>
              <h3 className="font-semibold text-xl">Top 10 Photographers</h3>
              <p className="text-gray-600 mt-2">Rajasthan 2022</p>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-xl hover:scale-105 transition">
              <div className="text-5xl mb-4">🎥</div>
              <h3 className="font-semibold text-xl">Best Cinematic Wedding Film</h3>
              <p className="text-gray-600 mt-2">India 2021</p>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------ TEAM ------------------------------------------------ */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-14">
          Meet Our <span className="text-pink-600">Luxury Team</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">

          <div className="shadow-xl p-8 rounded-3xl hover:shadow-2xl transition bg-white">
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
              className="w-32 h-32 object-cover rounded-full mx-auto mb-5 border-4 border-pink-200"
            />
            <h3 className="text-xl font-semibold">Ritesh Verma</h3>
            <p className="text-gray-600">Lead Photographer</p>
          </div>

          <div className="shadow-xl p-8 rounded-3xl hover:shadow-2xl transition bg-white">
            <img
              src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80"
              className="w-32 h-32 object-cover rounded-full mx-auto mb-5 border-4 border-pink-200"
            />
            <h3 className="text-xl font-semibold">Aman Singh</h3>
            <p className="text-gray-600">Cinematic Director</p>
          </div>

          <div className="shadow-xl p-8 rounded-3xl hover:shadow-2xl transition bg-white">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
              className="w-32 h-32 object-cover rounded-full mx-auto mb-5 border-4 border-pink-200"
            />
            <h3 className="text-xl font-semibold">Priya Sharma</h3>
            <p className="text-gray-600">Creative Editor</p>
          </div>
        </div>
      </section>

    </div>
  );
}
