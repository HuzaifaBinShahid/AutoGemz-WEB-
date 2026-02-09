"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Icon from "./Icon";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        aria-label="Toggle theme"
      >
        <Icon name="moon" size={20} />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
      aria-label="Toggle theme"
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} size={20} />
    </button>
  );
}

