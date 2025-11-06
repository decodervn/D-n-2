"use client";
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import MovieModel from "./MovieModel";

export default function MoviesPage() {
  const [movies, setMovies] = useState([
    { id: 1, title: "The Matrix", genre: "Sci-Fi", duration: "2h 16m", releaseDate: "1999-03-31", status: "Now Showing" },
    { id: 2, title: "Inception", genre: "Thriller", duration: "2h 28m", releaseDate: "2010-07-16", status: "Coming Soon" },
  ]);

  const [modalType, setModalType] = useState<"create" | "edit" | null>(null);
  const [editingMovie, setEditingMovie] = useState<any>(null);

  const handleSave = (m: any) => {
    if (modalType === "create") setMovies(prev => [...prev, { id: prev.length + 1, ...m }]);
    if (modalType === "edit") setMovies(prev => prev.map(x => (x.id === m.id ? m : x)));
  };

  const handleEdit = (m: any) => { setEditingMovie(m); setModalType("edit"); };
  const handleDelete = (id: number) => { if (confirm("Delete this movie?")) setMovies(movies.filter(m => m.id !== id)); };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">🎬 Movie Management</h1>
          <button
            onClick={() => setModalType("create")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all"
          >
            + Create Movie
          </button>
        </header>

        <div className="overflow-hidden rounded-xl shadow-lg bg-black/50 backdrop-blur-sm border border-emerald-600/40">
          <table className="w-full text-sm text-white/90">
            <thead className="bg-emerald-900/70 text-emerald-300 uppercase tracking-wide text-xs">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Genre</th>
                <th className="px-4 py-3 text-left">Duration</th>
                <th className="px-4 py-3 text-left">Release Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((m, idx) => (
                <tr key={m.id} className="border-t border-emerald-700/30 hover:bg-emerald-800/20 transition">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3 font-medium">{m.title}</td>
                  <td className="px-4 py-3">{m.genre}</td>
                  <td className="px-4 py-3">{m.duration}</td>
                  <td className="px-4 py-3">{m.releaseDate}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        m.status === "Now Showing"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
  onClick={() => handleEdit(m)}
  className="px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
>
  Edit
</button>
<button
  onClick={() => handleDelete(m.id)}
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

        {modalType && (
          <MovieModel
            type={modalType}
            movie={modalType === "edit" ? editingMovie : null}
            onClose={() => { setModalType(null); setEditingMovie(null); }}
            onSave={handleSave}
          />
        )}
      </div>
    </AdminLayout>
  );
}
