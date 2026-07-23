/**
 * HoverSparkles component
 *
 * Global overlay that emits small colorful glitter particles at the cursor
 * position while the mouse moves over text content (headings, paragraphs,
 * list items, links). Particles are created imperatively and removed when
 * their animation ends, so React state is not involved. Purely decorative.
 */
import React from "react";

const COLORS = ["#ffd76a", "#ff9ecb", "#8be9fd", "#b39dff", "#7bf1a8"];

const TEXT_SELECTOR = "h1, h2, h3, p, li, .nav-link, .theme-toggle button";

const SPAWN_INTERVAL_MS = 60;

const HoverSparkles = () => {
  const layerRef = React.useRef(null);
  const lastSpawn = React.useRef(0);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const layer = layerRef.current;

    const spawn = (x, y) => {
      for (let i = 0; i < 5; i += 1) {
        const particle = document.createElement("span");
        const isStar = Math.random() < 0.35;
        particle.className = `hover-sparkle${isStar ? " star" : ""}`;
        if (isStar) {
          particle.textContent = "✦";
          particle.style.fontSize = `${0.8 + Math.random() * 0.5}rem`;
        } else {
          const size = 5 + Math.random() * 5;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
        }
        const angle = Math.random() * 2 * Math.PI;
        const distance = 22 + Math.random() * 38;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        particle.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
        particle.style.setProperty("--dy", `${Math.sin(angle) * distance - 14}px`);
        particle.style.animationDuration = `${700 + Math.random() * 500}ms`;
        particle.addEventListener("animationend", () => particle.remove());
        layer.appendChild(particle);
      }
    };

    const onMouseMove = (event) => {
      const now = performance.now();
      if (now - lastSpawn.current < SPAWN_INTERVAL_MS) {
        return;
      }
      if (!(event.target instanceof Element) || !event.target.closest(TEXT_SELECTOR)) {
        return;
      }
      lastSpawn.current = now;
      spawn(event.clientX, event.clientY);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, []);

  return <div ref={layerRef} className="hover-sparkles-layer" aria-hidden="true" />;
};

export default HoverSparkles;
