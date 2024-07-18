import React from "react";
import { useSwitch } from "@nextui-org/switch";
import { useTheme } from "../hooks/use-theme";
import { Sun03Icon, Moon02Icon } from "./icons";

export const ThemeSwitch = ({ className }) => {
  // Get the current theme and toggle function from useTheme hook
  const { theme, toggleTheme } = useTheme();

  // Use the useSwitch hook to handle the switch functionality
  const { Component, isSelected, getInputProps } = useSwitch({
    isSelected: theme === "dark", // Set isSelected based on the current theme
    onChange: toggleTheme, // Set the onChange function to toggleTheme
  });

  return (
    <Component className={`cursor-pointer ${className}`}>
      <input {...getInputProps()} hidden /> {/* Hidden input element */}
      {isSelected ? <Moon02Icon size={22} color="primary" /> : <Sun03Icon size={22} color="primary" />} {/* Display the appropriate icon based on the isSelected value */}
    </Component>
  );
};
