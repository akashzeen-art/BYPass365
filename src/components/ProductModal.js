import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCT_THEMES } from "../productThemes";
import { ModalVisual } from "./ProductVisuals";
import "./ProductModal.css";

gsap.registerPlugin(ScrollTrigger);

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
  },
};

function enableMobileNormalizeScroll() {
  if (window.matchMedia("(max-width: 640px)").matches) {
    ScrollTrigger.normalizeScroll({
      allowNestedScroll: true,
      lockAxis: false,
      type: "touch,wheel,pointer",
    });
  }
}

export default function ProductModal({ product, onClose }) {
  const data  = MODAL_DATA[product?.id];
  const theme = PRODUCT_THEMES[product?.id];
  const isLight = theme?.mode === "light";
  const panelRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!product) return;

    // GSAP normalizeScroll blocks touch inside overlays — disable while modal is open
    ScrollTrigger.normalizeScroll(false);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      enableMobileNormalizeScroll();
    };
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
            ref={panelRef}
            className={`pm__panel${isLight ? " pm__panel--light" : ""}`}
            style={{ background: theme.bg }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => {
              // iOS: transform on parent breaks overflow scroll — clear after open
              const el = panelRef.current;
              if (el && product) {
                el.style.transform = "none";
              }
              if (scrollRef.current) {
                scrollRef.current.scrollTop = 0;
              }
            }}
          >
            <div className="pm__orb pm__orb--1" style={{ background: theme.orb1 }} />
            <div className="pm__orb pm__orb--2" style={{ background: theme.orb2 }} />

            <button className={`pm__close${isLight ? " pm__close--light" : ""}`} onClick={onClose} aria-label="Close">✕</button>

            <div className="pm__scroll" ref={scrollRef}>
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
