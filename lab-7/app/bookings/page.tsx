interface Booking {
  id: string;
  name: string;
  date: string;
}

export default async function BookingsPage() {
  const API_URL = "https://6926df7326e7e41498fbece0.mockapi.io/bookings";
  
  const res = await fetch(API_URL, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Không thể tải dữ liệu từ API');
  }

  const bookings: Booking[] = await res.json();

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Booking List</h1>
      <hr />
      
      {bookings.length === 0 ? (
        <p>Hiện chưa có đơn đặt chỗ nào.</p>
      ) : (
        <ul style={{ lineHeight: '2' }}>
          {bookings.map((item) => (
            <li key={item.id}>
              <strong>ID:</strong> {item.id} - 
              <strong> Khách hàng:</strong> {item.name} - 
              <strong> Ngày:</strong> {item.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}