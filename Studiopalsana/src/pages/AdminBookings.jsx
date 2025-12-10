import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import { Menu } from "lucide-react";

export default function AdminBookings() {
  const initialBookings = [
    {
      id: 1,
      name: "Rohan Sharma",
      phone: "9876543210",
      service: "Wedding Photography",
      date: "2025-02-12",
      status: "Pending",
      message: "We want full wedding coverage.",
    },
    {
      id: 2,
      name: "Aman Verma",
      phone: "9876501234",
      service: "Pre-Wedding Shoot",
      date: "2025-03-20",
      status: "Confirmed",
      message: "Outdoor shoot at Jaipur location.",
    },
  ];

  const [bookings, setBookings] = useState(initialBookings);
  const [modalData, setModalData] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filtered = bookings.filter((b) => {
    const s = search.toLowerCase();
    return (
      b.name.toLowerCase().includes(s) ||
      b.phone.includes(search) ||
      b.service.toLowerCase().includes(s)
    );
  });

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* DESKTOP SIDEBAR */}
      <div className="hidden sm:block fixed inset-y-0 left-0 z-50">
        <AdminSidebar />
      </div>

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
        ></div>
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-y-0 left-0 w-64 z-50 transform sm:hidden 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform`}
      >
        <AdminSidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* MAIN AREA WITH SCROLL */}
      <main className="flex-1 sm:ml-64 overflow-y-auto max-h-screen">

        {/* MOBILE TOPBAR */}
        <div className="sm:hidden flex items-center bg-white p-4 shadow">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu size={28} />
          </button>
          <h1 className="ml-3 text-xl font-semibold">Bookings</h1>
        </div>

        <AdminTopbar />

        <div className="p-4 sm:p-6 lg:p-8">

          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Bookings</h1>

          {/* SEARCH + FILTER */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search bookings..."
              className="px-4 py-2 border rounded-lg w-full sm:w-1/2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="px-4 py-2 border rounded-lg w-full sm:w-40"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>All</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Completed</option>
            </select>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
            <table className="min-w-[750px] w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4">Name</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{b.name}</td>
                    <td className="p-4">{b.phone}</td>
                    <td className="p-4">{b.service}</td>
                    <td className="p-4">{b.date}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-md text-sm 
                        ${
                          b.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : b.status === "Confirmed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-col sm:flex-row gap-2">

                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded-md"
                          onClick={() => setModalData(b)}
                        >
                          View
                        </button>

                        <button
                          className="bg-green-600 text-white px-3 py-1 rounded-md"
                          onClick={() => {
                            const updated = bookings.map((x) =>
                              x.id === b.id ? { ...x, status: "Completed" } : x
                            );
                            setBookings(updated);
                          }}
                        >
                          Done
                        </button>

                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded-md"
                          onClick={() =>
                            setBookings(bookings.filter((x) => x.id !== b.id))
                          }
                        >
                          Delete
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        {/* MODAL */}
        {modalData && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full">
              <h2 className="text-2xl font-semibold mb-4">Booking Details</h2>

              <p><b>Name:</b> {modalData.name}</p>
              <p><b>Phone:</b> {modalData.phone}</p>
              <p><b>Service:</b> {modalData.service}</p>
              <p><b>Date:</b> {modalData.date}</p>
              <p><b>Status:</b> {modalData.status}</p>

              <p className="mt-3"><b>Message:</b></p>
              <p className="text-gray-700">{modalData.message}</p>

              <button
                className="mt-6 bg-black text-white px-6 py-3 rounded-lg w-full"
                onClick={() => setModalData(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
