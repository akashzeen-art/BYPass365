import React from "react";
import { motion } from "framer-motion";
import { scrollToProductIndex } from "../utils/scrollToSection";
import "./Hero.css";

const VPN_LOCATIONS = [
  { label: "New York",  top: "28%", left: "22%", color: "#00d4ff", flag: "🇺🇸" },
  { label: "London",    top: "22%", left: "48%", color: "#a855f7", flag: "🇬🇧" },
  { label: "Tokyo",     top: "35%", left: "78%", color: "#ec4899", flag: "🇯🇵" },
  { label: "Sydney",    top: "68%", left: "82%", color: "#10b981", flag: "🇦🇺" },
  { label: "São Paulo", top: "62%", left: "28%", color: "#f59e0b", flag: "🇧🇷" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__grid" aria-hidden />

      <div className="hero__content">
        <div className="hero__text">
          <motion.div className="hero__eyebrow" {...fadeUp(0.1)}>
            <span className="hero__eyebrow-dot" />
            🔒 #1 VPN · Trusted by 50M+ Users
          </motion.div>

          <motion.h1 className="hero__headline" {...fadeUp(0.25)}>
            Browse Anonymously.<br />
            <span className="glow-text">Stay Invisible.</span>
          </motion.h1>

          <motion.p className="hero__sub" {...fadeUp(0.35)}>
            Military-grade <strong>AES-256 encryption</strong>. <strong>8 servers</strong> across <strong>4 continents</strong>.
            <strong> Zero logs</strong>. Available on <strong>Windows & Android</strong>.
          </motion.p>

          <motion.div className="hero__actions" {...fadeUp(0.45)}>
            <button
              type="button"
              className="hero__btn-primary"
              onClick={() => scrollToProductIndex(0)}
            >
              <span>🔒 Get Protected Now</span>
              <span className="hero__btn-arrow">→</span>
            </button>
          </motion.div>

          <motion.div className="hero__stats" {...fadeUp(0.55)}>
            <div className="hero__stat"><span className="hero__stat-num">50M+</span><span className="hero__stat-label">Protected Users</span></div>
            <div className="hero__stat"><span className="hero__stat-num">99.9%</span><span className="hero__stat-label">Uptime</span></div>
            <div className="hero__stat"><span className="hero__stat-num">8</span><span className="hero__stat-label">VPN Servers</span></div>
            <div className="hero__stat"><span className="hero__stat-num">4</span><span className="hero__stat-label">Continents</span></div>
            <div className="hero__stat"><span className="hero__stat-num">AES-256</span><span className="hero__stat-label">🔐 Encryption</span></div>
          </motion.div>

          <motion.div className="hero__badges" {...fadeUp(0.65)}>
            {["Zero Logs", "Kill Switch", "DNS Leak Protection"].map(b => (
              <span key={b} className="hero__badge">✓ {b}</span>
            ))}
          </motion.div>
        </div>

        {/* Phone mockup — CSS float animation only */}
        <motion.div
          className="hero__phone-wrap"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <div className="hero__phone-glow" />
          <div className="hero__phone hero__phone--float">
            <div className="phone__notch" />
            <div className="phone__screen">
              <div className="phone__map">
                <div className="phone__map-grid" />
                {VPN_LOCATIONS.map((d) => (
                  <div
                    key={d.label}
                    className="phone__dot"
                    style={{ top: d.top, left: d.left, background: d.color }}
                  >
                    <span className="phone__dot-flag">{d.flag}</span>
                  </div>
                ))}
                <div className="phone__hub">
                  <span className="phone__hub-icon">🔒</span>
                </div>
              </div>
              <div className="phone__status">
                <div className="phone__status-dot" />
                <span>🔐 Encrypted · New York</span>
                <span className="phone__status-speed">↑ 94 Mbps</span>
              </div>
              <div className="phone__connect"><span>🔒</span></div>
            </div>
          </div>

          {VPN_LOCATIONS.slice(0, 3).map((d, i) => (
            <div
              key={i}
              className="hero__float-badge glass"
              style={{ animationDelay: `${i * 0.8}s` }}
            >
              <span className="hero__float-dot" style={{ background: d.color }}>{d.flag}</span>
              {d.label}
              <span className="hero__float-ping">{12 + i * 5}ms</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
