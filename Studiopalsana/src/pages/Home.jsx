import Hero from '../components/Hero'
import ServiceCard from '../components/ServiceCard'
import GalleryGrid from '../components/GalleryGrid'
import React from 'react'
import AboutSection from '../components/AboutSection'
import TestimonialsSection from '../components/TestimonialCard'
import BookingForm from '../components/BookingForm'

export default function Home() {
  return (
    <div className="bg-white text-gray-800">
      {/* HERO */}
      <section className="mb-20">
        <Hero />
      </section>

      {/* SERVICES */}
      <section className="mb-24">
        <ServiceCard />
      </section>

      {/* GALLERY PREVIEW */}
      <section className="mb-24">
        <GalleryGrid/>
      </section>

      {/* ABOUT US */}
      <section className="mb-24">
        <AboutSection />
      </section>

      {/* TESTIMONIALS */}
      <section className="mb-24">
        <TestimonialsSection />
      </section>

      {/* BOOKING CTA */}
      <section className="mb-20">
        <BookingForm />
      </section>
    </div>
  );
}
