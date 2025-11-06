"use client";
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import ScreenModel from "./ScreenModel";

type Screen = {
  id: number;
  name: string;
  capacity: number;
  format: string;
  size_width_meters: number;
  size_height_meters: number;
};

export default function ScreensPage() {
  const [screens, setScreens] = useState<Screen[]>([
    { id: 1, name: "Screen 1", capacity: 120, format: "IMAX", size_width_meters: 20, size_height_meters: 10 },
    { id: 2, name: "Screen 2", capacity: 80, format: "3D", size_width_meters: 15, size_height_meters: 8 },
  ]);
  const [modalType, setModalType] = useState<"create" | "edit" | null>(null);
  const [editingScreen, setEditingScreen] = useState<Screen | null>(null);

  const handleSave = (s: any) => {
    if (modalType === "create") setScreens(prev => [...prev, { id: prev.length + 1, ...s }]);
    if (modalType === "edit") setScreens(prev => prev.map(x => (x.id === s.id ? s : x)));
  };

  const handleEdit = (s: Screen) => { setEditingScreen(s); setModalType("edit"); };
  const handleDelete = (id: number) => {
    if (confirm("Delete this screen?")) setScreens(screens.filter(s => s.id !== id));
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-emerald-300">🖥️ Screen Management</h1>
          <button
            onClick={() => setModalType("create")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all"
          >
            + Create Screen
          </button>
        </header>

        <div className="overflow-hidden rounded-xl shadow-lg bg-black/50 backdrop-blur-sm border border-emerald-600/40">
          <table className="w-full text-sm text-white/90">
            <thead className="bg-emerald-900/70 text-emerald-300 uppercase tracking-wide text-xs">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Capacity</th>
                <th className="px-4 py-3 text-left">Format</th>
                <th className="px-4 py-3 text-left">Width (m)</th>
                <th className="px-4 py-3 text-left">Height (m)</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {screens.map((s, idx) => (
                <tr key={s.id} className="border-t border-emerald-700/30 hover:bg-emerald-800/20 transition">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3">{s.capacity}</td>
                  <td className="px-4 py-3">{s.format}</td>
                  <td className="px-4 py-3">{s.size_width_meters}</td>
                  <td className="px-4 py-3">{s.size_height_meters}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(s)}
                      className="px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
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

        {modalType && (
          <ScreenModel
            type={modalType}
            screen={modalType === "edit" ? editingScreen : null}
            onClose={() => { setModalType(null); setEditingScreen(null); }}
            onSave={handleSave}
          />
        )}
      </div>
    </AdminLayout>
  );
}
