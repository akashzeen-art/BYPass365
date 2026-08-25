import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Products.css";
import { products } from "../data";
import { PRODUCT_THEMES, PRODUCT_EXTRA } from "../productThemes";
import { PanelVisual } from "./ProductVisuals";

gsap.registerPlugin(ScrollTrigger);

function getViewportHeight() {
  return window.visualViewport?.height || window.innerHeight;
}

function setActivePanel(panels, idx) {
  panels.forEach((panel, i) => {
    panel.style.pointerEvents = i === idx ? "auto" : "none";
  });
}

function buildParallax(pinEl, refs, isMobile) {
  const { panelsRef, dotsRef, counterRef, progressRef } = refs;
  const panels = panelsRef.current.filter(Boolean);
  const dots   = dotsRef.current.filter(Boolean);
  const total  = products.length;

  if (!panels.length || !pinEl) return null;

  gsap.set(panels, { clearProps: "transform,opacity" });
  gsap.set(panels, { position: "absolute", top: 0, left: 0, width: "100%", height: "100%" });
  panels.forEach((p, i) => gsap.set(p, { zIndex: i + 1, yPercent: i === 0 ? 0 : 100 }));
  setActivePanel(panels, 0);

  if (dots[0]) gsap.set(dots, { scale: 1, opacity: 0.3 });
  if (dots[0]) gsap.set(dots[0], { scale: 1.7, opacity: 1 });

  const tl = gsap.timeline({
    scrollTrigger: {
      id: "products-pin",
      trigger: pinEl,
      start: "top top",
      end: () => `+=${getViewportHeight() * (total + (isMobile ? 0.75 : 1))}`,
      pin: pinEl,
      pinSpacing: true,
      scrub: isMobile ? 0.45 : 1.2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (progressRef.current) progressRef.current.style.width = self.progress * 100 + "%";
        const idx = Math.min(Math.floor(self.progress * total), total - 1);
        setActivePanel(panels, idx);
        if (counterRef.current) {
          counterRef.current.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
        }
      },
    },
  });

  const slideOut = isMobile ? -22 : -30;
  const slideIn  = isMobile ? 35 : 50;

  for (let i = 1; i < total; i++) {
    tl.to(dots[i - 1],  { scale: 1, opacity: 0.3, duration: 0.3 }, (i - 1) * 1.5)
      .to(panels[i - 1], { yPercent: slideOut, scale: 0.96, opacity: 0, duration: 1, ease: "power2.inOut" }, (i - 1) * 1.5)
      .fromTo(panels[i], { yPercent: slideIn, scale: 1.01, opacity: 0, zIndex: total + 1 }, { yPercent: 0, scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }, (i - 1) * 1.5 + 0.2)
      .to(dots[i], { scale: 1.7, opacity: 1, duration: 0.3 }, (i - 1) * 1.5 + 0.7);
  }
  tl.to({}, { duration: isMobile ? 0.5 : 0.8 });

  return tl;
}

