"use client";
import { useState } from "react";

// Giả định bạn sẽ truyền danh sách các phòng chiếu (screens) vào component này
// để người dùng có thể chọn.
// Ví dụ: interface Screen { id: string; name: string; }
// props: { ..., screens: Screen[] }
// Nhưng để đơn giản, tôi sẽ giữ nó là một trường text input theo screenId.

export default function SeatModel({ type, seat, onClose, onSave }: any) {
  const [data, setData] = useState(
    seat || {
      screenId: "",
      row: "",
      col: 1,
      label: "",
      type: "STANDARD", // Giá trị mặc định từ ENUM
      status: "ACTIVE", // Giá trị mặc định từ ENUM
      isAisle: false,
      isWheelchair: false,
      priceMultiplier: 1.0,
    }
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const method = type === "create" ? "POST" : "PUT";
    const url =
      type === "create"
        ? "http://localhost:3000/seats" // Thay đổi API endpoint
        : `http://localhost:3000/seats/${seat.id}`; // Thay đổi API endpoint

    // Đảm bảo các giá trị số và boolean được gửi đi chính xác
    const payload = {
      ...data,
      col: Number(data.col),
      priceMultiplier: Number(data.priceMultiplier),
      isAisle: Boolean(data.isAisle),
      isWheelchair: Boolean(data.isWheelchair),
    };

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg w-[500px]">
        <h2 className="text-lg font-semibold mb-4">
          {type === "create" ? "Add Seat" : "Edit Seat"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Bạn nên thay thế trường này bằng một <select> để chọn screen */}
          <input
            type="text"
            placeholder="Screen ID"
            value={data.screenId}
            onChange={(e) => setData({ ...data, screenId: e.target.value })}
            className="w-full border border-gray-700 p-2 rounded bg-gray-800"
          />

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Row (e.g., A, B)"
              value={data.row}
              onChange={(e) => setData({ ...data, row: e.target.value })}
              className="w-1/2 border border-gray-700 p-2 rounded bg-gray-800"
            />
            <input
              type="number"
              placeholder="Column (e.g., 1, 2)"
              value={data.col}
              onChange={(e) => setData({ ...data, col: Number(e.target.value) })}
              className="w-1/2 border border-gray-700 p-2 rounded bg-gray-800"
            />
          </div>

          <input
            type="text"
            placeholder="Label (e.g., A1, B2)"
            value={data.label}
            onChange={(e) => setData({ ...data, label: e.target.value })}
            className="w-full border border-gray-700 p-2 rounded bg-gray-800"
          />

          <div className="flex gap-3">
            <select
              value={data.type}
              onChange={(e) => setData({ ...data, type: e.target.value })}
              className="w-1/2 border border-gray-700 p-2 rounded bg-gray-800"
            >
              <option value="STANDARD">Standard</option>
              {/* Thêm các loại ghế khác từ ENUM của bạn */}
              <option value="VIP">VIP</option>
              <option value="COUPLE">Couple</option>
            </select>

            <select
              value={data.status}
              onChange={(e) => setData({ ...data, status: e.target.value })}
              className="w-1/2 border border-gray-700 p-2 rounded bg-gray-800"
            >
              <option value="ACTIVE">Active</option>
              <option value="BLOCKED">Blocked</option>
              <option value="REPAIR">Under Repair</option>
            </select>
          </div>

          <input
            type="number"
            step="0.1"
            placeholder="Price Multiplier (e.g., 1.0, 1.5)"
            value={data.priceMultiplier}
            onChange={(e) =>
              setData({ ...data, priceMultiplier: Number(e.target.value) })
            }
            className="w-full border border-gray-700 p-2 rounded bg-gray-800"
          />

          <div className="flex gap-6 items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={data.isAisle}
                onChange={(e) =>
                  setData({ ...data, isAisle: e.target.checked })
                }
                className="rounded bg-gray-800 border-gray-700"
              />
              Is Aisle?
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={data.isWheelchair}
                onChange={(e) =>
                  setData({ ...data, isWheelchair: e.target.checked })
                }
                className="rounded bg-gray-800 border-gray-700"
              />
              Wheelchair Accessible?
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
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