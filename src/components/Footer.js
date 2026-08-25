import React from "react";
import { BRAND_LOGO } from "../data";
import { scrollToSection, scrollToProductByName } from "../utils/scrollToSection";
import "./Footer.css";

const PRODUCT_LINKS = ["VPN"];

export default function Footer() {
  return (
    <footer className="footer" id="contact">

      <div className="footer__main">
        <div className="footer__brand">
          <button
            type="button"
            className="footer__logo"
            onClick={() => scrollToSection("home")}
            aria-label="Back to top"
          >
            <img src={BRAND_LOGO} alt="BYPASS365" className="footer__logo-img" />
          </button>
          <p className="footer__tagline">
            Military-grade VPN protection for everyone. Browse freely, stay anonymous, stay safe.
          </p>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Product</h4>
          <ul>
            {PRODUCT_LINKS.map(item => (
              <li key={item}>
                <button
                  type="button"
                  className="footer__col-link"
                  onClick={() => scrollToProductByName(item)}
                >
                  {item === "VPN" ? "🔒 " : ""}{item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__divider" />
        <div className="footer__bottom-inner">
          <span>© {new Date().getFullYear()} BYPASS365. All rights reserved.</span>
          <span>🔒 Your privacy is our mission</span>
        </div>
      </div>
    </footer>
  );
}
