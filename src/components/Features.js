import React from "react";
import { motion } from "framer-motion";
import "./Features.css";

const FEATURES = [
  { icon: "🔐", title: "AES-256 Encryption",   desc: "Military-grade encryption used by governments and intelligence agencies worldwide.", color: "#00d4ff", stat: "256-bit" },
  { icon: "🌍", title: "8 Servers • 4 Continents", desc: "Blazing-fast servers across 4 continents. Available on Windows and Android.", color: "#a855f7", stat: "8 Servers" },
  { icon: "📵", title: "Strict Zero Logs",      desc: "We never track, store, or share your browsing activity. Audited and verified.",    color: "#ec4899", stat: "0 Logs" },
];

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="features__orb" />
      <div className="features__orb features__orb--2" />

      <div className="features__ticker" aria-hidden>
        {[0, 1].map(n => (
          <span key={n} className="features__ticker-item">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i}>
                🔒 AES-256 &nbsp;&middot;&nbsp; 🛡️ WireGuard &nbsp;&middot;&nbsp; 🔐 Zero Logs &nbsp;&middot;&nbsp; ⚡ Kill Switch &nbsp;&middot;&nbsp;
              </span>
            ))}
          </span>
        ))}
      </div>

      <div className="features__inner">
        <motion.div
          className="features__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="features__eyebrow">🔒 BYPASS365 Security</span>
          <h2 className="features__title">Engineered for <span className="glow-text">Total Privacy.</span></h2>
          <p className="features__sub">Every layer of BYPASS365 is built to keep your identity, data, and location completely private.</p>

          <div className="features__live-bar">
            <div className="features__live-item">
              <div className="features__live-dot" />
              <span>Live Connections: <strong>50,241,892</strong></span>
            </div>
            <div className="features__live-item">
              <span>Status: <strong className="features__live-enc">Protected ✓</strong></span>
            </div>
          </div>
        </motion.div>

        <div className="features__grid">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              className="features__card glass"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className="features__card-icon" style={{ background: f.color + "18", color: f.color }}>
                {f.icon}
              </div>
              <h3 className="features__card-title">{f.title}</h3>
              <p className="features__card-desc">{f.desc}</p>
              <div className="features__card-stat" style={{ color: f.color, borderColor: f.color + "40" }}>
                {f.stat}
              </div>
              <div className="features__card-line" style={{ background: f.color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
