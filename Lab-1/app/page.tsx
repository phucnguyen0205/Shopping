import Image from "next/image";
import Banner from "./components/Banner";
import Header from "./components/Header";
export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 font-sans">
      <Header />

      <div className="mx-auto max-w-5xl p-6">
        <Banner />
        <h1 className="mt-6 text-2xl font-semibold">Home Page</h1>
        <p className="mt-2 text-sm text-slate-600">
          Đây là nội dung của trang chính.
        </p>
      </div>
    </main>
  );
}