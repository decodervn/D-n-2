"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import ScreenModel from "./ScreenModel";

export type Screen = {
  id: number;
  name: string;
  capacity: number;
  format: string;
  size_width_meters: number | null;
  size_height_meters: number | null;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Nếu backend dùng `/screen` thì đổi lại chỗ này
const SCREEN_API_URL = `${API_BASE}/screens`;

export default function ScreensPage() {
  const [screens, setScreens] = useState<Screen[]>([]);
  const [modalType, setModalType] = useState<"create" | "edit" | null>(null);
  const [editingScreen, setEditingScreen] = useState<Screen | null>(null);

  // -------- LOAD LIST --------
  const loadScreens = async () => {
    try {
      const res = await fetch(SCREEN_API_URL, { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`GET ${SCREEN_API_URL} -> ${res.status}`);
      }
      const data: Screen[] = await res.json();
      setScreens(data);
    } catch (err) {
      console.error("Failed to load screens:", err);
      alert("Không tải được danh sách screen, kiểm tra log backend.");
    }
  };

  useEffect(() => {
    loadScreens();
  }, []);

  // -------- CREATE / UPDATE --------
  const handleSave = async (formData: Omit<Screen, "id">) => {
    try {
      const payload = {
        ...formData,
        capacity: Number(formData.capacity),
        size_width_meters:
          formData.size_width_meters != null
            ? Number(formData.size_width_meters)
            : null,
        size_height_meters:
          formData.size_height_meters != null
            ? Number(formData.size_height_meters)
            : null,
      };

      let res: Response;

      if (modalType === "create") {
        res = await fetch(SCREEN_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else if (modalType === "edit" && editingScreen) {
        res = await fetch(`${SCREEN_API_URL}/${editingScreen.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        return;
      }

      if (!res.ok) {
        const text = await res.text();
        throw new Error(
          `Save failed ${res.status} ${res.statusText}: ${text}`,
        );
      }

      const saved: Screen = await res.json();

      if (modalType === "create") {
        setScreens((prev) => [...prev, saved]);
      } else if (modalType === "edit" && editingScreen) {
        setScreens((prev) =>
          prev.map((s) => (s.id === editingScreen.id ? saved : s)),
        );
      }
    } catch (err) {
      console.error("Save screen failed:", err);
      alert("Lưu screen lỗi, xem log backend để biết chi tiết.");
    } finally {
      setModalType(null);
      setEditingScreen(null);
    }
  };

  // -------- DELETE --------
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this screen?")) return;

    try {
      const res = await fetch(`${SCREEN_API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(
          `DELETE failed ${res.status} ${res.statusText}: ${text}`,
        );
      }

      setScreens((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Delete screen failed:", err);
      alert("Xóa screen lỗi, xem log backend.");
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">
          Screen Management
        </h1>
        <button
          onClick={() => {
            setModalType("create");
            setEditingScreen(null);
          }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all"
        >
          + Create Screen
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-emerald-800/40 bg-slate-900/60">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-800/80 text-slate-200">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Capacity</th>
              <th className="px-4 py-3 text-left">Format</th>
              <th className="px-4 py-3 text-left">Width (m)</th>
              <th className="px-4 py-3 text-left">Height (m)</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-100">
            {screens.map((s, idx) => (
              <tr key={s.id}>
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.capacity}</td>
                <td className="px-4 py-2">{s.format}</td>
                <td className="px-4 py-2">{s.size_width_meters}</td>
                <td className="px-4 py-2">{s.size_height_meters}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => {
                      setEditingScreen(s);
                      setModalType("edit");
                    }}
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

            {screens.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-slate-400"
                >
                  No screens.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalType && (
        <ScreenModel
          type={modalType}
          screen={editingScreen ?? undefined}
          onClose={() => {
            setModalType(null);
            setEditingScreen(null);
          }}
          onSave={handleSave}
        />
      )}
    </AdminLayout>
  );
}
