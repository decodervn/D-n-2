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
    cinema || { name: "", location: "", seats: 100, status: "Active" }
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
  <div className="fixed inset-0 bg-transparent backdrop-blur-[2px] flex justify-center items-center z-50 overflow-auto">
      <div
        ref={modalRef}
        className="absolute bg-white rounded-lg shadow-lg p-6 w-[460px] cursor-grab"
        style={{ top: "20%", left: "35%" }}
      >
        {/* Header */}
        <div
          onMouseDown={startDrag}
          className="flex justify-between items-center mb-4 cursor-move bg-gray-200 p-2 rounded"
        >
          <h2 className="text-lg font-bold">
            {type === "create" ? "Create Cinema" : "Edit Cinema"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Cinema Name</label>
            <input
              type="text"
              required
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              required
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Seats</label>
            <input
              type="number"
              min={1}
              value={data.seats}
              onChange={(e) => setData({ ...data, seats: Number(e.target.value) })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              value={data.status}
              onChange={(e) => setData({ ...data, status: e.target.value })}
              className="w-full border p-2 rounded"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
