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

export default function TermsModal({ open, onClose }) {
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
            aria-labelledby="tm-title"
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
              <h2 id="tm-title" className="tm__title">
                Terms and Conditions
              </h2>
              <p className="tm__lead">
                At Alphamovil Digital Solutions LLP, accessible from this web portal,
                one of our main priorities is the privacy of our visitors. This Privacy
                Policy document contains the types of information that are collected and
                recorded and how we use it.
              </p>
              <p className="tm__p">
                The current website at the moment is referred to by &quot;this website&quot;
                in this document.
              </p>
              <p className="tm__p">
                If you have additional questions or require more information about our
                Privacy Policy, do not hesitate to contact us.
              </p>

              <section className="tm__section">
                <h3 className="tm__heading">Consent</h3>
                <p className="tm__p">
                  By using our website, you hereby consent to our Privacy Policy and
                  agree to its terms.
                </p>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">Information We Collect</h3>
                <p className="tm__p">
                  The personal information that you are asked to provide, and the reasons
                  why you are asked to provide it, will be made clear to you at the point
                  we ask you to provide your personal information.
                </p>
                <p className="tm__p">
                  If you contact us directly, we may receive additional information about
                  you such as your name, email address, phone number, the contents of the
                  message and/or attachments you may send us, and any other information
                  you may choose to provide.
                </p>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">How We Use Your Information</h3>
                <ul className="tm__list">
                  <li>Provide, operate, and maintain our website</li>
                  <li>Improve, personalize, and expand our website</li>
                  <li>Understand and analyze how you use our website</li>
                  <li>Develop new products, services, features, and functionality</li>
                  <li>Communicate with you for customer service and marketing purposes</li>
                  <li>Send you emails</li>
                  <li>Find and prevent fraud</li>
                </ul>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">Log Files</h3>
                <p className="tm__p">
                  This website follows a standard procedure of using log files. These
                  files log visitors when they visit websites. The information collected
                  by log files includes internet protocol (IP) addresses, browser type,
                  Internet Service Provider (ISP), date and time stamp, referring/exit
                  pages, and possibly the number of clicks.
                </p>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">Cookies and Web Beacons</h3>
                <p className="tm__p">
                  Like any other website, this website uses &apos;cookies&apos;. These
                  cookies are used to store information including visitors&apos;
                  preferences, and the pages on the website that the visitor accessed or
                  visited.
                </p>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">CCPA Privacy Rights</h3>
                <p className="tm__p">
                  Under the CCPA, among other rights, California consumers have the right
                  to:
                </p>
                <ul className="tm__list">
                  <li>
                    Request that a business disclose the categories and specific pieces of
                    personal data collected
                  </li>
                  <li>
                    Request that a business delete any personal data about the consumer
                  </li>
                  <li>
                    Request that a business not sell the consumer&apos;s personal data
                  </li>
                </ul>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">GDPR Data Protection Rights</h3>
                <ul className="tm__list">
                  <li>
                    <strong>The right to access</strong> – You have the right to request
                    copies of your personal data.
                  </li>
                  <li>
                    <strong>The right to rectification</strong> – You have the right to
                    request correction of inaccurate information.
                  </li>
                  <li>
                    <strong>The right to erasure</strong> – You have the right to request
                    erasure of your personal data.
                  </li>
                  <li>
                    <strong>The right to restrict processing</strong> – You have the right
                    to request restricted processing.
                  </li>
                  <li>
                    <strong>The right to object to processing</strong> – You have the
                    right to object to our processing.
                  </li>
                  <li>
                    <strong>The right to data portability</strong> – You have the right to
                    request data transfer.
                  </li>
                </ul>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">Children&apos;s Information</h3>
                <p className="tm__p">
                  This website does not knowingly collect any Personally Identifiable
                  Information from children under the age of 13. If you think that your
                  child provided this kind of information on our website, we strongly
                  encourage you to contact us immediately.
                </p>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">Terms and Conditions</h3>
                <p className="tm__p">
                  This document is an electronic record in terms of the Information
                  Technology Act, 2000 and rules thereunder as applicable.
                </p>
                <p className="tm__p">
                  The Platform is owned by Alphamovil Digital Solutions LLP, a company
                  incorporated under the Companies Act, 1956. Your use of the Platform and
                  services are governed by these Terms of Use.
                </p>
                <p className="tm__p tm__p--emphasis">
                  ACCESSING, BROWSING OR OTHERWISE USING THE PLATFORM INDICATES YOUR
                  AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS OF USE.
                </p>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">Key Terms</h3>
                <ul className="tm__list">
                  <li>
                    You agree to provide true, accurate and complete information during
                    registration.
                  </li>
                  <li>Your use of our Services is solely at your own risk.</li>
                  <li>You agree to pay charges associated with availing the Services.</li>
                  <li>You agree not to use the Platform for any unlawful purpose.</li>
                  <li>
                    You shall indemnify and hold harmless Platform Owner from any claims.
                  </li>
                  <li>
                    All disputes arising out of or in connection with these Terms shall be
                    subject to the exclusive jurisdiction of Indian courts and governed by
                    the laws of India.
                  </li>
                </ul>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
