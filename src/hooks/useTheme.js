import { useState, useEffect } from "react";

const THEME_COLORS = {
  default: {
    happy: "#ffe1ed",
    neutral: "#f8f9ff",
    tired: "#d8d5f8",
    sick: "#e8f5e9",
  },
  theme_sunset: {
    happy: "#ffe4b5",
    neutral: "#ffd4a3",
    tired: "#ffb88c",
    sick: "#ffd9b3",
  },
  theme_ocean: {
    happy: "#b3e5fc",
    neutral: "#e1f5fe",
    tired: "#81d4fa",
    sick: "#b2ebf2",
  },
  theme_forest: {
    happy: "#c8e6c9",
    neutral: "#e8f5e9",
    tired: "#a5d6a7",
    sick: "#dcedc8",
  },
};

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState("default");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    console.log("🎨 Loading theme from localStorage...");
    const saved = localStorage.getItem("currentTheme");
    if (saved && THEME_COLORS[saved]) {
      console.log("✅ Loaded theme:", saved);
      setCurrentTheme(saved);
    } else {
      console.log("⚠️ No saved theme, using default");
    }
    setIsLoaded(true);
  }, []);

  // Save theme to localStorage (only after loaded)
  useEffect(() => {
    if (isLoaded) {
      console.log("💾 Saving theme:", currentTheme);
      localStorage.setItem("currentTheme", currentTheme);
    }
  }, [currentTheme, isLoaded]);

  const getThemeColor = (mood) => {
    return THEME_COLORS[currentTheme]?.[mood] || THEME_COLORS.default[mood];
  };

  return {
    currentTheme,
    setCurrentTheme,
    getThemeColor,
  };
}