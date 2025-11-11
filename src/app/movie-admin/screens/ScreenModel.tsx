"use client";

import { useState, useRef } from "react";
import type { Screen } from "./page";

interface ScreenModalProps {
  type: "create" | "edit";
  screen?: Screen;
  onClose: () => void;
  onSave: (data: Omit<Screen, "id">) => void;
}

// Các giá trị value phải trùng enum ở backend (xem Swagger)
const SCREEN_FORMATS = [
  { value: "Standard", label: "2D (Standard)" },
  { value: "3D", label: "3D" },
  { value: "IMAX", label: "IMAX" },
  { value: "Dolby Cinema", label: "Dolby Cinema" },
];

export default function ScreenModel({
  type,
  screen,
  onClose,
  onSave,
}: ScreenModalProps) {
  const [data, setData] = useState<Omit<Screen, "id">>({
    name: screen?.name ?? "",
    capacity: screen?.capacity ?? 0,
    format: screen?.format ?? "Standard",
    size_width_meters: screen?.size_width_meters ?? 0,
    size_height_meters: screen?.size_height_meters ?? 0,
  });

  const modalRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ offsetX: 0, offsetY: 0 });

  const startDrag = (e: React.MouseEvent) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...data,
      capacity: Number(data.capacity),
      size_width_meters:
        data.size_width_meters != null
          ? Number(data.size_width_meters)
          : null,
      size_height_meters:
        data.size_height_meters != null
          ? Number(data.size_height_meters)
          : null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        ref={modalRef}
        className="w-full max-w-lg rounded-2xl bg-slate-900 shadow-2xl border border-emerald-700/60"
      >
        <div
          className="flex items-center justify-between px-6 py-3 cursor-move bg-slate-800/80 rounded-t-2xl"
          onMouseDown={startDrag}
        >
          <h2 className="text-lg font-semibold text-white">
            {type === "create" ? "Add Screen" : "Edit Screen"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Name</label>
            <input
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full rounded-md border border-emerald-700 bg-emerald-900/40 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Capacity
            </label>
            <input
              type="number"
              min={1}
              value={data.capacity}
              onChange={(e) =>
                setData({ ...data, capacity: Number(e.target.value) })
              }
              className="w-full rounded-md border border-emerald-700 bg-emerald-900/40 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Format</label>
            <select
              value={data.format}
              onChange={(e) =>
                setData({ ...data, format: e.target.value as string })
              }
              className="w-full rounded-md border border-emerald-700 bg-emerald-900/40 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {SCREEN_FORMATS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Width (m)
              </label>
              <input
                type="number"
                min={0}
                value={data.size_width_meters ?? ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    size_width_meters:
                      e.target.value === "" ? null : Number(e.target.value),
                  })
                }
                className="w-full rounded-md border border-emerald-700 bg-emerald-900/40 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Height (m)
              </label>
              <input
                type="number"
                min={0}
                value={data.size_height_meters ?? ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    size_height_meters:
                      e.target.value === "" ? null : Number(e.target.value),
                  })
                }
                className="w-full rounded-md border border-emerald-700 bg-emerald-900/40 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
