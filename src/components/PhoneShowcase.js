import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./PhoneShowcase.css";

gsap.registerPlugin(ScrollTrigger);

const SCREENS = [
  { id: 0, title: "🌍 VPN Map",        desc: "Connect to any of our 8 servers across 4 continents with one tap. Your real IP stays completely hidden.", tag: "Location Select" },
  { id: 1, title: "⚡ Server Selection", desc: "Pick the fastest server near you. Real-time ping indicators update every second.",          tag: "Smart Connect"   },
  { id: 2, title: "🔒 Fully Encrypted",  desc: "AES-256 encryption active. Your traffic is 100% private, anonymous, and untraceable.",       tag: "Protected"       },
];

export default function PhoneShowcase() {
  const sectionRef = useRef(null);
  const pinRef     = useRef(null);
  const screensRef = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const screens = screensRef.current;
      gsap.set(screens, { opacity: 0, y: 40, position: "absolute", inset: 0 });
      gsap.set(screens[0], { opacity: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          pin: pinRef.current,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(Math.floor(self.progress * SCREENS.length), SCREENS.length - 1);
            setActiveIdx(idx);
          },
        },
      });

      for (let i = 0; i < screens.length - 1; i++) {
        tl.to(screens[i],     { opacity: 0, y: -40, duration: 0.5 }, i * 1.2)
          .fromTo(screens[i + 1], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7 }, i * 1.2 + 0.3);
      }
      tl.to({}, { duration: 0.5 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="phs" ref={sectionRef}>
      <div className="phs__pin" ref={pinRef}>

        <div className="phs__left">
          <div className="phs__phone-glow" />
          <div className="phs__phone phs__phone--float">
            <div className="phs__notch" />
            <div className="phs__screen-wrap">

              {/* screen 1 — map */}
              <div className="phs__screen" ref={el => screensRef.current[0] = el}>
                <div className="phs__screen-header">
                  <span className="phs__screen-title">BYPASS365 VPN</span>
                  <span className="phs__screen-status"><span className="phs__screen-dot" /> Connected</span>
                </div>
                <div className="phs__map">
                  <div className="phs__map-grid" />
                  {[
                    { top: "28%", left: "22%", color: "#00d4ff" },
                    { top: "20%", left: "52%", color: "#a855f7" },
                    { top: "38%", left: "78%", color: "#ec4899" },
                    { top: "65%", left: "35%", color: "#10b981" },
                  ].map((d, i) => (
                    <div key={i} className="phs__map-dot" style={{ top: d.top, left: d.left, background: d.color }} />
                  ))}
                  <div className="phs__map-hub" />
                </div>
                <div className="phs__bar">
                  <span className="phs__bar-dot" />
                  <span>Select Location</span>
                  <span className="phs__bar-arrow">›</span>
                </div>
              </div>

              {/* screen 2 — server list */}
              <div className="phs__screen" ref={el => screensRef.current[1] = el}>
                <div className="phs__screen-header">
                  <span className="phs__screen-title">Choose Server</span>
                  <span className="phs__screen-badge">8 Servers</span>
                </div>
                <div className="phs__list">
                  {[
                    { flag: "🇺🇸", name: "United States",  ping: 12, active: true  },
                    { flag: "🇬🇧", name: "United Kingdom", ping: 18, active: false },
                    { flag: "🇯🇵", name: "Japan",           ping: 24, active: false },
                    { flag: "🇩🇪", name: "Germany",         ping: 21, active: false },
                    { flag: "🇦🇺", name: "Australia",       ping: 38, active: false },
                  ].map((s, i) => (
                    <div key={i} className={"phs__list-item" + (s.active ? " phs__list-item--active" : "")}>
                      <span className="phs__list-flag">{s.flag}</span>
                      <span className="phs__list-name">{s.name}</span>
                      <span className="phs__ping">{s.ping}ms</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* screen 3 — connected */}
              <div className="phs__screen" ref={el => screensRef.current[2] = el}>
                <div className="phs__screen-header">
                  <span className="phs__screen-title">BYPASS365 VPN</span>
                  <span className="phs__screen-badge phs__screen-badge--green">Secured</span>
                </div>
                <div className="phs__connected">
                  <div className="phs__ring phs__ring--outer" />
                  <div className="phs__ring phs__ring--inner" />
                  <div className="phs__shield">🔒</div>
                  <div className="phs__conn-status">
                    <span className="phs__conn-label">Connected</span>
                    <span className="phs__conn-loc">🇺🇸 New York, USA</span>
                  </div>
                  <div className="phs__speed-row">
                    <div className="phs__speed-item"><span className="phs__speed-icon">↓</span><span className="phs__speed-val">94 Mbps</span></div>
                    <div className="phs__speed-divider" />
                    <div className="phs__speed-item"><span className="phs__speed-icon">↑</span><span className="phs__speed-val">52 Mbps</span></div>
                  </div>
                  <div className="phs__enc-badge">🔐 AES-256 Active</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="phs__right">
          <div className="phs__eyebrow-wrap">
            <span className="phs__eyebrow">🔒 VPN App Experience</span>
          </div>
          <h2 className="phs__section-title">See BYPASS365 <span className="glow-text">in Action</span></h2>

          <div className="phs__steps">
            {SCREENS.map((s, i) => (
              <div key={i} className={"phs__step" + (i === activeIdx ? " phs__step--active" : "")}>
                <div className="phs__step-num" style={i === activeIdx ? { background: "linear-gradient(135deg,#00d4ff,#a855f7)", color: "#000" } : {}}>
                  {i + 1}
                </div>
                <div className="phs__step-text">
                  <span className="phs__step-title">{s.title}</span>
                  <span className="phs__step-tag">{s.tag}</span>
                </div>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              className="phs__active-desc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <p>{SCREENS[activeIdx].desc}</p>
            </motion.div>
          </AnimatePresence>

          <div className="phs__progress-dots">
            {SCREENS.map((_, i) => (
              <div
                key={i}
                className="phs__progress-dot"
                style={i === activeIdx
                  ? { width: 28, background: "#00d4ff", opacity: 1 }
                  : { width: 8,  background: "rgba(255,255,255,0.2)", opacity: 0.5 }
                }
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
