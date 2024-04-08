"use client";

import React, { createContext, useState, useContext } from "react";

// Define a type for the context value
type ToggleContextType = {
  toggleTheme: () => void;
  theme: string;
};

// Create the context
const ToggleThemeContext = createContext<ToggleContextType | undefined>(
  undefined
);

// Custom hook to consume the context
export const useToggle = () => {
  const context = useContext(ToggleThemeContext);
  if (!context) {
    throw new Error("useToggle must be used within a ToggleThemeProvider");
  }
  return context;
};

// Component to provide the context
export const ToggleThemeProvider = ({ children }: { children: any }) => {
  const [theme, setTheme] = useState<string>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value: ToggleContextType = {
    toggleTheme,
    theme,
  };

  return (
    <ToggleThemeContext.Provider value={value}>
      {children}
    </ToggleThemeContext.Provider>
  );
};

// Export the context type
export type { ToggleContextType };
