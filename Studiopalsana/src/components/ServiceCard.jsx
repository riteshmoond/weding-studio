import { Camera, Film, Heart } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: <Camera className="w-10 h-10 text-pink-500" />,
      title: "Wedding Photography",
      desc: "Candid, traditional & royal-style photography capturing the essence of your big day.",
    },
    {
      icon: <Film className="w-10 h-10 text-pink-500" />,
      title: "Cinematic Videography",
      desc: "4K cinematic wedding films, drone shots & emotional storytelling.",
    },
    {
      icon: <Heart className="w-10 h-10 text-pink-500" />,
      title: "Pre-Wedding Shoots",
      desc: "Romantic pre-wedding shoots at Jaipur’s premium royal locations.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Our <span className="text-pink-600">Services</span>
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            We provide premium photography & videography services for your unforgettable moments.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-2 transition duration-300 border border-pink-100"
            >
              <div className="flex justify-center mb-4">{service.icon}</div>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {service.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
