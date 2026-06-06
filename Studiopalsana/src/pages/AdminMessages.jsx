import { useEffect, useState } from "react";
import { api } from "../lib/api";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import { Menu } from "lucide-react";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Loading messages...");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const load = async () => {
    try {
      setStatus("Loading messages...");
      const data = await api("/messages");
      setMessages(data);
      setStatus("");
    } catch (error) {
      setMessages([]);
      setStatus(error.message);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const filtered = messages.filter((m) => {
    const s = search.toLowerCase();
    return (
      String(m.name || "").toLowerCase().includes(s) ||
      String(m.email || "").toLowerCase().includes(s) ||
      String(m.phone || "").includes(search)
    );
  });

  async function removeMessage(id) {
    await api(`/messages/${id}`, { method: "DELETE" });
    setMessages((items) => items.filter((item) => item._id !== id));
    setModalData((current) => (current?._id === id ? null : current));
  }

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
          {status && <p className="mb-4 rounded-xl bg-white p-4 shadow-sm">{status}</p>}

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
                {filtered.length ? filtered.map((m) => (
                  <tr key={m._id || m.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{m.name}</td>
                    <td className="p-4">{m.phone}</td>
                    <td className="p-4">{m.email}</td>
                    <td className="p-4">{m.createdAt ? new Date(m.createdAt).toLocaleDateString("en-IN") : m.date}</td>

                    <td className="p-4">
                      <div className="flex flex-col sm:flex-row gap-2">

                        <button
                          type="button"
                          className="bg-blue-600 text-white px-3 py-1 rounded-md"
                          onClick={() => setModalData(m)}
                        >
                          View
                        </button>

                        <button
                          type="button"
                          className="bg-red-600 text-white px-3 py-1 rounded-md"
                          onClick={() => removeMessage(m._id || m.id)}
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                )) : !status ? (
                  <tr>
                    <td className="p-6 text-center text-gray-500" colSpan="5">
                      No messages yet.
                    </td>
                  </tr>
                ) : null}
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
              <p><b>Date:</b> {modalData.createdAt ? new Date(modalData.createdAt).toLocaleString("en-IN") : modalData.date}</p>

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
