/**
 * Theme context
 *
 * Provides the color mode selected by the user ("light", "dark" or "auto")
 * and the effective theme currently applied ("light" or "dark").
 * In "auto" mode the effective theme alternates on a fixed interval so the
 * site cycles between day and night.
 */
import React from "react";
import PropTypes from "prop-types";

const AUTO_INTERVAL_MS = 15000;

const ThemeContext = React.createContext({
  mode: "auto",
  theme: "light",
  setMode: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = React.useState(() => {
    const saved = window.localStorage.getItem("theme-mode");
    return saved === "light" || saved === "dark" || saved === "auto" ? saved : "auto";
  });
  const [autoTheme, setAutoTheme] = React.useState("light");

  React.useEffect(() => {
    window.localStorage.setItem("theme-mode", mode);
  }, [mode]);

  // In auto mode, alternate between light and dark on a fixed interval
  React.useEffect(() => {
    if (mode !== "auto") {
      return undefined;
    }
    const timer = setInterval(() => {
      setAutoTheme((prev) => (prev === "light" ? "dark" : "light"));
    }, AUTO_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [mode]);

  const theme = mode === "auto" ? autoTheme : mode;

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const value = React.useMemo(() => ({ mode, theme, setMode }), [mode, theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => React.useContext(ThemeContext);

export default ThemeContext;
