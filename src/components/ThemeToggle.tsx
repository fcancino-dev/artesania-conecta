"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`px-2 py-2 rounded-full cursor-pointer  ${
        theme === "light"
          ? "text-slate-600 bg-orange-200 border-yellow- hover:bg-orange-200/70"
          : "bg-gray-700 border-gray-600 hover:bg-slate-600 text-white"
      }`}
    >
      {theme === "light" ? <Sun /> : <Moon />}
    </button>
  );
}
