/**
 * Reveal component
 *
 * Wraps content so it appears with a magical fade/blur animation the first
 * time it scrolls into view. Use the "delay" prop (in ms) to stagger items.
 * Once the animation settles, the reveal classes are removed so they don't
 * interfere with hover transitions on the wrapped content.
 */
import React from "react";
import PropTypes from "prop-types";

const Reveal = ({ children, delay, className, style }) => {
  const ref = React.useRef(null);
  // "hidden" -> "revealing" (animating in) -> "done" (reveal styles removed)
  const [phase, setPhase] = React.useState("hidden");

  React.useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }
    if (typeof IntersectionObserver === "undefined") {
      setPhase("done");
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("revealing");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (phase !== "revealing") {
      return undefined;
    }
    const timer = setTimeout(() => setPhase("done"), delay + 1000);
    return () => clearTimeout(timer);
  }, [phase, delay]);

  const revealClass = phase === "done" ? "" : `reveal${phase === "revealing" ? " visible" : ""}`;
  const mergedClass = [revealClass, className].filter(Boolean).join(" ");

  return (
    <div
      ref={ref}
      className={mergedClass || undefined}
      style={phase === "done" ? style : { ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

Reveal.defaultProps = {
  delay: 0,
  className: "",
  style: undefined,
};

Reveal.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Reveal;
