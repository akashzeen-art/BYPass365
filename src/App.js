import React, { useState, useCallback } from "react";
import Preloader     from "./components/Preloader";
import Navbar        from "./components/Navbar";
import Hero          from "./components/Hero";
import PhoneShowcase from "./components/PhoneShowcase";
import Features      from "./components/Features";
import Servers       from "./components/Servers";
import Products      from "./components/Products";
import ProductModal  from "./components/ProductModal";
import Footer        from "./components/Footer";
import "./App.css";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
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
        <Navbar />
        <Hero />
        <PhoneShowcase />
        <Features />
        <Servers />
        <Products onExplore={setActiveProduct} enabled={loaded} />
        <Footer />
      </div>

      <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
    </>
  );
}
