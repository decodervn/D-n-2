"use client";
import { useState } from "react";

export default function EditMoviePage() {
  const [title, setTitle] = useState("The Matrix");
  const [description, setDescription] = useState("Sample Movie");
  const [durationHour, setDurationHour] = useState(2);
  const [durationMin, setDurationMin] = useState(30);
  const [price, setPrice] = useState(15);
  const [schedule, setSchedule] = useState("2023-06-28");
  const [endDate, setEndDate] = useState("2023-12-16");
  const [cover, setCover] = useState(
    "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg"
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg w-[500px] text-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Edit Movie</h1>
          <button className="text-gray-500 hover:text-black text-xl">✕</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Movie Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>

          <div className="flex items-center space-x-2">
            <div>
              <label className="block text-sm font-medium">Duration</label>
              <div className="flex items-center space-x-1">
                <input
                  type="number"
                  value={durationHour}
                  onChange={(e) => setDurationHour(Number(e.target.value))}
                  className="border w-16 p-1 rounded text-center"
                />
                <span>h</span>
                <input
                  type="number"
                  value={durationMin}
                  onChange={(e) => setDurationMin(Number(e.target.value))}
                  className="border w-16 p-1 rounded text-center"
                />
                <span>min</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Price (RM)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="border w-24 p-1 rounded text-center"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Showing Schedule</label>
            <input
              type="date"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Cover Image</label>
            <div className="flex items-center space-x-3">
              <img src={cover} alt="cover" className="w-16 h-24 object-cover" />
              <input
                type="file"
                onChange={() => alert("Upload not implemented yet")}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Save
            </button>
            <button className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
