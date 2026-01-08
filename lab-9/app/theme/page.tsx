"use client";

import ThemeToggle from "../../components/theme-toggle";

export default function ThemePage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Theme Test Page</h1>
      <ThemeToggle />
    </div>
  );
}
