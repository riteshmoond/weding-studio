import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    service: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your request has been sent!");
  };

  return (
    <div className="w-full min-h-screen bg-black text-white">

      {/* --------- MAIN SPLIT LAYOUT --------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* --------- LEFT SIDE FULL IMAGE --------- */}
        <div
          className="relative bg-cover bg-center bg-no-repeat h-96 lg:h-full"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1665960213508-48f07086d49c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3ZWRkaW5nJTIwY291cGxlfGVufDF8fHx8MTc2MzUyODQ3NHww&ixlib=rb-4.1.0&q=80&w=1080')",
          }}
        >
          <div className="h-full w-full bg-black/50"></div>
        </div>

        {/* --------- RIGHT SIDE FORM --------- */}
        <div className="flex items-center justify-center p-8 sm:p-14 bg-gradient-to-b from-black via-black/90 to-black">

          <div className="w-full max-w-lg backdrop-blur-xl bg-white/10 p-10 rounded-3xl border border-white/20 shadow-2xl">

            <h1 className="text-4xl font-bold text-center mb-6">
              Book Your <span className="text-pink-400">Wedding Shoot</span>
            </h1>

            <p className="text-center text-gray-300 mb-8">
              Fill your details & our team will contact you within 30 minutes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name */}
              <div>
                <label className="text-sm font-semibold text-gray-200">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-semibold text-gray-200">Phone</label>
                <input
                  type="number"
                  name="phone"
                  required
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Date */}
              <div>
                <label className="text-sm font-semibold text-gray-200">Wedding Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Service */}
              <div>
                <label className="text-sm font-semibold text-gray-200">Choose Service</label>
                <select
                  name="service"
                  required
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Select</option>
                  <option>Wedding Photography</option>
                  <option>Cinematic Videography</option>
                  <option>Pre-Wedding Shoot</option>
                  <option>Engagement Shoot</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-semibold text-gray-200">Message</label>
                <textarea
                  name="message"
                  rows="3"
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-pink-500"
                  placeholder="Tell us more..."
                ></textarea>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700  py-4 text-lg rounded-xl font-semibold transition shadow-lg"
              >
                Submit Inquiry →
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
