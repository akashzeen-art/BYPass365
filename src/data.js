export const BRAND_LOGO = "/logo/bypass365logo.png";

export const products = [
  {
    id: 1,
    name: "VPN",
    emoji: "🔒",
    featured: true,
    tagline: "Your Privacy, Our Priority",
    description: "Military-grade encryption with 8 servers across 4 continents — built for Windows and Android.",
    color: { bg: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)", accent: "#00d4ff" },
    features: [
      "8 servers spanning 4 continents worldwide",
      "Military-grade AES-256 encryption",
      "Zero-log policy — your data stays yours",
      "Available on Windows and Android",
    ],
    tags: ["Windows", "Android", "8 Servers"],
  },
];

export const heroData = {
  brand: "BYPASS365",
  headline: "One Platform,\nEndless Possibilities",
  subheadline:
    "Military-grade VPN protection designed to keep you secure, private, and free online.",
  cta: "Explore VPN",
};

export const serversMeta = {
  headline: "8 Servers. 4 Continents.",
  subheadline: "Real-time monitoring, automatic failover, 100% uptime SLA.",
  statusLine: "All 8 servers operational · 100% uptime this month",
};

export const servers = [
  { id: "sg", flag: "🇸🇬", name: "Singapore", region: "Asia Pacific", ping: 12, load: 32, status: "ONLINE" },
  { id: "jp", flag: "🇯🇵", name: "Japan", region: "Asia Pacific", ping: 28, load: 45, status: "ONLINE" },
  { id: "de", flag: "🇩🇪", name: "Germany", region: "Europe", ping: 42, load: 28, status: "ONLINE" },
  { id: "nl", flag: "🇳🇱", name: "Netherlands", region: "Europe", ping: 38, load: 55, status: "ONLINE" },
  { id: "use", flag: "🇺🇸", name: "US East", region: "Americas", ping: 95, load: 61, status: "ONLINE" },
  { id: "usw", flag: "🇺🇸", name: "US West", region: "Americas", ping: 110, load: 48, status: "ONLINE" },
  { id: "ca", flag: "🇨🇦", name: "Canada", region: "Americas", ping: 88, load: 37, status: "ONLINE" },
  { id: "au", flag: "🇦🇺", name: "Australia", region: "Asia Pacific", ping: 140, load: 22, status: "ONLINE" },
];
