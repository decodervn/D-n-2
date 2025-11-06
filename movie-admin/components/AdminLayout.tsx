"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: "/movies", label: "🎬 Movies" },
    { href: "/cinema", label: "🏢 Cinema" },
    { href: "/users", label: "👤 Users" },
    { href: "/orders", label: "🧾 Orders" },
    { href: "/report", label: "📈 Reports" },
    { href: "/screens", label: "🖥️ Screens" },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-emerald-900 to-black text-white">
      {/* Sidebar */}
      <aside className="w-56 bg-black/40 backdrop-blur-sm border-r border-emerald-800/40 p-4 flex flex-col">
        <h1 className="text-xl font-bold text-emerald-400 mb-6 text-center">🎟️ Admin Panel</h1>
        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2 rounded-md transition-all ${
                pathname === link.href
                  ? "bg-emerald-600/60 text-white font-semibold"
                  : "hover:bg-emerald-700/40 text-emerald-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 text-xs text-emerald-300/60 text-center">
          © 2025 Movie Admin
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
