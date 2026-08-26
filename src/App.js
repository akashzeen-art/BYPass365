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
  const [infoModal, setInfoModal] = useState(null);
  const handleDone = useCallback(() => setLoaded(true), []);
  const closeInfo = useCallback(() => setInfoModal(null), []);

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
          onOpenAbout={() => setInfoModal("about")}
          onOpenContact={() => setInfoModal("contact")}
          onOpenTerms={() => setInfoModal("terms")}
          onOpenPrivacy={() => setInfoModal("privacy")}
          onOpenRefund={() => setInfoModal("refund")}
        />
        <Hero />
        <PhoneShowcase />
        <Features />
        <Servers />
        <Products onExplore={setActiveProduct} enabled={loaded} />
        <Footer />
      </div>

      <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
      <TermsModal open={infoModal === "terms"} onClose={closeInfo} />
      <PrivacyModal open={infoModal === "privacy"} onClose={closeInfo} />
      <RefundModal open={infoModal === "refund"} onClose={closeInfo} />
      <AboutModal open={infoModal === "about"} onClose={closeInfo} />
      <ContactModal open={infoModal === "contact"} onClose={closeInfo} />
    </>
  );
}
