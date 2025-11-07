"use client";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import MovieModel from "./MovieModel";

type Movie = {
  id: number;
  title: string;
  description: string;
  genre: string;
  duration: number;
  release_date: string;
  poster_url: string;
};

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [modalType, setModalType] = useState<"create" | "edit" | null>(null);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  const apiURL = "http://localhost:3000/movies"; // backend NestJS

  // --- Load movie data from backend ---
  useEffect(() => {
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Failed to load movies:", err));
  }, []);

  // --- Save movie (Create or Edit) ---
  const handleSave = async (movieData: any) => {
    try {
      if (modalType === "create") {
        const res = await fetch(apiURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(movieData),
        });
        const newMovie = await res.json();
        setMovies((prev) => [...prev, newMovie]);
      }

      if (modalType === "edit" && editingMovie) {
        const res = await fetch(`${apiURL}/${editingMovie.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(movieData),
        });
        const updated = await res.json();
        setMovies((prev) =>
          prev.map((m) => (m.id === editingMovie.id ? updated : m))
        );
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setModalType(null);
      setEditingMovie(null);
    }
  };

  // --- Delete movie ---
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this movie?")) return;
    try {
      await fetch(`${apiURL}/${id}`, { method: "DELETE" });
      setMovies((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-emerald-300">
            🎬 Movie Management
          </h1>
          <button
            onClick={() => setModalType("create")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all"
          >
            + Create Movie
          </button>
        </header>

        {/* Table */}
        <div className="overflow-hidden rounded-xl shadow-lg bg-black/50 backdrop-blur-sm border border-emerald-600/40">
          <table className="w-full text-sm text-white/90">
            <thead className="bg-emerald-900/70 text-emerald-300 uppercase tracking-wide text-xs">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Genre</th>
                <th className="px-4 py-3 text-left">Duration</th>
                <th className="px-4 py-3 text-left">Release Date</th>
                <th className="px-4 py-3 text-left">Poster</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {movies.map((m, idx) => (
                <tr
                  key={m.id}
                  className="border-t border-emerald-700/30 hover:bg-emerald-800/20 transition"
                >
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3 font-medium">{m.title}</td>
                  <td className="px-4 py-3">{m.description}</td>
                  <td className="px-4 py-3">{m.genre}</td>
                  <td className="px-4 py-3">{m.duration} min</td>
                  <td className="px-4 py-3">{m.release_date?.slice(0, 10)}</td>
                  <td className="px-4 py-3">
                    {m.poster_url ? (
                      <img
                        src={m.poster_url}
                        alt={m.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-500 italic">No image</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingMovie(m);
                        setModalType("edit");
                      }}
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

        {/* Popup */}
        {modalType && (
          <MovieModel
            type={modalType}
            movie={modalType === "edit" ? editingMovie : null}
            onClose={() => {
              setModalType(null);
              setEditingMovie(null);
            }}
            onSave={handleSave}
          />
        )}
      </div>
    </AdminLayout>
  );
}
