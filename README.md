# CIRVION - AI & Automation Consultancy

A premium, dark-themed, modern, enterprise-level website for CIRVION, built with React, Vite, Tailwind concepts (implemented in vanilla CSS/modules for performance and control as requested), and Framer Motion for animations.

## Features

- **Premium Design**: Dark mode aesthetic with Midnight Navy, Electric Blue, and Soft Silver color palette.
- **Responsive**: Fully responsive layout for all devices.
- **Animations**: Smooth scroll and reveal animations using Framer Motion.
- **Components**:
  - Hero Section with glowing effects.
  - Services & Industries showcases.
  - Case Studies with metrics.
  - Contact Form & Footer.

## Tech Stack

- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Vanilla CSS with CSS Variables for theming (located in `src/index.css`)
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

- `src/components`: Contains all UI sections (Navbar, Hero, Services, etc.)
- `src/App.jsx`: Main application entry point assembling the sections.
- `src/index.css`: Global styles, variables, and utility classes.

## Customization

To modify the color scheme, edit the CSS variables in `src/index.css`:

```css
:root {
  --color-bg: #0F172A;
  --color-primary: #00C8FF;
  --color-text: #CBD5E1;
  /* ... */
}
```
