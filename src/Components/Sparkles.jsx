/**
 * Sparkles component
 *
 * Overlay of twinkling star particles for a magical feel. Positions and
 * timings are randomized once per mount. Purely decorative.
 */
import React from "react";
import PropTypes from "prop-types";

const Sparkles = ({ count }) => {
  const sparkles = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        fontSize: `${0.5 + Math.random() * 1.1}rem`,
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: `${2.5 + Math.random() * 3}s`,
      })),
    [count]
  );

  return (
    <div className="sparkles" aria-hidden="true">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle"
          style={{
            left: s.left,
            top: s.top,
            fontSize: s.fontSize,
            animationDelay: s.animationDelay,
            animationDuration: s.animationDuration,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
};

Sparkles.defaultProps = {
  count: 18,
};

Sparkles.propTypes = {
  count: PropTypes.number,
};

export default Sparkles;
