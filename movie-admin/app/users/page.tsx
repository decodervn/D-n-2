"use client";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Nguyen Van A",
      email: "nguyenvana@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Tran Thi B",
      email: "tranthib@example.com",
      role: "Customer",
      status: "Active",
    },
    {
      id: 3,
      name: "Le Hoang C",
      email: "lehoangc@example.com",
      role: "Staff",
      status: "Inactive",
    },
  ]);

  // Chuẩn bị sẵn cho backend
  useEffect(() => {
    // fetch("http://localhost:3001/users")
    //   .then((res) => res.json())
    //   .then((data) => setUsers(data));
  }, []);

  const handleCreate = () => alert("Create user (chưa kết nối API)");
  const handleEdit = (id: number) => alert(`Edit user ID ${id}`);
  const handleDelete = (id: number) => {
    if (confirm("Delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen text-gray-900 bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-green-100 p-5 space-y-4 border-r border-gray-300">
        <h2 className="text-xl font-bold mb-3">Admin Panel</h2>
        <nav className="space-y-2">
          <a href="/movies" className="block text-gray-700 hover:text-green-700">
            🎬 Movies
          </a>
          <a href="/cinema" className="block text-gray-700 hover:text-green-700">
            🏢 Cinema
          </a>
          <a
            href="/users"
            className="block text-green-700 font-semibold bg-white shadow rounded p-2"
          >
            👤 Users
          </a>
          <a href="/orders" className="block text-gray-700 hover:text-green-700">
            📄 Orders
          </a>
          <a href="/report" className="block text-gray-700 hover:text-green-700">
            📊 Reports
          </a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>
          <button
            onClick={handleCreate}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            + Create User
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-300 bg-white shadow-sm">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="border p-3 text-left">#</th>
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left">Role</th>
              <th className="border p-3 text-left">Status</th>
              <th className="border p-3 text-center w-40">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="border p-3">{u.id}</td>
                <td className="border p-3 font-medium">{u.name}</td>
                <td className="border p-3">{u.email}</td>
                <td className="border p-3">{u.role}</td>
                <td
                  className={`border p-3 font-medium ${
                    u.status === "Active" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {u.status}
                </td>
                <td className="border p-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(u.id)}
                    className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
