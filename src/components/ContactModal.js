import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TermsModal.css";

gsap.registerPlugin(ScrollTrigger);

function enableMobileNormalizeScroll() {
  if (window.matchMedia("(max-width: 640px)").matches) {
    ScrollTrigger.normalizeScroll({
      allowNestedScroll: true,
      lockAxis: false,
      type: "touch,wheel,pointer",
    });
  }
}

const CONTACT_ITEMS = [
  {
    icon: "🏢",
    label: "Company",
    value: "Alphamovil Digital Solutions LLP",
  },
  {
    icon: "📍",
    label: "Address",
    value: "B-123, SUNCITY, SECTOR-54, Gurgaon, Haryana, 122011",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+91 9667687077",
    href: "tel:+919667687077",
  },
  {
    icon: "✉️",
    label: "Email",
    value: "bd@alphamovil.com",
    href: "mailto:bd@alphamovil.com",
  },
];

export default function ContactModal({ open, onClose }) {
  const panelRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    ScrollTrigger.normalizeScroll(false);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      enableMobileNormalizeScroll();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="tm__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            className="tm__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cu-title"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => {
              const el = panelRef.current;
              if (el && open) el.style.transform = "none";
              if (scrollRef.current) scrollRef.current.scrollTop = 0;
            }}
          >
            <div className="tm__orb tm__orb--1" />
            <div className="tm__orb tm__orb--2" />

            <div className="tm__header">
              <button className="tm__close" onClick={onClose} aria-label="Back">
                <span className="tm__close-arrow" aria-hidden="true">←</span>
                Back
              </button>
            </div>

            <div className="tm__scroll" ref={scrollRef}>
              <h2 id="cu-title" className="tm__title">
                Contact Us
              </h2>
              <p className="tm__lead">
                We&apos;d love to hear from you. Feel free to reach out.
              </p>

              <div className="tm__contact-grid">
                {CONTACT_ITEMS.map((item) => (
                  <div key={item.label} className="tm__contact-card">
                    <span className="tm__contact-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <div>
                      <p className="tm__contact-label">{item.label}</p>
                      {item.href ? (
                        <a className="tm__contact-value tm__link" href={item.href}>
                          {item.value}
                        </a>
                      ) : (
                        <p className="tm__contact-value">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
