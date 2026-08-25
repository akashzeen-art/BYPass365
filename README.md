# BYPASS365 - Product Showcase Website

A modern, animated React website showcasing 5 products: VPN (featured), Antivirus, WiFi Extender, OTT, and Quiz Contest.

## Features

- **Smooth Product Carousel** with alternating slide directions (left-to-right, right-to-left)
- **Auto-play** with pause on hover/touch
- **Touch/Swipe Support** for mobile devices
- **Scroll-triggered animations** - Products section slides in from left
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Premium UI** with gradient backgrounds, animated blobs, and smooth transitions
- **Featured Product Badge** highlighting VPN

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.js/css       # Fixed navigation with scroll effect
│   ├── Hero.js/css         # Hero section with floating card
│   ├── Products.js/css     # Products section wrapper
│   ├── ProductCarousel.js/css  # Animated carousel
│   └── Footer.js/css       # Footer with product links
├── data.js                 # All product data
├── App.js                  # Main app component
└── index.js                # Entry point
```

## Customization

Edit `src/data.js` to change:
- Product names, descriptions, features
- Colors and gradients
- Hero section content
- Brand name

## Technologies

- React 18
- CSS3 Animations
- Intersection Observer API
- Touch Events API
