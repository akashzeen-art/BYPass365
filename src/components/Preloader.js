import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND_LOGO } from "../data";
import "./Preloader.css";

const STEPS = [
  { text: "Initializing BYPASS365...",      icon: "🔒", progress: 15  },
  { text: "Establishing Tunnel...",         icon: "🌐", progress: 35  },
  { text: "Applying AES-256 Encryption...", icon: "🔐", progress: 55  },
  { text: "Masking Your IP Address...",     icon: "🛡️", progress: 75  },
  { text: "Connection Secured!",            icon: "✅", progress: 100 },
];

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  dur: Math.random() * 4 + 3,
  delay: Math.random() * 3,
}));

const BINARY = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  val: Math.random() > 0.5 ? "1" : "0",
  dur: Math.random() * 2 + 1,
  delay: Math.random() * 3,
  opacity: Math.random() * 0.3 + 0.05,
}));

export default function Preloader({ onDone }) {
  const [stepIdx,  setStepIdx]  = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting,  setExiting]  = useState(false);
  const [dots,     setDots]     = useState("");

  useEffect(() => {
    if (stepIdx >= STEPS.length - 1) return;
    const t = setTimeout(() => setStepIdx(i => i + 1), 900);
    return () => clearTimeout(t);
  }, [stepIdx]);

  useEffect(() => {
    const target = STEPS[stepIdx].progress;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= target) { clearInterval(interval); return target; }
        return p + 1;
      });
    }, 18);
    return () => clearInterval(interval);
  }, [stepIdx]);

  useEffect(() => {
    const t = setInterval(() => setDots(d => d.length >= 3 ? "" : d + "."), 400);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setExiting(true);
      document.body.style.overflow = "";
      setTimeout(onDone, 800);
    }, 5000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* background orbs */}
          <div className="pre__orb pre__orb--1" />
          <div className="pre__orb pre__orb--2" />
          <div className="pre__orb pre__orb--3" />

          {/* grid */}
          <div className="pre__grid" />

          {/* binary rain */}
          <div className="pre__binary" aria-hidden>
            {BINARY.map(b => (
              <span
                key={b.id}
                className="pre__binary-char"
                style={{
                  left: b.x + "%",
                  animationDuration: b.dur + "s",
                  animationDelay: b.delay + "s",
                  opacity: b.opacity,
                }}
              >
                {b.val}
              </span>
            ))}
          </div>

          {/* particles */}
          <div className="pre__particles" aria-hidden>
            {PARTICLES.map(p => (
              <span
                key={p.id}
                className="pre__particle"
                style={{
                  left: p.x + "%",
                  top: p.y + "%",
                  width: p.size + "px",
                  height: p.size + "px",
                  animationDuration: p.dur + "s",
                  animationDelay: p.delay + "s",
                }}
              />
            ))}
          </div>

          {/* center content */}
          <div className="pre__center">

            {/* shield animation */}
            <div className="pre__shield-wrap">
              <motion.div
                className="pre__ring pre__ring--outer"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="pre__ring pre__ring--mid"
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="pre__pulse"
                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="pre__pulse pre__pulse--2"
                animate={{ scale: [1, 2.4, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
              />
              <motion.div
                className="pre__shield-icon"
                animate={{
                  scale: [1, 1.08, 1],
                  filter: [
                    "drop-shadow(0 0 12px #00d4ff)",
                    "drop-shadow(0 0 36px #00d4ff)",
                    "drop-shadow(0 0 12px #00d4ff)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <img src={BRAND_LOGO} alt="BYPASS365" className="pre__shield-logo" />
              </motion.div>
            </div>
            <motion.p
              className="pre__tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Military-Grade VPN Protection
            </motion.p>

            {/* step status */}
            <AnimatePresence mode="wait">
              <motion.div
                key={stepIdx}
                className="pre__step"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <span className="pre__step-icon">{STEPS[stepIdx].icon}</span>
                <span className="pre__step-text">
                  {STEPS[stepIdx].text}{stepIdx < STEPS.length - 1 ? dots : ""}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* progress bar */}
            <div className="pre__bar-wrap">
              <div className="pre__bar-track">
                <div className="pre__bar-fill" style={{ width: progress + "%" }} />
                <div className="pre__bar-tip" style={{ left: `calc(${progress}% - 6px)` }} />
              </div>
              <div className="pre__bar-labels">
                <span className="pre__bar-pct">{progress}%</span>
                <span className="pre__bar-enc">AES-256</span>
              </div>
            </div>

            {/* security badges */}
            <motion.div
              className="pre__badges"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {["Zero Logs", "Kill Switch", "DNS Leak Protection"].map((b, i) => (
                <motion.span
                  key={b}
                  className="pre__badge"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.15 }}
                >
                  ✓ {b}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* bottom ticker */}
          <div className="pre__ticker">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="pre__ticker-item">
                🔒 AES-256 &nbsp;·&nbsp; 🛡️ WireGuard &nbsp;·&nbsp; 🔐 Zero Logs &nbsp;·&nbsp; ⚡ Kill Switch &nbsp;·&nbsp;
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
