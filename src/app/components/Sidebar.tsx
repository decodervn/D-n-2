"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Item = ({ href, label, icon }: { href: string; label: string; icon: string }) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm ${
        active ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </Link>
  );
};

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200 bg-white">
      <div className="h-16 flex items-center px-6 text-xl font-bold text-slate-800">
        <span className="mr-2">📊</span> TailAdmin
      </div>
      <nav className="px-3 py-4 space-y-1">
        <Item href="/movie-admin/dashboard" label="Dashboard" icon="🏠" />
        <Item href="/movie-admin/movies" label="Movies" icon="🎬" />
        <Item href="/movie-admin/cinema" label="Cinemas" icon="🏢" />
        <Item href="/movie-admin/users" label="Users" icon="👤" />
        <Item href="/movie-admin/orders" label="Orders" icon="🧾" />
        <Item href="/movie-admin/report" label="Reports" icon="📈" />
      </nav>
      <div className="mt-auto p-4 text-xs text-slate-400">© 2025</div>
    </aside>
  );
}
