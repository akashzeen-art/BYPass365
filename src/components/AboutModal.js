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

export default function AboutModal({ open, onClose }) {
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
            aria-labelledby="au-title"
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
              <h2 id="au-title" className="tm__title">
                About Us
              </h2>

              <p className="tm__lead">
                At Alphamovil Digital Solutions LLP, we believe that online privacy,
                security, and freedom should be accessible to everyone. That&apos;s why
                we created a modern VPN service designed to provide users with a safer,
                more private, and seamless internet experience — anytime, anywhere.
              </p>
              <p className="tm__p">
                Our VPN service helps protect your online activity by encrypting your
                internet connection and providing an additional layer of privacy while
                you browse, stream, work, or connect to public networks. With a focus on
                speed, reliability, and ease of use, our service is designed for both
                everyday users and those who require enhanced online privacy.
              </p>
              <p className="tm__p">
                As a digital VPN service, Alphamovil Digital Solutions LLP bridges the
                gap between today&apos;s connected lifestyle and the growing need for
                secure internet access. No complicated setups or technical expertise —
                simply connect to the VPN and enjoy a more private and secure online
                experience.
              </p>

              <section className="tm__section">
                <h3 className="tm__heading">Our Mission</h3>
                <p className="tm__p">
                  Our mission is to make online privacy and secure internet access
                  simple, affordable, and accessible to everyone by delivering reliable
                  VPN technology that helps protect users&apos; digital privacy while
                  keeping them connected with confidence.
                </p>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
