/**
 * About component
 *
 * Space for you to describe more about yourself.
 */

import React from "react";

import Reveal from "./Reveal";
import ThemedBackground from "./ThemedBackground";

/**
 * About background images
 *
 * The background follows the color mode: a day picture in light mode and
 * a night picture in dark mode, crossfading when the theme changes.
 */
import dayImage from "../images/fifth-pic.png";
import nightImage from "../images/second-pic.jpg";

const dayImageAltText = "a medieval town market street decorated with banners on a sunny day";
const nightImageAltText = "a scenic view of a street at night during the festive season";

/**
 * Sort description that expands on your title on the Home component.
 */
const description =
  "I'm a Embedded programming student studying at Ho Chi Minh University of Technology. I enjoy learning about microcontrollers and developing embedded systems, making devices smarter and more efficient.";

/**
 * List of some of skills or technologies you work on, are learning,
 * passionate about, or enjoy,
 */
const skillsList = [
  "Embedded C",
  "C++",
  "MicroPython",
  "Arduino",
  "ESP32/ESP8266",
  "STM32",
  "IoT Development",
  "PCB Design",
  "Git & GitHub",
];

/**
 * Use this to give more information about what you are passionate about,
 * how you best work, or even a quote. This will help someone learn more
 * about you on a professional level.
 */
const detailOrQuote =
  "I am passionate about creating innovative embedded systems that enhance everyday life. I thrive in collaborative environments where I can contribute my skills and learn from others. As Albert Einstein once said, 'Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution.'";

const About = () => {
  return (
    <section className="padding" id="about">
      <ThemedBackground
        dayImage={dayImage}
        dayAlt={dayImageAltText}
        nightImage={nightImage}
        nightAlt={nightImageAltText}
      />
      <Reveal className="glass-card">
        <h2 className="section-title">About Myself</h2>
        <p className="large">{description}</p>
        <hr />
        <ul
          className="skills-list"
          style={{
            textAlign: "left",
            columns: 2,
            fontSize: "1.25rem",
            margin: "2rem 3rem",
            gap: "3rem",
          }}
        >
          {skillsList.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <hr />
        <p style={{ padding: "1rem 3rem 0" }}>{detailOrQuote}</p>
      </Reveal>
    </section>
  );
};

export default About;
