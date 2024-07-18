// originally written by @imoaazahmed

import { useEffect, useMemo, useState } from "react";
// ThemeProps object defines the possible themes and the key for localStorage
const ThemeProps = {
  key: "theme",
  light: "light", // Light theme key
  dark: "dark", // Dark theme key
} as const;

type Theme = typeof ThemeProps.light | typeof ThemeProps.dark; // Type for theme, either light or dark

// Custom hook to manage theme state and functionality
export const useTheme = (defaultTheme?: Theme) => {
  // State hook for current theme, initialized from localStorage or default
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(ThemeProps.key) as Theme | null; // Retrieve theme from localStorage

    return storedTheme || (defaultTheme ?? ThemeProps.dark); // Use stored theme or default to dark theme
  });

  // Memoized boolean indicating if current theme is dark
  const isDark = useMemo(() => {
    return theme === ThemeProps.dark;
  }, [theme]);

  // Memoized boolean indicating if current theme is light
  const isLight = useMemo(() => {
    return theme === ThemeProps.light;
  }, [theme]);

  // Function to update theme state and apply changes
  const _setTheme = (theme: Theme) => {
    localStorage.setItem(ThemeProps.key, theme); // Save theme to localStorage
    document.documentElement.classList.remove(
      // Remove existing theme classes from root element
      ThemeProps.light,
      ThemeProps.dark
    );
    document.documentElement.classList.add(theme); // Add current theme class to root element
    setTheme(theme); // Update state with new theme
  };

  // Function to set light theme
  const setLightTheme = () => _setTheme(ThemeProps.light);

  // Function to set dark theme
  const setDarkTheme = () => _setTheme(ThemeProps.dark);

  // Function to toggle between light and dark themes
  const toggleTheme = () =>
    theme === ThemeProps.dark ? setLightTheme() : setDarkTheme();

  // Effect hook to apply theme changes on initial render and theme state changes
  useEffect(() => {
    _setTheme(theme);
  });

  // Return current theme state and theme manipulation functions
  return { theme, isDark, isLight, setLightTheme, setDarkTheme, toggleTheme };
};
