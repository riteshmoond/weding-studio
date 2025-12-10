import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import { Menu } from "lucide-react";

export default function AdminSettings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // SETTINGS STATE
  const [settings, setSettings] = useState({
    studioName: "",
    email: "",
    phone: "",
    address: "",
    heroImage: "",
    instagram: "",
    facebook: "",
    youtube: "",
  });

  // LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const saved = localStorage.getItem("studioSettings");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const handleChange = (e) =>
    setSettings({ ...settings, [e.target.name]: e.target.value });

  const saveSettings = () => {
    localStorage.setItem("studioSettings", JSON.stringify(settings));
    alert("Settings saved successfully!");
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* DESKTOP SIDEBAR */}
      <div className="hidden sm:block fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50">
        <AdminSidebar />
      </div>

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform sm:hidden
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform`}
      >
        <AdminSidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 sm:ml-64 overflow-y-auto max-h-screen">

        {/* MOBILE TOPBAR */}
        <div className="sm:hidden bg-white shadow p-4 flex items-center gap-3">
          <Menu size={28} onClick={() => setIsSidebarOpen(true)} />
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>

        {/* DESKTOP TOPBAR */}
        <div className="hidden sm:block">
          <AdminTopbar />
        </div>

        {/* PAGE CONTENT */}
        <div className="p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>

          {/* SETTINGS CARD */}
          <div className="bg-white p-6 rounded-xl shadow">

            {/* STUDIO INFO */}
            <h2 className="text-xl font-semibold mb-4">Studio Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="font-semibold">Studio Name</label>
                <input
                  type="text"
                  name="studioName"
                  value={settings.studioName}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold">Email</label>
                <input
                  type="text"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold">Address</label>
                <input
                  type="text"
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg"
                />
              </div>
            </div>

            {/* HERO BANNER URL */}
            <h2 className="text-xl font-semibold mt-8 mb-4">Hero Section</h2>

            <div>
              <label className="font-semibold">Hero Image URL</label>
              <input
                type="text"
                name="heroImage"
                value={settings.heroImage}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg"
              />
            </div>

            {/* SOCIAL LINKS */}
            <h2 className="text-xl font-semibold mt-8 mb-4">Social Media Links</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              <div>
                <label className="font-semibold">Instagram</label>
                <input
                  type="text"
                  name="instagram"
                  value={settings.instagram}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold">Facebook</label>
                <input
                  type="text"
                  name="facebook"
                  value={settings.facebook}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold">YouTube</label>
                <input
                  type="text"
                  name="youtube"
                  value={settings.youtube}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg"
                />
              </div>
            </div>

            {/* SAVE BUTTON */}
            <div className="mt-10">
              <button
                onClick={saveSettings}
                className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 w-full sm:w-auto"
              >
                Save Settings ✔
              </button>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
