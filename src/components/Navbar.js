import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND_LOGO } from "../data";
import { scrollToSection, scrollToProductIndex } from "../utils/scrollToSection";
import "./Navbar.css";

const links = ["Home", "Features", "Servers", "Products"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const goTo = (label) => {
    if (label === "Products") scrollToProductIndex(0);
    else scrollToSection(label);
    setMenuOpen(false);
  };

  return (
    <motion.nav
      className={"navbar" + (scrolled ? " navbar--scrolled" : "")}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbar__inner">
        <div
          className="navbar__brand"
          onClick={() => scrollToSection("home")}
          onKeyDown={(e) => e.key === "Enter" && scrollToSection("home")}
          role="button"
          tabIndex={0}
        >
          <img src={BRAND_LOGO} alt="BYPASS365" className="navbar__brand-logo" />
        </div>

        <ul className="navbar__links">
          {links.map(l => (
            <li key={l}>
              <button type="button" className="navbar__link" onClick={() => goTo(l)}>
                <span>{l}</span>
                <div className="navbar__link-line" />
              </button>
            </li>
          ))}
        </ul>

        <button className="navbar__ham" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
          <span className={menuOpen ? "ham-line open-1" : "ham-line"} />
          <span className={menuOpen ? "ham-line open-2" : "ham-line"} />
          <span className={menuOpen ? "ham-line open-3" : "ham-line"} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{   opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map(l => (
              <div key={l} className="navbar__mobile-link" onClick={() => goTo(l)}>{l}</div>
            ))}

          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
