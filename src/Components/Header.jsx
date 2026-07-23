/**
 * Header component
 *
 * Top navigation bar for your site. Set to remain visible as the
 * user scrolls so that they can constantly reach any part of your page.
 */
import React from "react";

import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#footer", label: "Contact" },
  { href: "#sangtao", label: "Creations" }, // Added new section
];

const Header = () => {
  return (
    <nav className="site-header">
      <div className="nav-links">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="nav-link">
            {link.label}
          </a>
        ))}
      </div>
      <ThemeToggle />
    </nav>
  );
};

export default Header;
