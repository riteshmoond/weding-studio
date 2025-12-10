import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Mail,
  Settings,
  LogOut,
  Image,
  Package,
  X
} from "lucide-react";

export default function AdminSidebar({ closeSidebar = () => {} }) {
  const { pathname } = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    window.location.href = "/admin/login";
  };

  const isActive = (path) =>
    pathname === path
      ? "bg-gray-800 text-white"
      : "text-gray-300 hover:text-white";

  return (
    <aside className="w-64 bg-gray-900 text-white p-6 shadow-lg min-h-screen relative">

      {/* ❌ Mobile Close Button */}
      <button
        onClick={closeSidebar}
        className="absolute top-4 right-4 sm:hidden text-gray-300 hover:text-white"
        aria-label="Close sidebar"
      >
        <X size={26} />
      </button>

      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <nav className="space-y-3">

        <Link
          to="/admin/dashboard"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive(
            "/admin/dashboard"
          )}`}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/admin/bookings"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive(
            "/admin/bookings"
          )}`}
        >
          <Calendar size={20} />
          Bookings
        </Link>

        <Link
          to="/admin/messages"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive(
            "/admin/messages"
          )}`}
        >
          <Mail size={20} />
          Messages
        </Link>

        <Link
          to="/admin/settings"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive(
            "/admin/settings"
          )}`}
        >
          <Settings size={20} />
          Settings
        </Link>

        <Link
          to="/admin/gallery"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive(
            "/admin/gallery"
          )}`}
        >
          <Image size={20} />
          Gallery Control
        </Link>

        <Link
          to="/admin/packages"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive(
            "/admin/packages"
          )}`}
        >
          <Package size={20} />
          Packages Control
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-2 mt-8 bg-red-600 rounded-lg hover:bg-red-700 transition"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}

// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Calendar,
//   Mail,
//   Settings,
//   LogOut,
//   Image,
//   Package
// } from "lucide-react";

// export default function AdminSidebar() {
//   const { pathname } = useLocation();

//   const handleLogout = () => {
//     localStorage.removeItem("adminAuth");
//     window.location.href = "/admin/login";
//   };

//   // function to highlight active links
//   const isActive = (path) =>
//     pathname === path ? "bg-gray-800 text-white" : "text-gray-300";

//   return (
//     <aside className="w-64 bg-gray-900 text-white p-6 shadow-lg min-h-screen">
//       <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

//       <nav className="space-y-3">

//         <Link
//           to="/admin/dashboard"
//           className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition ${isActive(
//             "/admin/dashboard"
//           )}`}
//         >
//           <LayoutDashboard size={20} />
//           Dashboard
//         </Link>

//         <Link
//           to="/admin/bookings"
//           className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition ${isActive(
//             "/admin/bookings"
//           )}`}
//         >
//           <Calendar size={20} />
//           Bookings
//         </Link>

//         <Link
//           to="/admin/messages"
//           className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition ${isActive(
//             "/admin/messages"
//           )}`}
//         >
//           <Mail size={20} />
//           Messages
//         </Link>

//         <Link
//           to="/admin/settings"
//           className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition ${isActive(
//             "/admin/settings"
//           )}`}
//         >
//           <Settings size={20} />
//           Settings
//         </Link>

//         {/* Optional (if you want gallery & package control page) */}
//         <Link
//           to="/admin/gallery"
//           className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition`}
//         >
//           <Image size={20} />
//           Gallery Control
//         </Link>

//         <Link
//           to="/admin/packages"
//           className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition`}
//         >
//           <Package size={20} />
//           Packages Control
//         </Link>
//       </nav>

//       <button
//         onClick={handleLogout}
//         className="w-full flex items-center gap-3 px-4 py-2 mt-8 bg-red-600 rounded-lg hover:bg-red-700 transition"
//       >
//         <LogOut size={20} />
//         Logout
//       </button>
//     </aside>
//   );
// }
