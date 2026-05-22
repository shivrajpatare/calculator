# Splittr — Tip Calculator & Bill Splitter

A modern, responsive tip calculator built as part of the **DevWeekends Fellowship 2026** frontend assessment.

Enter a bill amount, choose a tip percentage, set the number of people, and see the split calculated live — no submit button required.

## Live Demo

> **Deployment URL:** [https://calculator-theta-ten-12.vercel.app/](https://calculator-theta-ten-12.vercel.app/)

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS 3 |
| Motion | Framer Motion 12 |
| Icons | Lucide React |

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Install & Run

```bash
# Clone the repository
git clone https://github.com/shivrajpatare/calculator.git
cd calculator

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

## Features

- **Live calculations** — results update instantly while typing
- **Tip presets** (5%, 10%, 15%, 25%, 50%) with a travelling highlight animation
- **Custom tip** input that coexists cleanly with presets
- **Inline validation** — calm, non-disruptive error messages
- **Input sanitisation** — handles pasted text, garbage input, rapid typing
- **Full reset** — clears all fields, validation, and active states
- **Mobile-first** — 48px touch targets, iOS zoom prevention, dynamic viewport height
- **Accessible** — skip link, `aria-live` results, `aria-pressed` toggles, `focus-visible` rings
- **Reduced motion** — respects `prefers-reduced-motion` across all animations
- **Dark theme** — purpose-built dark UI, not an afterthought

## Project Structure

```
src/
├── components/     # Reusable UI primitives
├── constants/      # Presets, validation rules, motion tokens
├── sections/       # Page-level compositions (InputSection, ResultPanel)
├── styles/         # Global CSS + Tailwind base
└── utils/          # Calculation, validation, sanitisation helpers
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Future Improvements

While the current implementation focuses strictly on polished interaction design, accessibility, and resilient frontend execution for the assessment MVP, reasonable future evolutions could include:

- **Locale-Aware Formatting:** Extending currency displays to support international formats and region-specific number systems.
- **Session Persistence:** Utilizing lightweight `localStorage` to preserve calculation states across accidental page reloads.
- **Export & Share:** Allowing users to copy a clean text summary of the final split for easy sharing in group messages.