export default function Products({ onExplore, enabled = true }) {
  const sectionRef  = useRef(null);
  const pinRef      = useRef(null);
  const panelsRef   = useRef([]);
  const dotsRef     = useRef([]);
  const counterRef  = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const section = sectionRef.current;
    const pinEl   = pinRef.current;
    if (!section || !pinEl) return;

    const refs = { panelsRef, dotsRef, counterRef, progressRef };

    const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh());

    const mm = gsap.matchMedia();

    mm.add("(max-width: 640px)", () => {
      ScrollTrigger.normalizeScroll({ allowNestedScroll: false, lockAxis: false, type: "touch,wheel,pointer" });

      const ctx = gsap.context(() => {
        buildParallax(pinEl, refs, true);
        refresh();
      }, section);

      return () => {
        ctx.revert();
        ScrollTrigger.normalizeScroll(false);
      };
    });

    mm.add("(min-width: 641px)", () => {
      const ctx = gsap.context(() => {
        buildParallax(pinEl, refs, false);
        refresh();
      }, section);

      return () => ctx.revert();
    });

    const onResize = () => refresh();
    const onVvResize = () => refresh();

    window.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("resize", onVvResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onVvResize);
      mm.revert();
    };
  }, [enabled]);

  return (
    <section className="ps" id="products" ref={sectionRef}>
      <div className="ps__header">
        <span className="ps__eyebrow">BYPASS365</span>
        <h2 className="ps__title">
          Our VPN. <span className="glow-text">Total Privacy.</span>
        </h2>
      </div>

      <div className="ps__pin" ref={pinRef}>
        <div className="ps__viewport">
          <div className="ps__panels-stage">
            {products.map((p, i) => {
              const theme = PRODUCT_THEMES[p.id];
              const extra = PRODUCT_EXTRA[p.id];
              const isLight = theme.mode === "light";

              return (
                <div
                  key={p.id}
                  className={`ps__panel${isLight ? " ps__panel--light" : ""}`}
                  ref={el => { panelsRef.current[i] = el; }}
                  style={{ background: theme.bg }}
                >
                  {theme.grid && <div className={`ps__theme-grid${isLight ? " ps__theme-grid--light" : ""}`} />}
                  {theme.stars && <div className="ps__theme-stars" />}

                  <div className="ps__orb ps__orb--1" style={{ background: theme.orb1 }} />
                  <div className="ps__orb ps__orb--2" style={{ background: theme.orb2 }} />

                  <div className="ps__panel-content">
                    <div className="ps__visual-wrap">
                      <div
                        className="ps__visual-card"
                        style={{ boxShadow: `0 0 60px ${theme.glow}, 0 0 0 1px ${theme.accent}22` }}
                      >
                        <PanelVisual id={p.id} accent={theme.accent} accent2={theme.accent2} accent3={theme.accent3} />
                      </div>

                      <div className="ps__icon-grid ps__icon-grid--desktop">
                        {extra.icons.map((icon, ii) => (
                          <div
                            key={ii}
                            className="ps__icon-cell"
                            style={{ borderColor: theme.accent + "33", background: isLight ? theme.accent + "10" : theme.accent + "08" }}
                          >
                            <span className="ps__icon-cell-icon">{icon}</span>
                            <span className="ps__icon-cell-label" style={{ color: theme.accent }}>{extra.iconLabels[ii]}</span>
                          </div>
                        ))}
                      </div>

                      <div
                        className="ps__live-chip"
                        style={{
                          borderColor: theme.accent + "55",
                          color: theme.accent,
                          background: isLight ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.5)",
                        }}
                      >
                        <span className="ps__live-dot" style={{ background: theme.accent }} />
                        {extra.liveLabel}
                      </div>
                    </div>

                    <div className="ps__text-col">
                      <div
                        className="ps__card-eyebrow"
                        style={{ color: theme.accent, borderColor: theme.accent + "44", background: theme.accent + (isLight ? "14" : "10") }}
                      >
                        {extra.badge}
                      </div>

                      <div className="ps__emoji-big">{p.emoji}</div>

                      <h3
                        className="ps__prod-name"
                        style={{
                          WebkitTextFillColor: "transparent",
                          background: theme.headlineGradient,
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                        }}
                      >
                        {p.name}
                      </h3>

                      <p className="ps__prod-tagline">{p.tagline}</p>

                      <div
                        className="ps__accent-line"
                        style={{ background: `linear-gradient(90deg, ${theme.accent}, transparent)`, width: "80%" }}
                      />

                      <p className="ps__prod-desc">{p.description}</p>

                      <ul className="ps__prod-features">
                        {p.features.map((f, fi) => (
                          <li key={fi}>
                            <span className="ps__prod-bullet" style={{ background: theme.accent }} />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div className="ps__stat-bar">
                        {extra.stats.map(([num, label], si) => (
                          <div
                            key={si}
                            className="ps__stat-item"
                            style={{ borderColor: theme.accent + "22", background: isLight ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.03)" }}
                          >
                            <span className="ps__stat-num" style={{ color: theme.accent }}>{num}</span>
                            <span className="ps__stat-label">{label}</span>
                          </div>
                        ))}
                      </div>

                      <div className="ps__prod-tags">
                        {p.tags.map((t, ti) => (
                          <span
                            key={ti}
                            className="ps__prod-tag"
                            style={{ borderColor: theme.accent + "66", color: theme.accent, background: isLight ? theme.accent + "08" : "rgba(255,255,255,0.04)" }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <motion.button
                        type="button"
                        className="ps__prod-btn"
                        style={{ background: theme.btnGradient, color: isLight ? "#fff" : "#000" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onExplore(p);
                        }}
                      >
                        Explore {p.name} →
                      </motion.button>
                    </div>
                  </div>

                  <div className="ps__panel-label" style={{ color: theme.accent + (isLight ? "18" : "33") }}>
                    {String(p.id).padStart(2, "0")}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ps__dots">
            {products.map((p, i) => (
              <div key={i} className="ps__dot-row">
                <div className="ps__dot" ref={el => { dotsRef.current[i] = el; }} style={{ background: PRODUCT_THEMES[p.id].accent }} />
                <span className="ps__dot-name">{p.name}</span>
              </div>
            ))}
          </div>

          <div className="ps__counter" ref={counterRef}>01 / 01</div>

          <div className="ps__progress-track">
            <div className="ps__progress-fill" ref={progressRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
