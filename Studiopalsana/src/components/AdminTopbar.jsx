import React, { useState } from "react";
import { Bell, User, LogOut, Settings } from "lucide-react";

export default function AdminTopbar() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    window.location.href = "/admin/login";
  };

  return (
    <div className="
      bg-white shadow-sm px-4 sm:px-6 py-3 
      flex justify-between items-center 
      sticky top-0 z-30
    ">

      {/* LEFT TITLE */}
      <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
        Admin Dashboard
      </h1>

      {/* RIGHT BUTTONS */}
      <div className="flex items-center gap-3 sm:gap-6 relative">

        {/* Notifications */}
        <button
          className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
          onClick={() => {
            setOpenNotify(!openNotify);
            setOpenProfile(false);
          }}
        >
          <Bell size={22} />
          <span
            className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"
          ></span>
        </button>

        {/* Notification Panel */}
        {openNotify && (
          <div className="absolute right-0 top-12 bg-white shadow-xl w-64 p-4 rounded-xl border animate-slide-down z-40">
            <h3 className="font-semibold text-gray-700">Notifications</h3>
            <p className="text-gray-500 text-sm mt-2">No new notifications</p>
          </div>
        )}

        {/* Profile Button */}
        <button
          className="flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
          onClick={() => {
            setOpenProfile(!openProfile);
            setOpenNotify(false);
          }}
        >
          <User size={24} />
          <span className="hidden sm:inline text-sm font-medium">Admin</span>
        </button>

        {/* Profile Dropdown */}
        {openProfile && (
          <div className="absolute right-0 top-12 bg-white shadow-xl w-48 p-3 rounded-xl border animate-slide-down z-40">
            <button className="flex items-center gap-3 p-2 w-full hover:bg-gray-100 rounded-lg">
              <Settings size={18} />
              Settings
            </button>

            <button
              className="flex items-center gap-3 p-2 w-full hover:bg-gray-100 rounded-lg text-red-600"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
