"use client";

import { Provider, useSelector } from "react-redux";
import { store } from "../redux/store";

export default function MainLayout({ children }) {
  return (
    <Provider store={store}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </Provider>
  );
}

function ThemeWrapper({ children }) {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
        {children}
      </div>
    </div>
  );
}
