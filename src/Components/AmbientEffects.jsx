/**
 * AmbientEffects component
 *
 * Whole-site atmospheric layer, fixed to the viewport above every section:
 * drifting, blinking fireflies fade in for dark mode. Visibility is driven
 * entirely by the `data-theme` attribute set on <html> (see ThemeContext), so
 * this component needs no theme state of its own and crossfades smoothly
 * whenever the theme changes. Purely decorative.
 */
import React from "react";

const FIREFLY_COUNT = 22;

const AmbientEffects = () => {
  const fireflies = React.useMemo(
    () =>
      Array.from({ length: FIREFLY_COUNT }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 3 + Math.random() * 3,
        driftX: `${-50 + Math.random() * 100}px`,
        driftY: `${-70 + Math.random() * 50}px`,
        driftDuration: 7 + Math.random() * 7,
        driftDelay: Math.random() * -14,
        blinkDuration: 1.8 + Math.random() * 2.2,
        blinkDelay: Math.random() * -4,
      })),
    []
  );

  return (
    <div className="ambient-effects" aria-hidden="true">
      <div className="fireflies-layer">
        {fireflies.map((f) => (
          <span
            key={f.id}
            className="firefly"
            style={{
              left: f.left,
              top: f.top,
              width: `${f.size}px`,
              height: `${f.size}px`,
              "--drift-x": f.driftX,
              "--drift-y": f.driftY,
              animationDuration: `${f.driftDuration}s, ${f.blinkDuration}s`,
              animationDelay: `${f.driftDelay}s, ${f.blinkDelay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AmbientEffects;
