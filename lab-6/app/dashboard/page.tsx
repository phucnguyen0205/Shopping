"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { lazy, Suspense } from "react";

const DashboardLarge = dynamic(() => import("@/components/dashboard-large"), {
  loading: () => <p>Loading...</p>,
  ssr: false, 
});
export default function DashboardPage() {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  useEffect(() => {
    if (!isLoggedIn) router.replace("/auth/login");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return <p className="p-6">Bạn chưa đăng nhập, đang chuyển về /login...</p>;
  }
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Bạn đã đăng nhập nên mới xem được trang này.</p>

      <Button
        onClick={() => {
          logout();
          router.push("/login");
        }}
      >
        Đăng xuất
      </Button>

      <Suspense fallback={<p>Loading...</p>}>
      <DashboardLarge />
    </Suspense>
    </div>
  );
}
