"use client";
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import OrderModel from "./OrderModel";

type Order = {
  id: number;
  customer: string;
  movie: string;
  amount: number;
  status: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, customer: "Nguyen Van A", movie: "Inception", amount: 120000, status: "Paid" },
    { id: 2, customer: "Tran Thi B", movie: "Avatar", amount: 150000, status: "Pending" },
    { id: 3, customer: "Le Van C", movie: "The Matrix", amount: 100000, status: "Cancelled" },
  ]);

  const [modalType, setModalType] = useState<"create" | "edit" | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const handleSave = (o: any) => {
    if (modalType === "create") setOrders(prev => [...prev, { id: prev.length + 1, ...o }]);
    if (modalType === "edit") setOrders(prev => prev.map(x => (x.id === o.id ? o : x)));
  };

  const handleEdit = (o: Order) => {
    setEditingOrder(o);
    setModalType("edit");
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this order?")) setOrders(orders.filter(o => o.id !== id));
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-emerald-300">🧾 Order Management</h1>
          <button
            onClick={() => setModalType("create")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all"
          >
            + Create Order
          </button>
        </header>

        {/* Table */}
        <div className="overflow-hidden rounded-xl shadow-lg bg-black/50 backdrop-blur-sm border border-emerald-600/40">
          <table className="w-full text-sm text-white/90">
            <thead className="bg-emerald-900/70 text-emerald-300 uppercase tracking-wide text-xs">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Movie</th>
                <th className="px-4 py-3 text-left">Amount (₫)</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o, idx) => (
                <tr key={o.id} className="border-t border-emerald-700/30 hover:bg-emerald-800/20 transition">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3 font-medium">{o.customer}</td>
                  <td className="px-4 py-3">{o.movie}</td>
                  <td className="px-4 py-3">{o.amount.toLocaleString()} ₫</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        o.status === "Paid"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : o.status === "Pending"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-rose-500/20 text-rose-300"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(o)}
                      className="px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(o.id)}
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
      </div>
    </AdminLayout>
  );
}
