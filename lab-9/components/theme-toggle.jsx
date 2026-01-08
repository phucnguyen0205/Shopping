"use client";

import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../app/redux/theme-slice";

export default function ThemeToggle() {
  const theme = useSelector((s) => s.theme.theme);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="px-4 py-2 rounded bg-blue-600 text-white"
    >
      Toggle theme (current: {theme})
    </button>
  );
}
