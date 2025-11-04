"use client";
import { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ReportPage() {
  const [summary] = useState({
    totalRevenue: 125_000_000,
    totalOrders: 320,
    totalCinemas: 8,
    activeMovies: 12,
  });

  const revenueData = [
    { month: "Jun", revenue: 20_000_000 },
    { month: "Jul", revenue: 35_000_000 },
    { month: "Aug", revenue: 25_000_000 },
    { month: "Sep", revenue: 30_000_000 },
    { month: "Oct", revenue: 15_000_000 },
  ];

  const statusData = [
    { status: "Confirmed", count: 230 },
    { status: "Pending", count: 60 },
    { status: "Cancelled", count: 30 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
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
          <a href="/orders" className="block text-gray-700 hover:text-green-700">
            📄 Orders
          </a>
          <a
            href="/report"
            className="block text-green-700 font-semibold bg-white shadow rounded p-2"
          >
            📊 Reports
          </a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

        {/* Summary cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white shadow p-4 rounded-lg text-center">
            <h3 className="text-sm text-gray-500">Total Revenue</h3>
            <p className="text-2xl font-bold text-green-600">
              {summary.totalRevenue.toLocaleString()} ₫
            </p>
          </div>
          <div className="bg-white shadow p-4 rounded-lg text-center">
            <h3 className="text-sm text-gray-500">Total Orders</h3>
            <p className="text-2xl font-bold text-blue-600">
              {summary.totalOrders}
            </p>
          </div>
          <div className="bg-white shadow p-4 rounded-lg text-center">
            <h3 className="text-sm text-gray-500">Total Cinemas</h3>
            <p className="text-2xl font-bold text-purple-600">
              {summary.totalCinemas}
            </p>
          </div>
          <div className="bg-white shadow p-4 rounded-lg text-center">
            <h3 className="text-sm text-gray-500">Active Movies</h3>
            <p className="text-2xl font-bold text-orange-500">
              {summary.activeMovies}
            </p>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white shadow p-4 rounded-lg mb-8">
          <h2 className="text-lg font-bold mb-4">Revenue over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Chart */}
        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Order Status Summary</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}
