/**
 * Application component
 *
 * To contain application wide settings, routes, state, etc.
 */

import React from "react";

import About from "./Components/About";
import AmbientEffects from "./Components/AmbientEffects";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HoverSparkles from "./Components/HoverSparkles";
import Home from "./Components/Home";
import Portfolio from "./Components/Portfolio";
import SangTao from "./Components/SangTao";
import { ThemeProvider } from "./ThemeContext";

import "./styles.css";

/**
 * This object represents your information. The project is set so that you
 * only need to update these here, and values are passed a properties to the
 * components that need that information.
 *
 * Update the values below with your information.
 *
 * If you don't have one of the social sites listed, leave it as an empty string.
 */
const siteProps = {
  name: "Nguyễn Công Vũ",
  title: "Creator and Developer",
  email: "sinecoswifi@gmail.com",
  gitHub: "https://github.com/MrSineCos",
  linkedIn: "https://www.linkedin.com/in/nguy%E1%BB%85n-c%C3%B4ng-v%C5%A9-055579312/",
  youTube: "WorldofSinecos",
};

const primaryColor = "var(--footer-bg)";
const secondaryColor = "#D2F1E4";

const App = () => {
  return (
    <ThemeProvider>
      <div id="main">
        <HoverSparkles />
        <AmbientEffects />
        <Header />
        <Home name={siteProps.name} title={siteProps.title} />
        <About />
        {/* <Education /> */}
        <Portfolio />
        <SangTao /> {/* Added 'Sáng tạo' section */}
        <Footer {...siteProps} primaryColor={primaryColor} secondaryColor={secondaryColor} />
      </div>
    </ThemeProvider>
  );
};

export default App;
