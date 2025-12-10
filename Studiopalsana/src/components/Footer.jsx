import React from "react";
import { Facebook, Instagram, Youtube, Phone, MapPin, Mail } from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {

  // Admin pages par footer hide
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  if (isAdminRoute) return null;

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-16 pb-10 mt-20 relative overflow-hidden">

      {/* Glass Effect Circles */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-pink-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-14 relative z-10">

        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Royal Wedding Studio
          </h2>

          <p className="mt-4 text-gray-300 leading-relaxed">
            Capturing your magical moments with cinematic excellence.  
            Based in Jaipur, Rajasthan — we create memories that last a lifetime.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            {[ 
              { icon: Facebook }, 
              { icon: Instagram }, 
              { icon: Youtube } 
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href="#"
                  className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-pink-600 transition group"
                >
                  <Icon size={22} className="group-hover:scale-125 transition" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-pink-400 mb-5">Quick Links</h3>
          <ul className="space-y-3">
            {[
              { name: "Home", link: "/" },
              { name: "Services", link: "/services" },
              { name: "Gallery", link: "/gallery" },
              { name: "Packages", link: "/packages" },
              { name: "Contact", link: "/contact" }
            ].map((item, idx) => (
              <li key={idx}>
                <NavLink
                  to={item.link}
                  className="text-gray-300 hover:text-pink-400 transition text-lg"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-pink-400 mb-5">Contact Us</h3>

          <div className="flex items-start gap-3 text-gray-300 mb-4">
            <Phone size={22} />
            <span>+91 98XX-XXXXX</span>
          </div>

          <div className="flex items-start gap-3 text-gray-300 mb-4">
            <Mail size={22} />
            <span>royalstudio@gmail.com</span>
          </div>

          <div className="flex items-start gap-3 text-gray-300">
            <MapPin size={22} />
            <span>Vaishali Nagar, Jaipur, Rajasthan</span>
          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="mt-16 border-t border-white/10 pt-6 text-center text-gray-400 text-sm relative z-10">
        © {new Date().getFullYear()} Royal Wedding Studio — All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;
