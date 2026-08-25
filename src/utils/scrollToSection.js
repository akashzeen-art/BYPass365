import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "../data";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const NAV_OFFSET = 72;

const SECTION_IDS = {
  home: "home",
  features: "features",
  servers: "servers",
  products: "products",
};

const PRODUCT_INDEX = {
  vpn: 0,
};

function resolveSectionId(nameOrId) {
  const key = String(nameOrId).toLowerCase();
  return SECTION_IDS[key] || key;
}

function refreshScrollTriggers() {
  ScrollTrigger.refresh(true);
}

function animateScrollTo(y) {
  gsap.killTweensOf(window);
  const targetY = Math.max(0, y);

  gsap.to(window, {
    duration: 0.85,
    ease: "power2.inOut",
    scrollTo: targetY,
    autoKill: true,
    onComplete: refreshScrollTriggers,
  });
}

function elementScrollY(el) {
  refreshScrollTriggers();
  return el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
}

function getProductsPinTrigger() {
  return (
    ScrollTrigger.getById("products-pin") ||
    ScrollTrigger.getAll().find((st) => {
      const pin = document.querySelector("#products .ps__pin");
      return pin && (st.trigger === pin || st.pin === pin);
    }) ||
    null
  );
}

export function scrollToSection(nameOrId) {
  const el = document.getElementById(resolveSectionId(nameOrId));
  if (!el) return;

  requestAnimationFrame(() => {
    animateScrollTo(elementScrollY(el));
  });
}

export function scrollToProductIndex(index) {
  const section = document.getElementById("products");
  if (!section) return;

  const idx = Math.max(0, Math.min(index, products.length - 1));

  requestAnimationFrame(() => {
    refreshScrollTriggers();
    const pinSt = getProductsPinTrigger();

    let y;
    if (pinSt && pinSt.end > pinSt.start) {
      const progress = (idx + 0.2) / products.length;
      y = pinSt.start + (pinSt.end - pinSt.start) * progress - NAV_OFFSET;
    } else {
      y = elementScrollY(section);
    }

    animateScrollTo(y);
  });
}

export function scrollToProductByName(name) {
  const key = String(name).toLowerCase().trim();
  const index = PRODUCT_INDEX[key];
  if (index === undefined) {
    scrollToSection("products");
    return;
  }
  scrollToProductIndex(index);
}
