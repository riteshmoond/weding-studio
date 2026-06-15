const defaults = {
  name: "Royal Wedding Studio",
  tagline: "Turning Your Moments Into Memories",
  phone: "+91 98765 43210",
  email: "hello@royalweddingstudio.in",
  address: "Vaishali Nagar, Jaipur, Rajasthan",
  heroImage: "",
  instagram: "",
  facebook: "",
  youtube: "",
};

function readSettings() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("studioSettings")) || {};
  } catch {
    return {};
  }
}

export function writeSettings(settings) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("studioSettings", JSON.stringify(settings || {}));
  } catch {
    // ignore storage failures
  }
}

function digitsOnly(value) {
  return String(value || "").replace(/\D/g, "");
}

export const studio = {
  get name() {
    return readSettings().studioName || defaults.name;
  },
  get tagline() {
    return defaults.tagline;
  },
  get phone() {
    return readSettings().phone || defaults.phone;
  },
  get phoneLink() {
    const phone = digitsOnly(this.phone) || digitsOnly(defaults.phone);
    return `tel:+${phone}`;
  },
  get email() {
    return readSettings().email || defaults.email;
  },
  get address() {
    return readSettings().address || defaults.address;
  },
  get heroImage() {
    return readSettings().heroImage || defaults.heroImage;
  },
  get instagram() {
    return readSettings().instagram || defaults.instagram;
  },
  get facebook() {
    return readSettings().facebook || defaults.facebook;
  },
  get youtube() {
    return readSettings().youtube || defaults.youtube;
  },
  get whatsapp() {
    const phone = digitsOnly(this.phone) || digitsOnly(defaults.phone);
    return `https://wa.me/${phone}?text=Hello%20I%20want%20to%20book%20a%20wedding%20package`;
  },
  get directions() {
    const address = readSettings().address || defaults.address;
    return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
  },
};

export const defaultPackages = [
  {
    _id: "basic",
    title: "Basic",
    price: 25000,
    description: "Beautiful coverage for an intimate celebration.",
    features: [
      "1 Photographer",
      "1 Videographer",
      "100 Edited Photos",
      "Wedding Highlight Video",
    ],
  },
  {
    _id: "premium",
    title: "Premium",
    price: 50000,
    description: "Complete cinematic coverage for your wedding day.",
    featured: true,
    features: [
      "2 Photographers",
      "2 Videographers",
      "300 Edited Photos",
      "Cinematic Film",
      "Drone Coverage",
    ],
  },
  {
    _id: "luxury",
    title: "Luxury",
    price: 100000,
    priceSuffix: "+",
    description: "A full production team for grand celebrations.",
    features: [
      "Full Creative Team",
      "Drone Coverage",
      "LED Wall",
      "Live Streaming",
      "Wedding Film",
    ],
  },
];

import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";
import image5 from "../assets/5.jpg";
import image6 from "../assets/6.jpg";

export const galleryItems = [
  { src: image1, category: "Wedding", title: "Royal Vows" },
  { src: image2, category: "Bride", title: "Bridal Portraits" },
  { src: image3, category: "Pre-Wedding", title: "Before Forever" },
  { src: image4, category: "Haldi", title: "Sunlit Haldi" },
  { src: image5, category: "Couple", title: "Two Hearts" },
  { src: image6, category: "Reception", title: "Evening Elegance" },
];

export const projects = [
  {
    title: "Wedding of Rohan & Priya",
    location: "Jaipur",
    date: "12 Jan 2026",
    image: image1,
  },
  {
    title: "Wedding of Arjun & Meera",
    location: "Udaipur",
    date: "18 Feb 2026",
    image: image3,
  },
  {
    title: "Wedding of Kabir & Anaya",
    location: "Jodhpur",
    date: "04 Mar 2026",
    image: image5,
  },
];
