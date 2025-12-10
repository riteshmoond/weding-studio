import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  const testimonials = [
    {
      name: "Rohan & Priya",
      review:
        "Royal Wedding Studio truly captured the magic of our big day. The photos and videos are absolutely stunning!",
      img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Arjun & Meera",
      review:
        "The team was extremely professional and friendly. Our cinematic wedding film was beyond beautiful.",
      img: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Sahil & Neha",
      review:
        "Best photographers in Jaipur! Loved the pre-wedding shoot and album quality. Highly recommended.",
      img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Client <span className="text-pink-600">Testimonials</span>
          </h2>
          <p className="text-gray-600 mt-3">
            Hear from couples who trusted us with their special day.
          </p>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="min-w-[80%] sm:min-w-[45%] lg:min-w-[30%] bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition"
              >
                {/* Avatar */}
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-20 h-20 object-cover rounded-full shadow-md mb-4"
                />

                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-800">
                  {t.name}
                </h3>

                {/* Stars */}
                <div className="flex justify-center gap-1 my-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={18} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>

                {/* Review */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t.review}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
