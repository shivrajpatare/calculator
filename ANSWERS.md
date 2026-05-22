# ANSWERS.md

## 1. How to Run the Project

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app opens at `http://localhost:5173`. No additional environment variables or backend services are needed.

To create and preview a production build:

```bash
npm run build
npm run preview
```

**Deployment URL:** _[to be added after deployment]_

---

## 2. Design & Technology Choices

### Why This Stack

**React + TypeScript** — TypeScript catches entire categories of bugs at write-time rather than run-time. For a calculator where numerical correctness matters, having the compiler verify that a `number | null` can't silently flow into a division is genuinely useful, not just "best practice for scale."

**Tailwind CSS** — The app has a single-page, token-driven design system (dark theme, emerald accents, consistent spacing scale). Tailwind made it fast to enforce that system across every component without maintaining a parallel CSS architecture. The utility-first approach also made responsive breakpoints (`sm:`, `md:`) trivial to reason about inline.

**Framer Motion** — Used specifically for three things: (1) the travelling highlight pill when switching tip presets (`layoutId`), (2) subtle value cross-fades in the result panel, and (3) calm error message fade-in/out. These aren't decorative — they reduce the perceived abruptness of state changes and make the UI feel responsive rather than jumpy.

**Vite** — Fast cold starts during development and a small production bundle (~107 KB gzipped). No configuration beyond the defaults was needed.

### Key UX Decisions

**No calculate button.** The assignment calls for live updates, so I treated it as the core interaction principle. Every input event immediately flows through `calculateTip()` via `useMemo`, and the result panel reflects changes within the same render cycle. This means the user never has to wonder "did it update?" — the answer is always yes.

**Touched-field validation.** Errors only appear after a field has received meaningful input. Typing "1" into the bill field and then deleting it will eventually show an error, but opening the app fresh shows zero errors. This prevents the "wall of red on load" problem that makes forms feel hostile.

**Light-touch input sanitisation.** When you paste "abc$12.50xyz" into the bill field, the sanitiser strips letters and symbols but preserves the numeric structure. It never reformats, never moves the cursor, and never blocks a keystroke. The philosophy is: let the user type freely, validate after.

**200% tip cap.** I chose 200% over 100% because real-world scenarios exist where someone wants to tip more than the bill (charity events, small bills with generous tippers). 200% covers those without opening the door to accidental 10,000% paste inputs.

---

## 3. Responsiveness & Accessibility

### Responsive Approach

The layout uses a single breakpoint strategy: stacked on mobile (`grid-cols-1`), side-by-side on desktop (`md:grid-cols-2`). Spacing, typography, and padding scale progressively via `sm:` and `md:` variants.

Specific mobile decisions:
- **48px minimum touch targets** on every interactive element (inputs, buttons, presets) to meet WCAG 2.5.5.
- **`text-base` (16px) on inputs** to prevent iOS Safari from auto-zooming when an input is focused.
- **`min-h-dvh`** (dynamic viewport height) so the layout fills the visible area correctly on mobile browsers where the address bar collapses/expands.
- **Tip preset grid** collapses from 3 columns to 2 on narrow screens, keeping buttons thumb-reachable.

### Accessibility

- **Skip-to-content link** — hidden until focused via keyboard, jumps past the header to `#calculator`.
- **`aria-invalid` + `aria-describedby`** on every input, linked to the inline error message `id`.
- **`aria-pressed`** on tip preset buttons to communicate toggle state.
- **`aria-live="polite"`** on the results region so screen readers announce value changes without interrupting.
- **`role="alert"`** on error messages for immediate announcement.
- **`focus-visible`-only rings** — focus indicators show for keyboard navigation but not for mouse/touch clicks, avoiding visual noise.
- **`prefers-reduced-motion`** — all Framer Motion animations check `useReducedMotion()` and fall back to instant rendering. CSS transitions are also disabled via a global media query.
- **Semantic structure** — `<fieldset>` + `<legend>` for the tip preset group, `<header>`/`<main>`/`<footer>` landmarks.

### One Thing I'd Improve

I would add **automated accessibility testing** using axe-core or Playwright's accessibility assertions. The current accessibility work was done manually — semantic markup, ARIA attributes, contrast checks, keyboard walkthrough — but automated testing would catch regressions as the app evolves. I didn't include it in this submission because the setup time felt disproportionate to the scope, but it's the first thing I'd add in a real project.

---

## 4. AI Tool Usage

I used **AI coding assistants** during development. Here's how:

**What AI helped with:**
- Scaffolding initial file structures and boilerplate (component interfaces, utility function signatures).
- Generating first-draft implementations that I then reviewed, restructured, and refined.
- Suggesting Framer Motion animation patterns (the `layoutId` travelling highlight idea came from an AI suggestion).
- Drafting validation message copy and error strings.

**What I changed from AI output:**
- Reworked the validation timing strategy. The initial suggestion validated on every keystroke including empty fields, which created a hostile UX. I redesigned it with a `touched` tracking system so errors only appear after meaningful interaction.
- Restructured the input sanitisation approach. The AI-generated version aggressively reformatted values on input, which caused cursor jumping. I replaced it with a light-touch filter that only strips impossible characters.
- Adjusted all spacing, typography scales, and responsive breakpoints by hand after reviewing the rendered output on different viewport sizes.
- Added all accessibility attributes manually — `aria-pressed`, `aria-live`, `fieldset`/`legend` grouping, skip link, `focus-visible` distinction, and reduced-motion handling were intentional additions based on my understanding of WCAG, not AI suggestions.

**Summary:** AI accelerated the implementation, but every interaction design decision, validation strategy, accessibility pattern, and UX behavior was evaluated and shaped by my own judgment.

---

## 5. Known Limitations & Future Improvements

**No automated testing.** The app has no unit tests or integration tests. The calculation utilities (`calculateTip`, `formatCurrency`) and validation functions (`validateBill`, `validateTip`, `validatePeople`) are pure functions that would be straightforward to test with Vitest. I prioritised shipping a polished interaction experience within the time budget, but testing is the obvious next step.

**Currency is USD-only.** The `formatCurrency` utility hardcodes `en-US` and `USD`. For a real product, this would need locale-aware formatting and currency selection — but for a tip calculator assessment, a single clean formatter felt like the right scope.

**No persistent state.** Refreshing the page loses all input. Adding `localStorage` persistence would take minutes, but I chose not to include it because the assignment didn't call for it and I didn't want to introduce scope that might look like padding.
