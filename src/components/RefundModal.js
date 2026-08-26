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

export default function RefundModal({ open, onClose }) {
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
            aria-labelledby="rp-title"
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
              <h2 id="rp-title" className="tm__title">
                Refund Policy
              </h2>

              <p className="tm__p">
                The current website at the moment is referred to by &quot;this website&quot;
                in this document.
              </p>
              <p className="tm__lead">
                Thank you for subscribing to Alphamovil Digital Solutions LLP&apos;s
                services. We hope you are satisfied with our services, but if not,
                we&apos;re here to help.
              </p>

              <section className="tm__section">
                <h3 className="tm__heading">1. Free Trial</h3>
                <p className="tm__p">
                  Alphamovil Digital Solutions LLP offers no free trial for new users
                  to experience the services before purchasing a subscription. During
                  the trial period, users can cancel their subscription at any time
                  without being charged.
                </p>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">2. Cancellation Policy</h3>
                <p className="tm__p">
                  Subscribers may cancel their recurring subscription at any time.
                  Upon cancellation, your account will remain active until the end of
                  your current billing cycle.
                </p>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">3. Refund Eligibility</h3>
                <p className="tm__p">
                  To be eligible for a refund, you must submit a request within 2 days
                  of your subscription start date. Refunds may be considered on a
                  case-by-case basis and are granted at the sole discretion of
                  Alphamovil Digital Solutions LLP.
                </p>
                <p className="tm__p">
                  Refund requests can be made if you encounter technical issues that
                  prevent you from using our service and that cannot be resolved by our
                  support team. Proof of the issue may be required.
                </p>
                <p className="tm__p">
                  Please note that refunds are not guaranteed and may vary depending on
                  the circumstances. Refund requests due to issues beyond Alphamovil
                  Digital Solutions LLP&apos;s control (e.g., changes in personal
                  circumstances, third-party hardware or software failures) will not be
                  honored.
                </p>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">4. Process for Requesting a Refund</h3>
                <p className="tm__p">
                  To request a refund, please contact our customer support team at{" "}
                  <a className="tm__link" href="mailto:bd@alphamovil.com">
                    bd@alphamovil.com
                  </a>
                  . Include your account information, subscription details, and a brief
                  explanation of why you are requesting a refund.
                </p>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">5. Refund Processing</h3>
                <p className="tm__p">
                  Once your refund request is received and inspected, we will send you
                  an email to notify you of the approval or rejection of your refund.
                </p>
                <p className="tm__p">
                  If approved, your refund will be processed, and a credit will
                  automatically be applied to your original method of payment within 7
                  working days. Please note that refunds can only be made back to the
                  original payment method used at the time of purchase.
                </p>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">6. Changes to Refund Policy</h3>
                <p className="tm__p">
                  Alphamovil Digital Solutions LLP reserves the right to modify this
                  refund policy at any time. Changes will take effect immediately upon
                  their posting on the website. By continuing to use our services after
                  changes are made, you agree to be bound by the revised policy.
                </p>

                <h4 className="tm__subheading">
                  Scenarios Where Refunds Would Typically Be Granted
                </h4>
                <ul className="tm__list">
                  <li>
                    <strong>Technical Issues:</strong> The customer experiences
                    persistent technical issues that prevent them from using the SaaS
                    product effectively, despite multiple attempts by the support team
                    to resolve the problem. For example, the software fails to load or
                    crashes frequently, impeding the customer&apos;s ability to perform
                    necessary tasks.
                  </li>
                  <li>
                    <strong>Billing Error:</strong> The customer was incorrectly charged
                    due to a billing error on Alphamovil Digital Solutions LLP&apos;s
                    part. For example, they were billed twice in one month, or charged
                    after cancelling their subscription in accordance with the
                    cancellation policy.
                  </li>
                </ul>

                <h4 className="tm__subheading">
                  Scenarios Where Refunds Would Not Typically Be Granted
                </h4>
                <ul className="tm__list">
                  <li>
                    <strong>Change of Mind:</strong> The customer decides they no longer
                    want or need the SaaS product after the refund eligibility period
                    has passed. For example, they found a different product they prefer,
                    or they no longer need the service due to changes in their business.
                  </li>
                </ul>
              </section>

              <section className="tm__section">
                <h3 className="tm__heading">7. Contact Us</h3>
                <p className="tm__p">
                  If you have any questions about our refund policy, please contact us
                  at{" "}
                  <a className="tm__link" href="mailto:bd@alphamovil.com">
                    bd@alphamovil.com
                  </a>
                  .
                </p>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
