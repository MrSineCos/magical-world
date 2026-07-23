/**
 * Home component
 *
 * The section at the top of the page to display image of your
 * choice, name and title that describes your career focus.
 */

import React from "react";
import arrowSvg from "../images/down-arrow.svg";
import PropTypes from "prop-types";

import Sparkles from "./Sparkles";
import ThemedBackground from "./ThemedBackground";

/**
 * Home background images
 *
 * The background follows the color mode: a day picture in light mode and
 * a night picture in dark mode, crossfading when the theme changes.
 */
import dayImage from "../images/first-pic.jpg";
import nightImage from "../images/fourth-pic.jpg";

const dayImageAltText = "a scenic view of a coastal town and castle on a sunny day";
const nightImageAltText = "a scenic view of a harbor and town at night";

const Home = ({ name, title }) => {
  return (
    <section id="home" className="min-height" style={{ position: "relative", overflow: "hidden" }}>
      <ThemedBackground
        dayImage={dayImage}
        dayAlt={dayImageAltText}
        nightImage={nightImage}
        nightAlt={nightImageAltText}
      />
      <Sparkles />
      <div style={{ position: "absolute", top: "5rem", left: "2rem", width: "19rem", zIndex: 2 }}>
        <h1 className="hero-name">{name}</h1>
        <h2 className="hero-title">{title}</h2>
      </div>
      <div style={{ position: "absolute", bottom: "3rem", left: "50%" }}>
        <a href="#about" aria-label="Scroll to About section">
          <img
            src={arrowSvg}
            className="down-arrow"
            style={{ height: "3rem", width: "3rem" }}
            alt="down arrow"
          />
        </a>
      </div>
    </section>
  );
};

Home.defaultProps = {
  name: "",
  title: "",
};

Home.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Home;
