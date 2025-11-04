"use client";
import { useState, useRef } from "react";

interface UserModalProps {
  type: "create" | "edit";
  user?: any;
  onClose: () => void;
  onSave: (user: any) => void;
}

export default function UserModel({ type, user, onClose, onSave }: UserModalProps) {
  const [data, setData] = useState(
    user || { name: "", email: "", role: "Customer", status: "Active" }
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
        <div
          onMouseDown={startDrag}
          className="flex justify-between items-center mb-4 cursor-move bg-gray-200 p-2 rounded"
        >
          <h2 className="text-lg font-bold">
            {type === "create" ? "Create User" : "Edit User"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">
            ✕
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              required
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Role</label>
            <select
              value={data.role}
              onChange={(e) => setData({ ...data, role: e.target.value })}
              className="w-full border p-2 rounded"
            >
              <option>Admin</option>
              <option>Staff</option>
              <option>Customer</option>
            </select>
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
