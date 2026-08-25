import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCT_THEMES } from "../productThemes";
import { ModalVisual } from "./ProductVisuals";
import "./ProductModal.css";

const MODAL_DATA = {
  1: {
    headline: "8 Servers. 4 Continents. Total Privacy.",
    about: "BYPASS365 VPN is built for Windows and Android with military-grade encryption. Connect across 8 global servers spanning 4 continents — your identity stays hidden, your freedom stays unlimited.",
    highlights: [
      { icon: "🌍", title: "8 Servers • 4 Continents", desc: "Fast, reliable servers across four continents worldwide." },
      { icon: "💻", title: "Windows App",                desc: "Full-featured desktop client built for Windows PCs." },
      { icon: "📱", title: "Android App",                desc: "Lightweight Android app — connect with one tap." },
      { icon: "🔒", title: "AES-256 Encryption",         desc: "Same standard used by governments and banks worldwide." },
      { icon: "📵", title: "Strict Zero Logs",             desc: "We never store, track, or share your activity. Ever." },
      { icon: "⚡", title: "WireGuard Protocol",           desc: "Blazing-fast tunnels with iron-clad security." },
    ],
    stats: [["8", "Servers"], ["4", "Continents"], ["Windows", "& Android"], ["0", "Logs Stored"]],
    plans: [
      { name: "Monthly", price: "₹299", per: "/mo", badge: "" },
      { name: "Annual",  price: "₹199", per: "/mo", badge: "Best Value" },
      { name: "2-Year",  price: "₹149", per: "/mo", badge: "Save 50%" },
    ],
  },
};

export default function ProductModal({ product, onClose }) {
  const data  = MODAL_DATA[product?.id];
  const theme = PRODUCT_THEMES[product?.id];
  const isLight = theme?.mode === "light";

  useEffect(() => {
    if (product) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  if (!product || !data || !theme) {
    return (
      <AnimatePresence>
        {null}
      </AnimatePresence>
    );
  }

  const btnTextColor = isLight ? "#fff" : "#000";
  const planBtnInactiveColor = isLight ? theme.accent : theme.accent;

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            className="pm__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.div
            className={`pm__panel${isLight ? " pm__panel--light" : ""}`}
            style={{ background: theme.bg }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pm__orb pm__orb--1" style={{ background: theme.orb1 }} />
            <div className="pm__orb pm__orb--2" style={{ background: theme.orb2 }} />

            <button className={`pm__close${isLight ? " pm__close--light" : ""}`} onClick={onClose} aria-label="Close">✕</button>

            <div className="pm__scroll">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <ModalVisual id={product.id} accent={theme.accent} accent2={theme.accent2} accent3={theme.accent3} />
              </motion.div>

              <div className="pm__hero">
                <div>
                  <div
                    className="pm__eyebrow"
                    style={{ color: theme.accent, borderColor: theme.accent + "44", background: theme.accent + (isLight ? "14" : "12") }}
                  >
                    {product.emoji} {product.name}
                  </div>
                  <h2
                    className="pm__headline"
                    style={{
                      WebkitTextFillColor: "transparent",
                      background: theme.headlineGradient,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    {data.headline}
                  </h2>
                  <p className="pm__about">{data.about}</p>
                </div>

                <div className="pm__stats">
                  {data.stats.map(([num, label], i) => (
                    <div
                      key={i}
                      className="pm__stat"
                      style={{
                        borderColor: theme.accent + "33",
                        background: isLight ? "rgba(255,255,255,0.75)" : theme.accent + "08",
                      }}
                    >
                      <span className="pm__stat-num" style={{ color: theme.accent }}>{num}</span>
                      <span className="pm__stat-label">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pm__divider" style={{ background: `linear-gradient(90deg, ${theme.accent}, transparent)` }} />

              <h3 className="pm__section-title">What's Included</h3>
              <div className="pm__grid">
                {data.highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    className="pm__card"
                    style={{
                      borderColor: theme.accent + "22",
                      background: isLight ? "rgba(255,255,255,0.8)" : theme.accent + "06",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    <span className="pm__card-icon" style={{ background: theme.accent + "18" }}>{h.icon}</span>
                    <div>
                      <p className="pm__card-title" style={{ color: theme.accent }}>{h.title}</p>
                      <p className="pm__card-desc">{h.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pm__divider" style={{ background: `linear-gradient(90deg, ${theme.accent}, transparent)` }} />

              <h3 className="pm__section-title">Choose Your Plan</h3>
              <div className="pm__plans">
                {data.plans.map((plan, i) => (
                  <motion.div
                    key={i}
                    className={"pm__plan" + (plan.badge === "Best Value" || plan.badge === "Most Popular" || plan.badge === "Windows & Android" ? " pm__plan--featured" : "")}
                    style={{
                      borderColor: plan.badge ? theme.accent + "66" : theme.accent + "22",
                      background: plan.badge
                        ? theme.accent + (isLight ? "18" : "10")
                        : isLight ? "rgba(255,255,255,0.7)" : theme.accent + "05",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                  >
                    {plan.badge && (
                      <span className="pm__plan-badge" style={{ background: theme.accent, color: btnTextColor }}>{plan.badge}</span>
                    )}
                    <p className="pm__plan-name">{plan.name}</p>
                    <div className="pm__plan-price">
                      <span className="pm__plan-num" style={{ color: theme.accent }}>{plan.price}</span>
                      <span className="pm__plan-per">{plan.per}</span>
                    </div>
                    <button
                      className="pm__plan-btn"
                      style={{
                        background: plan.badge ? theme.btnGradient : "transparent",
                        borderColor: theme.accent + "66",
                        color: plan.badge ? btnTextColor : planBtnInactiveColor,
                      }}
                    >
                      Get Started
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
