"use client";
import { useState } from "react";
import Link from "next/link";
import OrderModel from "./OrderModel";

export default function OrderPage() {
  const [orders, setOrders] = useState([
    { id: 1, customer: "Nguyễn Văn A", movie: "Inception", amount: 150000, status: "Paid" },
    { id: 2, customer: "Trần Thị B", movie: "The Matrix", amount: 200000, status: "Pending" },
    { id: 3, customer: "Lê Văn C", movie: "Avatar", amount: 250000, status: "Cancelled" },
  ]);

  const [modalType, setModalType] = useState<"create" | "edit" | null>(null);
  const [editingOrder, setEditingOrder] = useState<any>(null);

  const handleSave = (order: any) => {
    if (modalType === "create") {
      const id = orders.length + 1;
      setOrders([...orders, { id, ...order }]);
    } else if (modalType === "edit") {
      setOrders(orders.map((o) => (o.id === order.id ? order : o)));
    }
  };

  const handleEdit = (order: any) => {
    setEditingOrder(order);
    setModalType("edit");
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this order?")) {
      setOrders(orders.filter((o) => o.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen text-gray-900 bg-gray-50 overflow-auto">
      {/* Sidebar */}
      <aside className="w-60 bg-green-100 p-5 space-y-4 border-r border-gray-300 sticky top-0 h-screen">
        <h2 className="text-xl font-bold mb-3">Admin Panel</h2>
        <nav className="space-y-2">
          <Link href="/movies" className="block text-gray-700 hover:text-green-700">
            🎬 Movies
          </Link>
          <Link href="/cinema" className="block text-gray-700 hover:text-green-700">
            🏢 Cinema
          </Link>
          <Link href="/users" className="block text-gray-700 hover:text-green-700">
            👤 Users
          </Link>
          <Link
            href="/orders"
            className="block text-green-700 font-semibold bg-white shadow rounded p-2"
          >
            📄 Orders
          </Link>
          <Link href="/report" className="block text-gray-700 hover:text-green-700">
            📊 Reports
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Order Management</h1>
          <button
            onClick={() => setModalType("create")}
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
              <th className="border p-3 text-left">Amount (₫)</th>
              <th className="border p-3 text-left">Status</th>
              <th className="border p-3 text-center w-40">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="border p-3">{o.id}</td>
                <td className="border p-3">{o.customer}</td>
                <td className="border p-3">{o.movie}</td>
                <td className="border p-3">{o.amount.toLocaleString()}</td>
                <td
                  className={`border p-3 font-medium ${
                    o.status === "Paid"
                      ? "text-green-600"
                      : o.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-500"
                  }`}
                >
                  {o.status}
                </td>
                <td className="border p-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(o)}
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

        {/* Popup Overlay */}
        {modalType && (
          <OrderModel
            type={modalType}
            order={modalType === "edit" ? editingOrder : null}
            onClose={() => {
              setModalType(null);
              setEditingOrder(null);
            }}
            onSave={handleSave}
          />
        )}
      </main>
    </div>
  );
}
