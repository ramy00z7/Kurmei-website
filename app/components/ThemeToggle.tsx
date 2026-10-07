"use client";
import { useEffect, useState } from "react";
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  useEffect(() => { setTheme((document.documentElement.getAttribute("data-theme") as "light" | "dark") || "dark"); }, []);
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("kurmei-theme", next);
    setTheme(next);
  };
  return <button className="theme-toggle" onClick={toggle} aria-label="Toggle dark or light mode" title="Toggle dark or light mode">
    {theme === "light" ? "☾" : "☀"}
  </button>;
}
