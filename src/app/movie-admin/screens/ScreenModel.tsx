"use client";
import { useState, useRef } from "react";

interface ScreenModalProps {
  type: "create" | "edit";
  screen?: any;
  onClose: () => void;
  onSave: (screen: any) => void;
}

export default function ScreenModel({ type, screen, onClose, onSave }: ScreenModalProps) {
  const [data, setData] = useState(
    screen || {
      name: "",
      capacity: 0,
      format: "",
      size_width_meters: 0,
      size_height_meters: 0,
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
        <div
          onMouseDown={startDrag}
          className="flex justify-between items-center mb-4 bg-emerald-800/50 px-3 py-2 rounded-md cursor-move select-none"
        >
          <h2 className="text-lg font-semibold text-emerald-300 tracking-wide">
            {type === "create" ? "➕ Create Screen" : "✏️ Edit Screen"}
          </h2>
          <button
            onClick={onClose}
            className="text-emerald-300 hover:text-white text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm text-emerald-200 mb-1">Name</label>
            <input
              type="text"
              required
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full rounded-md border border-emerald-700 bg-emerald-900/50 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm text-emerald-200 mb-1">Capacity</label>
            <input
              type="number"
              required
              min={1}
              value={data.capacity}
              onChange={(e) => setData({ ...data, capacity: Number(e.target.value) })}
              className="w-full rounded-md border border-emerald-700 bg-emerald-900/50 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm text-emerald-200 mb-1">Format</label>
            <input
              type="text"
              required
              value={data.format}
              onChange={(e) => setData({ ...data, format: e.target.value })}
              className="w-full rounded-md border border-emerald-700 bg-emerald-900/50 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-emerald-200 mb-1">Width (m)</label>
              <input
                type="number"
                step="0.1"
                value={data.size_width_meters}
                onChange={(e) => setData({ ...data, size_width_meters: Number(e.target.value) })}
                className="w-full rounded-md border border-emerald-700 bg-emerald-900/50 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm text-emerald-200 mb-1">Height (m)</label>
              <input
                type="number"
                step="0.1"
                value={data.size_height_meters}
                onChange={(e) => setData({ ...data, size_height_meters: Number(e.target.value) })}
                className="w-full rounded-md border border-emerald-700 bg-emerald-900/50 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

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
