"use client";

import { useEffect, useState } from "react";

export default function BookingStatus() {

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "https://6926df7326e7e41498fbece0.mockapi.io/bookings";

  useEffect(() => {

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data from API");
        }
        return res.json();
      })
      .then((data) => {
        setBookings(data); 
      })
      .catch((err) => {
        setError("Không thể tải danh sách đặt chỗ. Vui lòng thử lại!"); 
      })
      .finally(() => {
        setLoading(false); 
      });
  }, []);

  if (loading) return <div style={{ padding: "20px" }}>Đang tải dữ liệu...</div>;
  
  if (error) return <div style={{ padding: "20px", color: "red" }}> Lỗi: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Booking List (Exercise 3)</h2>
      <hr />
      {bookings.length === 0 ? (
        <p>Danh sách trống.</p>
      ) : (
        <ul>
          {bookings.map((item) => (
            <li key={item.id}>
              {item.name} - <strong>{item.date}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}