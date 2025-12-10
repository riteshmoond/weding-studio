import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import { Menu } from "lucide-react";

export default function AdminMessages() {
  const initialMessages = [
    {
      id: 1,
      name: "Rohan Sharma",
      email: "rohan@gmail.com",
      phone: "9876543210",
      message: "We want to book a wedding package. Please contact.",
      date: "2025-01-10",
    },
    {
      id: 2,
      name: "Priya Verma",
      email: "priya@gmail.com",
      phone: "9876501111",
      message: "Need pricing details for pre-wedding shoot.",
      date: "2025-01-15",
    },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [modalData, setModalData] = useState(null);
  const [search, setSearch] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filtered = messages.filter((m) => {
    const s = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(s) ||
      m.email.toLowerCase().includes(s) ||
      m.phone.includes(search)
    );
  });

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* DESKTOP SIDEBAR */}
      <div className="hidden sm:block fixed inset-y-0 left-0 w-64 z-50">
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
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform sm:hidden 
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
          <h1 className="ml-3 text-xl font-semibold">Messages</h1>
        </div>

        <AdminTopbar />

        <div className="p-4 sm:p-6 lg:p-8">

          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Messages</h1>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search messages..."
            className="px-4 py-2 border rounded-lg mb-6 w-full sm:w-1/2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
            <table className="min-w-[750px] w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Phone</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((m) => (
                  <tr key={m.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{m.name}</td>
                    <td className="p-4">{m.phone}</td>
                    <td className="p-4">{m.email}</td>
                    <td className="p-4">{m.date}</td>

                    <td className="p-4">
                      <div className="flex flex-col sm:flex-row gap-2">

                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded-md"
                          onClick={() => setModalData(m)}
                        >
                          View
                        </button>

                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded-md"
                          onClick={() =>
                            setMessages(messages.filter((x) => x.id !== m.id))
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
              <h2 className="text-2xl font-semibold mb-4">Message Details</h2>

              <p><b>Name:</b> {modalData.name}</p>
              <p><b>Email:</b> {modalData.email}</p>
              <p><b>Phone:</b> {modalData.phone}</p>
              <p><b>Date:</b> {modalData.date}</p>

              <p className="mt-4"><b>Message:</b></p>
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
