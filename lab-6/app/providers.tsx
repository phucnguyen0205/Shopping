"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthContextValue = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(saved === "true");
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    return {
      isLoggedIn,
      login: () => {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
      },
      logout: () => {
        localStorage.setItem("isLoggedIn", "false");
        setIsLoggedIn(false);
      },
    };
  }, [isLoggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
