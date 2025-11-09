"use client";
import { useState } from "react";

export default function MovieModel({ type, movie, onClose, onSave }: any) {
  const [data, setData] = useState(
    movie || {
      title: "",
      description: "",
      genre: "",
      duration: 0,
      release_date: "",
      poster_url: "",
    }
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // ❌ ĐÃ XÓA BỎ LOGIC FETCH TẠI ĐÂY
    // const method = type === "create" ? "POST" : "PUT";
    // const url = ...
    // await fetch(url, { ... });

    // ✅ CHỈ CẦN GỌI onSave VÀ TRUYỀN DỮ LIỆU LÊN CHO CHA
    onSave(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg w-[500px]">
        <h2 className="text-lg font-semibold mb-4">
          {type === "create" ? "Add Movie" : "Edit Movie"}
        </h2>

        {/* Toàn bộ form JSX của bạn giữ nguyên, nó đã đúng */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full border border-gray-700 p-2 rounded bg-gray-800"
          />
          <input
            type="text"
            placeholder="Description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="w-full border border-gray-700 p-2 rounded bg-gray-800"
          />
          <input
            type="text"
            placeholder="Genre"
            value={data.genre}
            onChange={(e) => setData({ ...data, genre: e.target.value })}
            className="w-full border border-gray-700 p-2 rounded bg-gray-800"
          />
          <input
            type="number"
            placeholder="Duration (minutes)"
            value={data.duration}
            onChange={(e) => setData({ ...data, duration: Number(e.target.value) })}
            className="w-full border border-gray-700 p-2 rounded bg-gray-800"
          />
          <input
            type="date"
            value={data.release_date}
            onChange={(e) => setData({ ...data, release_date: e.target.value })}
            className="w-full border border-gray-700 p-2 rounded bg-gray-800"
          />
          <input
            type="text"
            placeholder="Poster URL"
            value={data.poster_url}
            onChange={(e) => setData({ ...data, poster_url: e.target.value })}
            className="w-full border border-gray-700 p-2 rounded bg-gray-800"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}