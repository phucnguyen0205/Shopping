"use client";

import LoginForm from "./LoginForm"; 
import ProductListing from './ProductListing';

function App() {
  return (
    <ProductListing />
  );
}
export default function LoginPage() {
  const handleLogin = (data: {
    usernameOrEmail: string;
    password: string;
    rememberMe: boolean;
  }) => {
    console.log("Dữ liệu đăng nhập:", data);
  };

  return <LoginForm onSubmit={handleLogin} />;
}
