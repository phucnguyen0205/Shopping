"use client";

import useSWR from "swr";
import axios from "axios";
import { useState } from "react";

type Booking = {
  id: string;
  name: string;
  createdAt: string;
};

const API_URL = "https://6926df7326e7e41498fbece0.mockapi.io/bookings";

const fetcher = (url: string) =>
  axios.get<Booking[]>(url).then((res) => res.data);

export default function BookingManager() {
  const { data: bookings, error, isLoading, mutate } = useSWR<Booking[]>(
    API_URL,
    fetcher
  );

  const [newBooking, setNewBooking] = useState("");

  if (isLoading)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load bookings
      </p>
    );

  if (!bookings) return null;

  // ✅ ADD (Optimistic)
  const addBooking = async () => {
    if (!newBooking.trim()) return;

    const tempBooking: Booking = {
      id: crypto.randomUUID(),
      name: newBooking,
      createdAt: new Date().toISOString(),
    };

    mutate(
      async (current) => {
        await axios.post(API_URL, { name: newBooking });
        return current;
      },
      {
        optimisticData: [...bookings, tempBooking],
        rollbackOnError: true,
        revalidate: true,
      }
    );

    setNewBooking("");
  };

  // ✅ DELETE (Optimistic)
  const deleteBooking = async (id: string) => {
    mutate(
      async (current) => {
        await axios.delete(`${API_URL}/${id}`);
        return current;
      },
      {
        optimisticData: bookings.filter((b) => b.id !== id),
        rollbackOnError: true,
        revalidate: true,
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Booking Manager
        </h2>

        {/* Add */}
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Booking name..."
            value={newBooking}
            onChange={(e) => setNewBooking(e.target.value)}
          />
          <button
            onClick={addBooking}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        {/* List */}
        <ul className="space-y-2">
          {bookings.map((b) => (
            <li
              key={b.id}
              className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
            >
              <div>
                <p className="font-medium">{b.name}</p>
                <p className="text-xs text-gray-500">
                  {new Date(b.createdAt).toLocaleDateString("vi-VN")}
                </p>
              </div>

              <button
                onClick={() => deleteBooking(b.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
