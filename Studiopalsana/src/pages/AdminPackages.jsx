import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import { Menu } from "lucide-react";

export default function AdminPackages() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // -----------------------------
  // PACKAGE STATES
  // -----------------------------
  const [packages, setPackages] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    features: "",
  });

  // Load saved packages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("adminPackages");
    if (saved) setPackages(JSON.parse(saved));
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("adminPackages", JSON.stringify(data));
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Add or Update Package
  const handleSubmit = () => {
    if (!form.name || !form.price) {
      alert("Package Name & Price required");
      return;
    }

    const finalData = {
      ...form,
      features: form.features.split("\n"),
    };

    let updatedList;

    if (editingIndex !== null) {
      updatedList = packages.map((pkg, i) =>
        i === editingIndex ? finalData : pkg
      );
      setEditingIndex(null);
    } else {
      updatedList = [...packages, finalData];
    }

    setPackages(updatedList);
    saveToStorage(updatedList);

    setForm({
      name: "",
      price: "",
      description: "",
      features: "",
    });
  };

  // Delete Package
  const deletePackage = (index) => {
    const updated = packages.filter((_, i) => i !== index);
    setPackages(updated);
    saveToStorage(updated);
  };

  // Edit Package
  const editPackage = (index) => {
    const pkg = packages[index];
    setEditingIndex(index);

    setForm({
      name: pkg.name,
      price: pkg.price,
      description: pkg.description,
      features: pkg.features.join("\n"),
    });
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

      {/* MAIN AREA */}
      <main className="flex-1 sm:ml-64 overflow-y-auto max-h-screen">

        {/* MOBILE TOPBAR */}
        <div className="sm:hidden bg-white shadow p-4 flex items-center gap-3">
          <Menu size={28} onClick={() => setIsSidebarOpen(true)} />
          <h1 className="text-xl font-semibold">Packages</h1>
        </div>

        {/* DESKTOP TOPBAR */}
        <div className="hidden sm:block">
          <AdminTopbar />
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl font-bold mb-6">Packages Control</h1>

          {/* ADD / EDIT PACKAGE FORM */}
          <div className="bg-white p-6 rounded-xl shadow mb-10">
            <h2 className="text-xl font-semibold mb-4">
              {editingIndex !== null ? "Edit Package" : "Add New Package"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="font-semibold">Package Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold">Price (₹)</label>
                <input
                  type="text"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="font-semibold">Description</label>
              <textarea
                name="description"
                rows="3"
                value={form.description}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg"
              ></textarea>
            </div>

            <div className="mt-4">
              <label className="font-semibold">Features (1 per line)</label>
              <textarea
                name="features"
                rows="5"
                value={form.features}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg"
                placeholder="✔ 4K Film&#10;✔ Drone Shoot&#10;✔ 150 Edited Photos"
              ></textarea>
            </div>

            <button
              onClick={handleSubmit}
              className="mt-5 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800"
            >
              {editingIndex !== null ? "Update Package" : "Add Package"} →
            </button>
          </div>

          {/* PACKAGE LIST */}
          <h2 className="text-2xl font-bold mb-4">All Packages</h2>

          {packages.length === 0 ? (
            <p className="text-gray-600">No packages added yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-xl shadow-lg border"
                >
                  <h3 className="text-xl font-bold">{pkg.name}</h3>
                  <p className="text-pink-600 font-semibold text-lg">
                    ₹{pkg.price}
                  </p>

                  <p className="text-gray-700 mt-2">{pkg.description}</p>

                  <ul className="mt-3 space-y-2">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex gap-2 items-start text-gray-800">
                        <span className="text-pink-600">✔</span> {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      onClick={() => editPackage(index)}
                    >
                      Edit
                    </button>

                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      onClick={() => deletePackage(index)}
                    >
                      Delete
                    </button>
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </main>
    </div>
  );
}
