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

export default function PrivacyModal({ open, onClose }) {
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
            aria-labelledby="pp-title"
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
              <h2 id="pp-title" className="tm__title">
                Privacy Policy
              </h2>

              <p className="tm__p">
                The current website at the moment is referred to by &quot;this website&quot;
                in this document.
              </p>
              <p className="tm__lead">
                This Privacy Policy describes how Alphamovil Digital Solutions LLP
                (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, discloses, and protects
                your personal information when you visit or make a purchase from this
                website or use any of our services (collectively, the &quot;Services&quot;).
              </p>
              <p className="tm__p">
                By using our Services, you agree to the collection and use of information
                as outlined in this Privacy Policy. If you do not agree, please do not use
                the Services.
              </p>

              <section className="tm__section">
                <h3 className="tm__heading">1. Information We Collect</h3>

                <h4 className="tm__subheading">a) Information You Provide Directly</h4>
                <ul className="tm__list">
                  <li>
                    <strong>Contact details:</strong> Name, phone number, email address,
                    postal address
                  </li>
                  <li>
                    <strong>Order details:</strong> Product purchase history,
                    billing/shipping information
                  </li>
                  <li>
                    <strong>Account information:</strong> Login credentials, preferences
                  </li>
                  <li>Customer support queries and feedback</li>
                </ul>

                <h4 className="tm__subheading">b) Automatically Collected Information</h4>
                <ul className="tm__list">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Device type and operating system</li>
                  <li>Pages visited, time spent, and referring URLs</li>
                </ul>
                <p className="tm__p">
                  This data is gathered using technologies like cookies and other tracking
                  tools to enhance your browsing experience and improve our services.
                </p>

                <h4 className="tm__subheading">c) Third-Party Sources</h4>
                <ul className="tm__list">
                  <li>Payment gateways (e.g., to process transactions)</li>
                  <li>
                    Analytics providers (e.g., to analyze traffic and usage patterns)
                  </li>
                  <li>
                    Advertising or marketing platforms (e.g., to optimize campaign
                    performance)
                  </li>
                </ul>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">2. How We Use Your Information</h3>
                <ul className="tm__list">
                  <li>Process and fulfill orders</li>
                  <li>Communicate with you about orders, updates, or issues</li>
                  <li>Improve the functionality and user experience of the website</li>
                  <li>Respond to inquiries and provide customer support</li>
                  <li>
                    Send promotional emails, newsletters, and marketing offers (you can
                    opt out anytime)
                  </li>
                  <li>
                    Monitor and prevent fraudulent transactions and abuse of our Services
                  </li>
                </ul>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">3. How We Share Your Information</h3>
                <p className="tm__p">
                  Your personal information may be shared only in limited circumstances:
                </p>
                <ul className="tm__list">
                  <li>
                    With service providers such as payment processors, hosting providers,
                    and email service platforms
                  </li>
                  <li>
                    With business partners to conduct joint promotions or events (only
                    with your consent)
                  </li>
                  <li>
                    With legal authorities where required by law, to protect our rights or
                    in connection with a legal claim
                  </li>
                  <li>
                    With affiliates or during business restructuring, such as mergers or
                    acquisitions
                  </li>
                </ul>
                <p className="tm__p">
                  We do not sell your personal information. We do not share sensitive
                  personal information for targeted advertising purposes.
                </p>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">4. Cookies and Tracking Technologies</h3>
                <p className="tm__p">
                  Cookies help us provide, protect, and improve our services. They enable
                  functionalities like remembering your preferences and measuring user
                  activity. You can manage or disable cookies in your browser settings.
                  However, disabling cookies may affect certain features or
                  functionalities of the website.
                </p>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">5. User-Generated Content</h3>
                <p className="tm__p">
                  If you post content (e.g., reviews or comments) on public areas of the
                  Site, it becomes publicly accessible. We are not responsible for how
                  others use this information.
                </p>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">6. External Links</h3>
                <p className="tm__p">
                  Our website may include links to third-party sites. We are not
                  responsible for the privacy or security practices of these external
                  platforms. Please review their privacy policies separately.
                </p>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">7. Children&apos;s Privacy</h3>
                <p className="tm__p">
                  Our Services are not intended for users under the age of 16. We do not
                  knowingly collect personal data from children. If you believe a child
                  has submitted personal information through our platform, please contact
                  us immediately at{" "}
                  <a className="tm__link" href="mailto:bd@alphamovil.com">
                    bd@alphamovil.com
                  </a>
                  , and we will take prompt steps to delete such information from our
                  records.
                </p>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">8. Security and Retention</h3>
                <p className="tm__p">
                  We take reasonable precautions to protect your personal information.
                  However, no online transmission or storage is completely secure. We
                  retain your information only as long as necessary for our business
                  purposes or to meet legal requirements.
                </p>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">9. Your Rights</h3>
                <p className="tm__p">
                  Depending on your jurisdiction, you may have the right to:
                </p>
                <ul className="tm__list">
                  <li>Access and update your personal information</li>
                  <li>Delete your data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Restrict or object to certain data processing</li>
                  <li>Request data portability</li>
                </ul>
                <p className="tm__p">To make any such request, please contact us at:</p>
                <ul className="tm__list">
                  <li>
                    Email:{" "}
                    <a className="tm__link" href="mailto:bd@alphamovil.com">
                      bd@alphamovil.com
                    </a>
                  </li>
                  <li>
                    Address: Alphamovil Digital Solutions LLP, B-123, SUNCITY,
                    SECTOR-54, Gurgaon, Haryana, 122011
                  </li>
                </ul>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">10. Disclaimer</h3>
                <p className="tm__p">
                  The code provided on this platform, including the features, information,
                  promotional data, text, offers, or related materials, is intended for
                  general informational and utility purposes only. It is not a substitute
                  for professional technology, industrial networking, or any other use
                  apart from non critical applications. Users are advised to ensure usage
                  within the mentioned extent only.
                </p>
                <p className="tm__p">
                  By using this platform, you acknowledge that you do so voluntarily and
                  at your own risk. The platform and its creators shall not be held
                  responsible for any code or information loss, network flags or local
                  administrative enforcements on the technology used, injuries, damages,
                  or losses resulting from the use of this content. Individual results and
                  experiences may vary.
                </p>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">11. Governing Law and Jurisdiction</h3>
                <p className="tm__p">
                  These Terms shall be governed and interpreted in accordance with the
                  laws of India. Any disputes arising out of or relating to the use of
                  this website shall be subject to the exclusive jurisdiction of the
                  courts located in Gurgaon, Haryana.
                </p>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">12. Updates to this Privacy Policy</h3>
                <p className="tm__p">
                  We may update this Privacy Policy periodically to reflect changes in
                  our practices or legal obligations. Updates will be posted on this page
                  with the revised date.
                </p>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
