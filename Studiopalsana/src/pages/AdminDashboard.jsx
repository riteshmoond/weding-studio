import { createElement, useEffect, useState } from "react";
import { CalendarCheck, CalendarClock, IndianRupee, Images } from "lucide-react";
import { api } from "../lib/api";
import { AdminShell } from "./AdminBookings";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalBookings: 0, pendingBookings: 0, completedEvents: 0, totalRevenue: 0 });
  useEffect(() => { api("/bookings/stats").then(setStats).catch(() => {}); }, []);
  const cards = [
    ["Total Bookings", stats.totalBookings, CalendarCheck, "text-blue-700 bg-blue-50"],
    ["Pending Bookings", stats.pendingBookings, CalendarClock, "text-amber-700 bg-amber-50"],
    ["Completed Events", stats.completedEvents, Images, "text-emerald-700 bg-emerald-50"],
    ["Total Revenue", `₹${Number(stats.totalRevenue).toLocaleString("en-IN")}`, IndianRupee, "text-[#b3264b] bg-rose-50"],
  ];
  return <AdminShell title="Dashboard Overview"><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([label,value,Icon,color]) => <article key={label} className="rounded-2xl bg-white p-6 shadow-sm"><span className={`inline-flex rounded-xl p-3 ${color}`}>{createElement(Icon)}</span><p className="mt-6 text-sm text-stone-500">{label}</p><strong className="mt-1 block font-serif text-3xl">{value}</strong></article>)}</div><div className="mt-8 rounded-2xl bg-[#211815] p-8 text-white"><p className="eyebrow">Studio Control</p><h2 className="mt-2 font-serif text-3xl">Everything important, in one place.</h2><p className="mt-3 max-w-2xl text-stone-400">Manage bookings, albums, packages, enquiries and customer reviews from the navigation panel.</p></div></AdminShell>;
}
