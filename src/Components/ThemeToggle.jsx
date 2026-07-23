/**
 * ThemeToggle component
 *
 * Segmented control to switch between light, dark and auto color modes.
 * In auto mode the site alternates between day and night every 15 seconds.
 */
import React from "react";

import { useTheme } from "../ThemeContext";

const options = [
  { value: "light", label: "☀️", title: "Light mode" },
  { value: "dark", label: "🌙", title: "Dark mode" },
  { value: "auto", label: "✨", title: "Auto mode (alternates every 15s)" },
];

const ThemeToggle = () => {
  const { mode, setMode } = useTheme();

  return (
    <div className="theme-toggle" role="group" aria-label="Color mode">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          title={option.title}
          aria-pressed={mode === option.value}
          className={mode === option.value ? "active" : ""}
          onClick={() => setMode(option.value)}
        >
          {option.label}
          {option.value === "auto" && <span className="theme-toggle-label">Auto</span>}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
