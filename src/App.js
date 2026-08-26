import React, { useState, useCallback } from "react";
import Preloader     from "./components/Preloader";
import Navbar        from "./components/Navbar";
import Hero          from "./components/Hero";
import PhoneShowcase from "./components/PhoneShowcase";
import Features      from "./components/Features";
import Servers       from "./components/Servers";
import Products      from "./components/Products";
import ProductModal  from "./components/ProductModal";
import TermsModal    from "./components/TermsModal";
import PrivacyModal  from "./components/PrivacyModal";
import RefundModal   from "./components/RefundModal";
import AboutModal    from "./components/AboutModal";
import ContactModal  from "./components/ContactModal";
import Footer        from "./components/Footer";
import "./App.css";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [refundOpen, setRefundOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const handleDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Preloader onDone={handleDone} />

      <div
        className="app"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        <Navbar
          onOpenAbout={() => setAboutOpen(true)}
          onOpenContact={() => setContactOpen(true)}
          onOpenTerms={() => setTermsOpen(true)}
          onOpenPrivacy={() => setPrivacyOpen(true)}
          onOpenRefund={() => setRefundOpen(true)}
        />
        <Hero />
        <PhoneShowcase />
        <Features />
        <Servers />
        <Products onExplore={setActiveProduct} enabled={loaded} />
        <Footer />
      </div>

      <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <RefundModal open={refundOpen} onClose={() => setRefundOpen(false)} />
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
