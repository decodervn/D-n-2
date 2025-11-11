// app/movie-admin/seats/page.tsx
"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import SeatModel from "./SeatModel";

// 1. Định nghĩa Type cho Seat (dựa trên database schema)
type Seat = {
  id: string; // VARCHAR(36) trong DB là string (UUID)
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

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const SEAT_API_URL = `${API_BASE}/seat`;

export default function SeatsPage() {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [modalType, setModalType] = useState<"create" | "edit" | null>(null);
  const [editingSeat, setEditingSeat] = useState<Seat | null>(null);

  // --- Load dữ liệu seat ---
  useEffect(() => {
    const loadSeats = async () => {
      try {
        const res = await fetch(SEAT_API_URL, { cache: "no-store" });

        if (!res.ok) {
          const text = await res.text();
          console.error(
            `Load seats failed: ${res.status} ${res.statusText} - ${text}`,
          );
          setSeats([]); // đảm bảo vẫn là mảng
          return;
        }

        const body = await res.json();

        // Hỗ trợ các kiểu response khác nhau: [], {data: []}, {items: []}
        let list: unknown = body;
        if (Array.isArray(body)) {
          list = body;
        } else if (Array.isArray(body?.data)) {
          list = body.data;
        } else if (Array.isArray(body?.items)) {
          list = body.items;
        }

        if (Array.isArray(list)) {
          setSeats(list as Seat[]);
        } else {
          console.error("Unexpected seats response shape:", body);
          setSeats([]);
        }
      } catch (err) {
        console.error("Failed to load seats:", err);
        setSeats([]);
      }
    };

    loadSeats();
  }, []);

  // --- Save seat (Create hoặc Edit) ---
  const handleSave = async (seatData: any) => {
    try {
      const payload = {
        ...seatData,
        col: Number(seatData.col),
        priceMultiplier: Number(seatData.priceMultiplier),
      };

      let res: Response | null = null;

      if (modalType === "create") {
        res = await fetch(SEAT_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else if (modalType === "edit" && editingSeat) {
        res = await fetch(`${SEAT_API_URL}/${editingSeat.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res) return;

      if (!res.ok) {
        const text = await res.text();
        throw new Error(
          `Save failed ${res.status} ${res.statusText}: ${text}`,
        );
      }

      const saved: Seat = await res.json();

      if (modalType === "create") {
        setSeats((prev) => [...prev, saved]);
      } else if (modalType === "edit" && editingSeat) {
        setSeats((prev) =>
          prev.map((s) => (s.id === editingSeat.id ? saved : s)),
        );
      }
    } catch (err) {
      console.error("Save failed:", err);
      alert("Lưu seat lỗi, kiểm tra log backend.");
    } finally {
      setModalType(null);
      setEditingSeat(null);
    }
  };

  // --- Delete seat ---
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this seat?")) return;
    try {
      const res = await fetch(`${SEAT_API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(
          `Delete failed ${res.status} ${res.statusText}: ${text}`,
        );
      }
      setSeats((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Xóa seat lỗi, kiểm tra log backend.");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
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

        <div className="overflow-hidden rounded-xl shadow-lg bg-black/50 backdrop-blur-sm border border-emerald-600/40">
          <table className="w-full text-sm text-white/90">
            <thead className="bg-emerald-900/70 text-emerald-300 uppercase tracking-wide text-xs">
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
                    <button
                      onClick={() => {
                        setEditingSeat(s);
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

              {seats.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-6 text-center text-slate-400"
                  >
                    No seats.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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
