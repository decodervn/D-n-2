"use client";
import { useState } from "react";
import MovieModal from "./MovieModel";
import Link from "next/link"; 

export default function MoviesPage() {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Matrix",
      genre: "Sci-Fi",
      duration: "2h 16m",
      releaseDate: "1999-03-31",
      status: "Now Showing",
    },
    {
      id: 2,
      title: "Inception",
      genre: "Thriller",
      duration: "2h 28m",
      releaseDate: "2010-07-16",
      status: "Coming Soon",
    },
  ]);

  const [modalType, setModalType] = useState<"create" | "edit" | null>(null);
  const [editingMovie, setEditingMovie] = useState<any>(null);

  // === CREATE or UPDATE MOVIE ===
  const handleSave = (movie: any) => {
    if (modalType === "create") {
      const id = movies.length + 1;
      setMovies([...movies, { id, ...movie }]);
    } else if (modalType === "edit") {
      setMovies(movies.map((m) => (m.id === movie.id ? movie : m)));
    }
  };

  // === EDIT ===
  const handleEdit = (movie: any) => {
    setEditingMovie(movie);
    setModalType("edit");
  };

  // === DELETE ===
  const handleDelete = (id: number) => {
    if (confirm("Delete this movie?")) {
      setMovies(movies.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen text-gray-900 bg-gray-50 overflow-auto">
      {/* Sidebar Menu */}
      {/* Sidebar Menu */}
<aside className="w-60 bg-green-100 p-5 space-y-4 border-r border-gray-300 sticky top-0 h-screen">
  <h2 className="text-xl font-bold mb-3">Admin Panel</h2>
  <nav className="space-y-2">
    <Link
      href="/movies"
      className="block text-green-700 font-semibold bg-white shadow rounded p-2"
    >
      🎬 Movies
    </Link>
    <Link href="/cinema" className="block text-gray-700 hover:text-green-700">
      🏢 Cinema
    </Link>
    <Link href="/users" className="block text-gray-700 hover:text-green-700">
      👤 Users
    </Link>
    <Link href="/orders" className="block text-gray-700 hover:text-green-700">
      📄 Orders
    </Link>
    <Link href="/report" className="block text-gray-700 hover:text-green-700">
      📊 Reports
    </Link>
  </nav>
</aside>

      {/* Main Content */}
      <main className="flex-1 p-8 relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Movies Management</h1>
          <button
            onClick={() => setModalType("create")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            + Create Movie
          </button>
        </div>

        {/* Movies Table */}
        <table className="w-full border-collapse border border-gray-300 bg-white shadow-sm">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="border p-3 text-left">#</th>
              <th className="border p-3 text-left">Title</th>
              <th className="border p-3 text-left">Genre</th>
              <th className="border p-3 text-left">Duration</th>
              <th className="border p-3 text-left">Release Date</th>
              <th className="border p-3 text-left">Status</th>
              <th className="border p-3 text-center w-40">Action</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="border p-3">{m.id}</td>
                <td className="border p-3">{m.title}</td>
                <td className="border p-3">{m.genre}</td>
                <td className="border p-3">{m.duration}</td>
                <td className="border p-3">{m.releaseDate}</td>
                <td
                  className={`border p-3 font-medium ${
                    m.status === "Now Showing"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {m.status}
                </td>
                <td className="border p-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(m)}
                    className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Popup Create/Edit Movie */}
        {modalType && (
          <MovieModal
            type={modalType}
            movie={modalType === "edit" ? editingMovie : null}
            onClose={() => {
              setModalType(null);
              setEditingMovie(null);
            }}
            onSave={handleSave}
          />
        )}
      </main>
    </div>
  );
}
