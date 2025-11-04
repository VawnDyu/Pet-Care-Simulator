import { useState, useEffect } from "react";
import { THEME_COLORS } from "../constants/gameConfig";

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