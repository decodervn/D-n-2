"use client";
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import CinemaModel from "./CinemaModel";

type Cinema = {
  id: number;
  name: string;
  location: string;
  seats: number;
  status: string;
};

export default function CinemaPage() {
  const [cinemas, setCinemas] = useState<Cinema[]>([
    { id: 1, name: "CGV Vincom Bà Triệu", location: "Hà Nội", seats: 150, status: "Active" },
    { id: 2, name: "Lotte Keangnam", location: "Hà Nội", seats: 200, status: "Active" },
    { id: 3, name: "Beta Thái Hà", location: "Hà Nội", seats: 120, status: "Maintenance" },
  ]);

  const [modalType, setModalType] = useState<"create" | "edit" | null>(null);
  const [editingCinema, setEditingCinema] = useState<Cinema | null>(null);

  const handleSave = (c: any) => {
    if (modalType === "create") setCinemas(prev => [...prev, { id: prev.length + 1, ...c }]);
    if (modalType === "edit") setCinemas(prev => prev.map(x => (x.id === c.id ? c : x)));
  };

  const handleEdit = (c: Cinema) => {
    setEditingCinema(c);
    setModalType("edit");
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this cinema?")) setCinemas(cinemas.filter(c => c.id !== id));
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-emerald-300">🏢 Cinema Management</h1>
          <button
            onClick={() => setModalType("create")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all"
          >
            + Create Cinema
          </button>
        </header>

        {/* Table */}
        <div className="overflow-hidden rounded-xl shadow-lg bg-black/50 backdrop-blur-sm border border-emerald-600/40">
          <table className="w-full text-sm text-white/90">
            <thead className="bg-emerald-900/70 text-emerald-300 uppercase tracking-wide text-xs">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Seats</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {cinemas.map((c, idx) => (
                <tr key={c.id} className="border-t border-emerald-700/30 hover:bg-emerald-800/20 transition">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3">{c.location}</td>
                  <td className="px-4 py-3">{c.seats}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        c.status === "Active"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : c.status === "Maintenance"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-slate-500/20 text-slate-300"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="px-3 py-1 rounded-md bg-rose-600 hover:bg-rose-500 text-white font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalType && (
          <CinemaModel
            type={modalType}
            cinema={modalType === "edit" ? editingCinema : null}
            onClose={() => {
              setModalType(null);
              setEditingCinema(null);
            }}
            onSave={handleSave}
          />
        )}
      </div>
    </AdminLayout>
  );
}
