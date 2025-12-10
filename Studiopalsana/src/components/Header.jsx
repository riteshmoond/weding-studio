import React, { useState} from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(false);

  // Scroll track using ref (NO ERROR)
  // const lastScroll = useRef(0);

  // 🔥 Hide Navbar on Admin pages
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  if (isAdminRoute) return null;

  // 🔥 Hide navbar on scroll down, show on scroll up
  
  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Packages", path: "/packages" },
    { name: "Contact", path: "/contact" },
  ];
  
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const current = window.scrollY;

  //     if (current > lastScroll.current && current > 80) {
  //       setHide(true); // hide navbar
  //     } else {
  //       setHide(false); // show navbar
  //     }

  //     lastScroll.current = current;
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []); 
  return (
    <header
      className={`
        fixed left-0 w-full z-50 transition-all duration-300
        backdrop-blur-xl bg-white/70 shadow-md
        ${hide ? "-top-24" : "top-0"}
      `}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide text-pink-600">
          Royal Wedding Studio
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-lg font-medium transition ${
                  isActive
                    ? "text-pink-600 border-b-2 border-pink-600 pb-1"
                    : "text-gray-700 hover:text-pink-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden bg-white/90 backdrop-blur-xl shadow-md absolute w-full left-0 
          transition-all duration-300
          ${open ? "top-16 opacity-100" : "top-[-500px] opacity-0"}
        `}
      >
        <nav className="flex flex-col py-4">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-3 px-6 text-lg font-medium border-b transition ${
                  isActive ? "text-pink-600" : "text-gray-700 hover:bg-pink-50"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
