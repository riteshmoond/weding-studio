import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import { Menu } from "lucide-react";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>

        <AdminTopbar />

        <div className="p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h3 className="text-lg font-semibold">Total Bookings</h3>
              <p className="text-3xl font-bold mt-2 text-pink-600">124</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h3 className="text-lg font-semibold">Pending Requests</h3>
              <p className="text-3xl font-bold mt-2 text-yellow-600">14</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h3 className="text-lg font-semibold">Messages Received</h3>
              <p className="text-3xl font-bold mt-2 text-blue-600">32</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h3 className="text-lg font-semibold">Confirmed Bookings</h3>
              <p className="text-3xl font-bold mt-2 text-green-600">56</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h3 className="text-lg font-semibold">Completed Projects</h3>
              <p className="text-3xl font-bold mt-2 text-gray-800">89</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h3 className="text-lg font-semibold">New Messages Today</h3>
              <p className="text-3xl font-bold mt-2 text-purple-600">6</p>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
