"use client";
import { useState, useRef } from "react";

interface CinemaModalProps {
  type: "create" | "edit";
  cinema?: any;
  onClose: () => void;
  onSave: (cinema: any) => void;
}

export default function CinemaModel({ type, cinema, onClose, onSave }: CinemaModalProps) {
  const [data, setData] = useState(
    cinema || {
      name: "",
      location: "",
      seats: 0,
      status: "Active",
    }
  );

  const modalRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ offsetX: 0, offsetY: 0 });

  const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current) return;
    drag.current.offsetX = e.clientX - modalRef.current.offsetLeft;
    drag.current.offsetY = e.clientY - modalRef.current.offsetTop;
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
  };

  const onDrag = (e: MouseEvent) => {
    if (!modalRef.current) return;
    modalRef.current.style.left = `${e.clientX - drag.current.offsetX}px`;
    modalRef.current.style.top = `${e.clientY - drag.current.offsetY}px`;
  };

  const stopDrag = () => {
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/70 backdrop-blur-sm z-50">
      <div
        ref={modalRef}
        className="absolute bg-gradient-to-br from-emerald-950 via-black to-emerald-900 border border-emerald-700 shadow-2xl rounded-xl w-[460px] text-white p-6 cursor-grab"
        style={{ top: "20%", left: "35%" }}
      >
        {/* Header */}
        <div
          onMouseDown={startDrag}
          className="flex justify-between items-center mb-4 bg-emerald-800/50 px-3 py-2 rounded-md cursor-move select-none"
        >
          <h2 className="text-lg font-semibold text-emerald-300 tracking-wide">
            {type === "create" ? "➕ Create Cinema" : "✏️ Edit Cinema"}
          </h2>
          <button
            onClick={onClose}
            className="text-emerald-300 hover:text-white text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm text-emerald-200 mb-1">Cinema Name</label>
            <input
              type="text"
              required
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full rounded-md border border-emerald-700 bg-emerald-900/50 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm text-emerald-200 mb-1">Location</label>
            <input
              type="text"
              required
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
              className="w-full rounded-md border border-emerald-700 bg-emerald-900/50 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm text-emerald-200 mb-1">Seats</label>
            <input
              type="number"
              min={1}
              required
              value={data.seats}
              onChange={(e) => setData({ ...data, seats: Number(e.target.value) })}
              className="w-full rounded-md border border-emerald-700 bg-emerald-900/50 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm text-emerald-200 mb-1">Status</label>
            <select
              value={data.status}
              onChange={(e) => setData({ ...data, status: e.target.value })}
              className="w-full rounded-md border border-emerald-700 bg-emerald-900/50 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option>Active</option>
              <option>Maintenance</option>
              <option>Closed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-emerald-700/40 hover:bg-emerald-700 text-emerald-200 rounded-md border border-emerald-600 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-md shadow-md transition-all"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
