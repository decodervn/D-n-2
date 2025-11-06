"use client";
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import UserModel from "./UserModel";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Nguyen Van A", email: "a@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Tran Thi B", email: "b@example.com", role: "Staff", status: "Active" },
    { id: 3, name: "Le Van C", email: "c@example.com", role: "Viewer", status: "Inactive" },
  ]);

  const [modalType, setModalType] = useState<"create" | "edit" | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleSave = (u: any) => {
    if (modalType === "create") setUsers(prev => [...prev, { id: prev.length + 1, ...u }]);
    if (modalType === "edit") setUsers(prev => prev.map(x => (x.id === u.id ? u : x)));
  };

  const handleEdit = (u: User) => {
    setEditingUser(u);
    setModalType("edit");
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this user?")) setUsers(users.filter(u => u.id !== id));
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-emerald-300">👤 User Management</h1>
          <button
            onClick={() => setModalType("create")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all"
          >
            + Create User
          </button>
        </header>

        {/* Table */}
        <div className="overflow-hidden rounded-xl shadow-lg bg-black/50 backdrop-blur-sm border border-emerald-600/40">
          <table className="w-full text-sm text-white/90">
            <thead className="bg-emerald-900/70 text-emerald-300 uppercase tracking-wide text-xs">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, idx) => (
                <tr key={u.id} className="border-t border-emerald-700/30 hover:bg-emerald-800/20 transition">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{u.role}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        u.status === "Active"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-rose-500/20 text-rose-300"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(u)}
                      className="px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
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

        {/* Modal */}
        {modalType && (
          <UserModel
            type={modalType}
            user={modalType === "edit" ? editingUser : null}
            onClose={() => {
              setModalType(null);
              setEditingUser(null);
            }}
            onSave={handleSave}
          />
        )}
      </div>
    </AdminLayout>
  );
}
