"use client";

import useSWR from "swr";

type Booking = {
  id: string;
  name: string;
  createdAt: string;
};

const fetcher = (url: string): Promise<Booking[]> =>
  fetch(url).then((res) => res.json());

export default function CachedBookings() {
  const API_URL = "https://6926df7326e7e41498fbece0.mockapi.io/bookings";

  const { data, error, isLoading } = useSWR<Booking[]>(API_URL, fetcher);

  if (isLoading) return <p>Đang tải dữ liệu từ cache...</p>;
  if (error) return <p>Lỗi khi tải dữ liệu.</p>;
  if (!data) return null;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Optimized Booking List (SWR)</h2>
      <hr />
      <ul>
        {data.map((booking) => (
          <li key={booking.id}>
  <strong>{booking.name}</strong> – Ngày:{" "}
  {new Date(booking.createdAt).toLocaleDateString("vi-VN")}
</li>

        ))}
      </ul>
      <p style={{ fontSize: "12px", color: "gray" }}>
        * Dữ liệu được cache tự động. Chuyển tab rồi quay lại sẽ load gần như tức thì.
      </p>
    </div>
  );
}
