"use client";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: 101,
      customer: "Nguyen Van A",
      movie: "Interstellar",
      cinema: "CGV Vincom Bà Triệu",
      seat: "E10, E11",
      total: 220000,
      status: "Confirmed",
      date: "2025-11-02",
    },
    {
      id: 102,
      customer: "Tran Thi B",
      movie: "Inception",
      cinema: "BHD Bitexco",
      seat: "B2",
      total: 120000,
      status: "Pending",
      date: "2025-11-03",
    },
    {
      id: 103,
      customer: "Le Hoang C",
      movie: "The Matrix",
      cinema: "Lotte Keangnam",
      seat: "A1, A2, A3",
      total: 360000,
      status: "Cancelled",
      date: "2025-10-30",
    },
  ]);

  // Sẵn sàng cho backend sau này
  useEffect(() => {
    // fetch("http://localhost:3001/orders")
    //   .then((res) => res.json())
    //   .then((data) => setOrders(data));
  }, []);

  const handleView = (id: number) => alert(`View details for Order ID ${id}`);
  const handleEdit = (id: number) => alert(`Edit Order ID ${id}`);
  const handleDelete = (id: number) => {
    if (confirm("Delete this order?")) {
      setOrders(orders.filter((o) => o.id !== id));
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
          <a href="/users" className="block text-gray-700 hover:text-green-700">
            👤 Users
          </a>
          <a
            href="/orders"
            className="block text-green-700 font-semibold bg-white shadow rounded p-2"
          >
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
          <h1 className="text-2xl font-bold">Orders Management</h1>
          <button
            onClick={() => alert("Create order (chưa kết nối API)")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            + Create Order
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-300 bg-white shadow-sm">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="border p-3 text-left">#</th>
              <th className="border p-3 text-left">Customer</th>
              <th className="border p-3 text-left">Movie</th>
              <th className="border p-3 text-left">Cinema</th>
              <th className="border p-3 text-left">Seat</th>
              <th className="border p-3 text-right">Total (VND)</th>
              <th className="border p-3 text-left">Status</th>
              <th className="border p-3 text-left">Date</th>
              <th className="border p-3 text-center w-40">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="border p-3">{o.id}</td>
                <td className="border p-3 font-medium">{o.customer}</td>
                <td className="border p-3">{o.movie}</td>
                <td className="border p-3">{o.cinema}</td>
                <td className="border p-3">{o.seat}</td>
                <td className="border p-3 text-right">
                  {o.total.toLocaleString()}
                </td>
                <td
                  className={`border p-3 font-medium ${
                    o.status === "Confirmed"
                      ? "text-green-600"
                      : o.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-500"
                  }`}
                >
                  {o.status}
                </td>
                <td className="border p-3">{o.date}</td>
                <td className="border p-3 text-center space-x-2">
                  <button
                    onClick={() => handleView(o.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(o.id)}
                    className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(o.id)}
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
