/**
 * ThemedBackground component
 *
 * Renders a section background image that depends on the active theme:
 * the day picture in light mode and the night picture in dark mode.
 * Both images stay mounted and crossfade when the theme changes.
 */
import React from "react";
import PropTypes from "prop-types";

import { useTheme } from "../ThemeContext";

const ThemedBackground = ({ dayImage, dayAlt, nightImage, nightAlt }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const fade = { transition: "opacity 0.8s ease" };

  return (
    <>
      <img
        className="background"
        src={dayImage}
        alt={dayAlt}
        aria-hidden={isDark}
        style={{ ...fade, opacity: isDark ? 0 : 1 }}
      />
      <img
        className="background"
        src={nightImage}
        alt={nightAlt}
        aria-hidden={!isDark}
        style={{ ...fade, opacity: isDark ? 1 : 0 }}
      />
    </>
  );
};

ThemedBackground.defaultProps = {
  dayAlt: "",
  nightAlt: "",
};

ThemedBackground.propTypes = {
  dayImage: PropTypes.string.isRequired,
  dayAlt: PropTypes.string,
  nightImage: PropTypes.string.isRequired,
  nightAlt: PropTypes.string,
};

export default ThemedBackground;
