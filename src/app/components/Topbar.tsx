"use client";
import Link from "next/link";

export default function Topbar() {
  return (
    <header className="h-16 sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="h-full px-4 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3 w-full">
          <button className="lg:hidden text-slate-500 text-xl">☰</button>
          <input
            placeholder="Search or type command…"
            className="w-full max-w-xl rounded-lg border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="h-9 w-9 rounded-full bg-slate-100">🔔</button>
          <Link href="/login" className="text-sm text-slate-600 hover:text-indigo-600">
            Login
          </Link>
          <div className="h-9 w-9 rounded-full bg-indigo-600 text-white grid place-items-center">N</div>
        </div>
      </div>
    </header>
  );
}
