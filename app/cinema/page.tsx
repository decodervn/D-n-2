"use client";
import { useEffect, useState } from "react";

export default function CinemaPage() {
  const [cinemas, setCinemas] = useState([
    { id: 1, name: "CGV Vincom Bà Triệu", location: "Hà Nội", status: "Active" },
    { id: 2, name: "Lotte Keangnam", location: "Hà Nội", status: "Active" },
    { id: 3, name: "BHD Bitexco", location: "TP.HCM", status: "Inactive" },
  ]);

  // Giữ chỗ cho kết nối API thật (sau này)
  useEffect(() => {
    // fetch("http://localhost:3001/cinemas")
    //   .then((res) => res.json())
    //   .then((data) => setCinemas(data));
  }, []);

  const handleCreate = () => alert("Create cinema (chưa kết nối API)");
  const handleEdit = (id: number) => alert(`Edit cinema ID ${id}`);
  const handleDelete = (id: number) => {
    if (confirm("Delete this cinema?")) {
      setCinemas(cinemas.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen text-gray-900 bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-green-100 p-5 space-y-4 border-r border-gray-300">
        <h2 className="text-xl font-bold mb-3">Admin Panel</h2>
        <nav className="space-y-2">
          <a href="/movies" className="block text-gray-700 hover:text-green-700">
            🎬 Movies
          </a>
          <a
            href="/cinema"
            className="block text-green-700 font-semibold bg-white shadow rounded p-2"
          >
            🏢 Cinema
          </a>
          <a href="/users" className="block text-gray-700 hover:text-green-700">
            👤 Users
          </a>
          <a href="/orders" className="block text-gray-700 hover:text-green-700">
            📄 Orders
          </a>
          <a href="/report" className="block text-gray-700 hover:text-green-700">
            📊 Reports
          </a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Cinema Management</h1>
          <button
            onClick={handleCreate}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            + Create Cinema
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-300 bg-white shadow-sm">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="border p-3 text-left">#</th>
              <th className="border p-3 text-left">Cinema Name</th>
              <th className="border p-3 text-left">Location</th>
              <th className="border p-3 text-left">Status</th>
              <th className="border p-3 text-center w-40">Action</th>
            </tr>
          </thead>
          <tbody>
            {cinemas.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="border p-3">{c.id}</td>
                <td className="border p-3">{c.name}</td>
                <td className="border p-3">{c.location}</td>
                <td
                  className={`border p-3 font-medium ${
                    c.status === "Active" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {c.status}
                </td>
                <td className="border p-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(c.id)}
                    className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
