import { useEffect, useState } from "react";
import { getTeam, createTeamMember, updateTeamMember, deleteTeamMember } from "../lib/api";
import { AdminShell } from "./AdminBookings";

const empty = { name: "", role: "", photo: "", bio: "", order: 0 };

export default function AdminTeam() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      setItems(await getTeam());
    } catch {
      setItems([]);
    }
  };

  useEffect(() => { void load(); }, []);

  async function save(e) {
    e.preventDefault();
    if (editing) {
      await updateTeamMember(editing, form);
    } else {
      await createTeamMember(form);
    }
    setForm(empty); setEditing(null); load();
  }

  function edit(item) { setEditing(item._id); setForm({ ...item }); }
  async function remove(id) { if (!window.confirm("Delete this team member?")) return; await deleteTeamMember(id); load(); }

  return (
    <AdminShell title="Team Management">
      <form onSubmit={save} className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="form-grid">
          <label className="field-label">Name<input className="field-input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
          <label className="field-label">Role<input className="field-input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></label>
          <label className="field-label sm:col-span-2">Photo URL<input className="field-input" value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} /></label>
          <label className="field-label sm:col-span-2">Short bio<textarea className="field-input min-h-24" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></label>
        </div>
        <button className="btn-primary mt-4">{editing ? "Update Member" : "Add Member"}</button>
      </form>

      <div className="mt-7 grid gap-5 lg:grid-cols-3">
        {items.length ? items.map((it) => (
          <article key={it._id} className="rounded-2xl bg-white p-6">
            <div className="flex items-center gap-4">
              {it.photo ? <img src={it.photo} alt={it.name} className="h-16 w-16 rounded-full object-cover" /> : <div className="h-16 w-16 rounded-full bg-stone-200" />}
              <div>
                <h3 className="font-serif text-xl">{it.name}</h3>
                <p className="text-sm text-stone-500">{it.role}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-stone-600">{it.bio}</p>
            <div className="mt-5 flex gap-2"><button type="button" className="admin-action" onClick={() => edit(it)}>Edit</button><button type="button" className="admin-action text-red-700" onClick={() => remove(it._id)}>Delete</button></div>
          </article>
        )) : <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center text-stone-500 lg:col-span-3">No team members yet. Add one to showcase on the site.</div>}
      </div>
    </AdminShell>
  );
}
