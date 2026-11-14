/** Theme toggle hook - integrates with next-themes */
"use client";

import {useState, useEffect, useCallback} from "react";
import {useTheme} from "next-themes";

export function useThemeToggle() {
  const {theme, setTheme, systemTheme} = useTheme();
  const [isDark, setIsDark] = useState(() => systemTheme === "dark");

  useEffect(() => {
    setIsDark(systemTheme === "dark");
  }, [systemTheme]);

  useEffect(() => {
    if (theme !== systemTheme && systemTheme) {
      setTheme(systemTheme);
    }
  }, [theme, systemTheme]);

  const toggleTheme = useCallback(() => {
    setTheme(isDark ? "light" : "dark");
    setIsDark(!isDark);
  }, [isDark]);

  return {
    theme,
    isDark,
    toggleTheme,
  };
}