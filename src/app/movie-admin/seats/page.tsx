// Giả sử file này là: app/movie-admin/seats/page.tsx
"use client";
import { useEffect, useState } from "react";
// Giả sử AdminLayout ở thư mục components
import AdminLayout from "../../components/AdminLayout"; 
// Giả sử SeatModel nằm cùng thư mục (giống như MovieModel)
import SeatModel from "./SeatModel"; 

// 1. Định nghĩa Type cho Seat (dựa trên database schema)
type Seat = {
  id: string; // VARCHAR(36) trong DB của bạn là string (UUID)
  screenId: string;
  row: string;
  col: number;
  label: string;
  type: string;
  status: string;
  isAisle: boolean;
  isWheelchair: boolean;
  priceMultiplier: number;
};

export default function SeatsPage() {
  // 2. Đổi State từ 'movies' sang 'seats'
  const [seats, setSeats] = useState<Seat[]>([]);
  const [modalType, setModalType] = useState<"create" | "edit" | null>(null);
  const [editingSeat, setEditingSeat] = useState<Seat | null>(null);

  // 3. Đổi API URL
  const apiURL = "http://localhost:3000/seats"; // backend NestJS

  // --- Load dữ liệu seat ---
  useEffect(() => {
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => setSeats(data))
      .catch((err) => console.error("Failed to load seats:", err));
  }, []);

  // --- Save seat (Create hoặc Edit) ---
  const handleSave = async (seatData: any) => {
    try {
      if (modalType === "create") {
        const res = await fetch(apiURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(seatData),
        });
        const newSeat = await res.json();
        setSeats((prev) => [...prev, newSeat]);
      }

      if (modalType === "edit" && editingSeat) {
        const res = await fetch(`${apiURL}/${editingSeat.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(seatData),
        });
        const updatedSeat = await res.json();
        setSeats((prev) =>
          prev.map((s) => (s.id === editingSeat.id ? updatedSeat : s))
        );
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setModalType(null);
      setEditingSeat(null);
    }
  };

  // --- Delete seat ---
  // 4. Thay đổi id từ 'number' sang 'string'
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this seat?")) return;
    try {
      await fetch(`${apiURL}/${id}`, { method: "DELETE" });
      setSeats((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* 5. Cập nhật Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-emerald-300">
            💺 Seat Management
          </h1>
          <button
            onClick={() => setModalType("create")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all"
          >
            + Create Seat
          </button>
        </header>

        {/* 6. Giữ nguyên Style Bảng */}
        <div className="overflow-hidden rounded-xl shadow-lg bg-black/50 backdrop-blur-sm border border-emerald-600/40">
          <table className="w-full text-sm text-white/90">
            <thead className="bg-emerald-900/70 text-emerald-300 uppercase tracking-wide text-xs">
              {/* 7. Cập nhật Cột Bảng */}
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Label</th>
                <th className="px-4 py-3 text-left">Screen ID</th>
                <th className="px-4 py-3 text-left">Row</th>
                <th className="px-4 py-3 text-left">Col</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {/* 8. Cập nhật map data */}
              {seats.map((s, idx) => (
                <tr
                  key={s.id}
                  className="border-t border-emerald-700/30 hover:bg-emerald-800/20 transition"
                >
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3 font-medium">{s.label}</td>
                  <td className="px-4 py-3">{s.screenId}</td>
                  <td className="px-4 py-3">{s.row}</td>
                  <td className="px-4 py-3">{s.col}</td>
                  <td className="px-4 py-3">{s.type}</td>
                  {/* Cột 'Poster' được thay bằng 'Status' với style */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        s.status === "ACTIVE"
                          ? "bg-green-600 text-green-100"
                          : "bg-yellow-600 text-yellow-100"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    {/* Cập nhật hàm Edit/Delete */}
                    <button
                      onClick={() => {
                        setEditingSeat(s);
// Cập nhật hàm Edit/Delete
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
            </tbody>
          </table>
        </div>

        {/* 9. Cập nhật Popup (Modal) */}
        {modalType && (
          <SeatModel
            type={modalType}
            seat={modalType === "edit" ? editingSeat : null}
            onClose={() => {
              setModalType(null);
              setEditingSeat(null);
            }}
            onSave={handleSave}
          />
        )}
      </div>
    </AdminLayout>
  );
}