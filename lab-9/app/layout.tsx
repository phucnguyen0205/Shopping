"use client";

import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import "./globals.css";
import Link from "next/link";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const theme = useSelector((state: any) => state.theme.theme);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
        {children}
      </div>
    </div>
  );
}

function Nav() {
  return (
    <nav className="p-4 flex gap-6 bg-gray-200 dark:bg-gray-800">
      <Link href="/">Home</Link>
      <Link href="/theme">Theme</Link>
      <Link href="/login">Login</Link>
      <Link href="/profile">Profile</Link>
    </nav>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Provider store={store}>
          <ThemeWrapper>
            <Nav />
            {children}
          </ThemeWrapper>
        </Provider>
      </body>
    </html>
  );
}
