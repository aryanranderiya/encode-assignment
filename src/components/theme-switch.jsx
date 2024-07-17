import React, { useState, useEffect } from "react";
import { useSwitch } from "@nextui-org/switch";
import { useTheme } from "../hooks/use-theme";
import { Sun03Icon, Moon02Icon } from "./icons";

export const ThemeSwitch = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  const { Component, isSelected, getInputProps } = useSwitch({
    isSelected: theme === "dark",
    onChange: toggleTheme,
  });

  return (
    <Component className={`cursor-pointer ${className}`}>
      <input {...getInputProps()} hidden />
      {isSelected ? <Moon02Icon size={22} /> : <Sun03Icon size={22} />}
    </Component>
  );
};
