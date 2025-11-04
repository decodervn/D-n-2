"use client";
import { useState, useRef } from "react";

interface MovieModalProps {
  type: "create" | "edit";
  movie?: any;
  onClose: () => void;
  onSave: (movie: any) => void;
}

export default function MovieModal({ type, movie, onClose, onSave }: MovieModalProps) {
  const [data, setData] = useState(
    movie || { title: "", genre: "", duration: "", releaseDate: "", status: "Coming Soon" }
  );

  const modalRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });

  // ===== DRAG LOGIC =====
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

  // ===== SAVE =====
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(data);
    onClose();
  };

  return (
   <div className="fixed inset-0 bg-transparent flex justify-center items-center z-50 overflow-auto">
      <div
        ref={modalRef}
        className="absolute bg-white rounded-lg shadow-lg p-6 w-[450px] cursor-grab"
        style={{ top: "20%", left: "35%" }}
      >
        <div
          onMouseDown={startDrag}
          className="flex justify-between items-center mb-4 cursor-move bg-gray-200 p-2 rounded"
        >
          <h2 className="text-lg font-bold">
            {type === "create" ? "Create Movie" : "Edit Movie"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">
            ✕
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              required
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Genre</label>
            <input
              type="text"
              required
              value={data.genre}
              onChange={(e) => setData({ ...data, genre: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Duration</label>
            <input
              type="text"
              placeholder="e.g. 2h 10m"
              value={data.duration}
              onChange={(e) => setData({ ...data, duration: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Release Date</label>
            <input
              type="date"
              value={data.releaseDate}
              onChange={(e) => setData({ ...data, releaseDate: e.target.value })}
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
              <option>Now Showing</option>
              <option>Coming Soon</option>
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
