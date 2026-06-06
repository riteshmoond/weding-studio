import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { deleteBooking, getBookings, updateBooking } from "../lib/api";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("Loading bookings...");

  function load() {
    getBookings().then((data) => { setBookings(data); setMessage(""); }).catch((error) => setMessage(error.message));
  }
  useEffect(load, []);

  async function changeStatus(id, status) {
    try {
      const updated = await updateBooking(id, { status });
      setBookings((items) => items.map((item) => item._id === id ? updated : item));
    } catch (error) { setMessage(error.message); }
  }

  async function remove(id) {
    if (!window.confirm("Delete this booking permanently?")) return;
    await deleteBooking(id);
    setBookings((items) => items.filter((item) => item._id !== id));
  }

  const filtered = bookings.filter((booking) => {
    const haystack = `${booking.name} ${booking.phone} ${booking.eventType} ${booking.packageName}`.toLowerCase();
    return haystack.includes(search.toLowerCase()) && (filter === "All" || booking.status === filter);
  });

  return (
    <AdminShell title="Booking Management">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input className="field-input mt-0 flex-1" placeholder="Search client, event or package" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="field-input mt-0 sm:w-48" value={filter} onChange={(e) => setFilter(e.target.value)}>{["All","Pending","Approved","Rejected","Completed"].map((item) => <option key={item}>{item}</option>)}</select>
      </div>
      {message && <p className="mb-5 rounded-xl bg-white p-4">{message}</p>}
      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="min-w-[900px] w-full text-left text-sm">
          <thead className="bg-stone-900 text-white"><tr>{["Client","Event","Date","Package","Status","Actions"].map((h) => <th key={h} className="p-4">{h}</th>)}</tr></thead>
          <tbody>{filtered.map((b) => <tr key={b._id} className="border-b border-stone-100">
            <td className="p-4"><strong>{b.name}</strong><small className="block text-stone-500">{b.phone}</small></td>
            <td className="p-4">{b.eventType}</td><td className="p-4">{b.eventDate ? new Date(b.eventDate).toLocaleDateString("en-IN") : "-"}</td>
            <td className="p-4">{b.packageName}</td><td className="p-4"><Status value={b.status} /></td>
            <td className="p-4"><div className="flex gap-2"><button className="admin-action" onClick={() => setSelected(b)}>View</button><button className="admin-action text-emerald-700" onClick={() => changeStatus(b._id, "Approved")}>Approve</button><button className="admin-action text-amber-700" onClick={() => changeStatus(b._id, "Rejected")}>Reject</button><button className="admin-action text-red-700" onClick={() => remove(b._id)}>Delete</button></div></td>
          </tr>)}</tbody>
        </table>
      </div>
      {selected && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5"><div className="max-h-[85vh] w-full max-w-xl overflow-auto rounded-2xl bg-white p-7"><h2 className="font-serif text-3xl">Booking Details</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{Object.entries(selected).filter(([key]) => !key.startsWith("_") && !["__v"].includes(key)).map(([key,value]) => <div key={key}><small className="uppercase tracking-wider text-stone-400">{key}</small><p className="font-semibold">{Array.isArray(value) ? value.join(", ") : String(value || "-")}</p></div>)}</div><button className="btn-secondary mt-7 w-full justify-center" onClick={() => setSelected(null)}>Close</button></div></div>}
    </AdminShell>
  );
}

export function AdminShell({ title, children }) {
  return <div className="min-h-screen bg-stone-100"><div className="fixed inset-y-0 left-0 hidden w-64 md:block"><AdminSidebar /></div><main className="p-5 md:ml-64 md:p-8"><div className="mb-7 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-[#b3264b]">Royal Wedding Studio</p><h1 className="mt-1 font-serif text-3xl">{title}</h1></div></div>{children}</main></div>;
}

function Status({ value = "Pending" }) {
  const colors = { Pending: "bg-amber-100 text-amber-800", Approved: "bg-emerald-100 text-emerald-800", Rejected: "bg-red-100 text-red-800", Completed: "bg-blue-100 text-blue-800" };
  return <span className={`rounded-full px-3 py-1 text-xs font-bold ${colors[value] || colors.Pending}`}>{value}</span>;
}

