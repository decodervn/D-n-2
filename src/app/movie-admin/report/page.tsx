"use client";
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type DataPoint = {
  date: string;
  tickets: number;
  revenue: number;
};

export default function ReportPage() {
  const [entries, setEntries] = useState<DataPoint[]>([]);
  const [form, setForm] = useState({ date: "", tickets: "", revenue: "" });
  const [period, setPeriod] = useState<"week" | "month" | "year">("week");
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [showChart, setShowChart] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date || !form.tickets || !form.revenue) {
      alert("Please fill in all fields.");
      return;
    }
    const newEntry = {
      date: form.date,
      tickets: Number(form.tickets),
      revenue: Number(form.revenue),
    };
    setEntries((prev) => [...prev, newEntry]);
    setForm({ date: "", tickets: "", revenue: "" });
  };

  const handleGenerateChart = () => {
    if (entries.length === 0) {
      alert("Please add at least one record first!");
      return;
    }
    // Sort by date ascending
    const sorted = [...entries].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setChartData(sorted);
    setShowChart(true);
  };

  const totalRevenue = entries.reduce((sum, e) => sum + e.revenue, 0);
  const totalTickets = entries.reduce((sum, e) => sum + e.tickets, 0);

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-emerald-300">
            💹 Revenue Input & Reports
          </h1>
        </header>

        {/* Input Form */}
        <div className="bg-black/40 border border-emerald-700 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-emerald-300 mb-4">
            Add Daily Revenue
          </h2>
          <form
            onSubmit={handleAdd}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
          >
            <div>
              <label className="block text-sm text-emerald-200 mb-1">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full bg-emerald-900/40 border border-emerald-700 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm text-emerald-200 mb-1">
                Tickets Sold
              </label>
              <input
                type="number"
                min={0}
                value={form.tickets}
                onChange={(e) => setForm({ ...form, tickets: e.target.value })}
                className="w-full bg-emerald-900/40 border border-emerald-700 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm text-emerald-200 mb-1">
                Revenue (₫)
              </label>
              <input
                type="number"
                min={0}
                value={form.revenue}
                onChange={(e) => setForm({ ...form, revenue: e.target.value })}
                className="w-full bg-emerald-900/40 border border-emerald-700 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-4 py-2 rounded-md shadow-lg"
            >
              + Add
            </button>
          </form>
        </div>

        {/* Summary */}
        {entries.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <SummaryCard
                title="Total Revenue"
                value={totalRevenue.toLocaleString("vi-VN") + " ₫"}
              />
              <SummaryCard
                title="Total Tickets"
                value={totalTickets.toLocaleString("vi-VN")}
              />
              <SummaryCard title="Entries" value={entries.length} />
            </div>

            {/* Data Table */}
            <div className="overflow-hidden rounded-xl shadow-lg bg-black/50 backdrop-blur-sm border border-emerald-600/40 mb-8">
              <table className="w-full text-sm text-white/90">
                <thead className="bg-emerald-900/70 text-emerald-300 uppercase tracking-wide text-xs">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Tickets Sold</th>
                    <th className="px-4 py-3 text-left">Revenue (₫)</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((e, idx) => (
                    <tr
                      key={idx}
                      className="border-t border-emerald-700/30 hover:bg-emerald-800/20 transition"
                    >
                      <td className="px-4 py-3">{e.date}</td>
                      <td className="px-4 py-3">{e.tickets}</td>
                      <td className="px-4 py-3">
                        {e.revenue.toLocaleString("vi-VN")} ₫
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Chart Controls */}
        {entries.length > 0 && (
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6 bg-black/40 border border-emerald-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <label className="text-emerald-300 text-sm font-medium">
                View By:
              </label>
              <select
                value={period}
                onChange={(e) =>
                  setPeriod(e.target.value as "week" | "month" | "year")
                }
                className="bg-emerald-900/40 border border-emerald-700 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-emerald-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>

            <button
              onClick={handleGenerateChart}
              className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-4 py-2 rounded-md shadow-lg"
            >
              Generate Chart
            </button>
          </div>
        )}

        {/* Chart */}
        {showChart && (
          <div className="bg-black/50 border border-emerald-700 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-emerald-300 mb-4">
              Revenue Overview
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" />
                <XAxis dataKey="date" stroke="#6ee7b7" />
                <YAxis stroke="#6ee7b7" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#022c22",
                    border: "1px solid #10b981",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#a7f3d0" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="tickets"
                  stroke="#34d399"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

/* ------------- Summary Card Component ------------- */
function SummaryCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-emerald-700 bg-gradient-to-br from-emerald-950 via-black to-emerald-900 p-5 shadow-md">
      <div className="text-emerald-300 text-sm mb-1">{title}</div>
      <div className="text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}
