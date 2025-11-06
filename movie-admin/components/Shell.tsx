import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <Topbar />
          <main className="p-4 lg:p-8 space-y-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
