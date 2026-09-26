# Project review

## Current implementation

- React 19, TypeScript, TanStack Start/Router, Vite 8 and Tailwind CSS 4. Lovable's build configuration and existing Bun lockfile are preserved.
- One homepage route in `src/routes/index.tsx`. The router and root layout provide React Query, the document shell, error handling and a 404 view.
- Approved copy is centralized in `src/content/home.ts`, transcribed from `IGNITE WEBSITE DESIGN GUIDE - HOME PAGE.docx`.
- The homepage follows the guide's sequence: hero, brAInify product highlight, This is IGNITE, Media, Business Opportunity, footer.
- The landscape hero retains its image and visual treatment with the client's headline and paragraph. The remaining sections use new typography, warm neutral backgrounds, a brAInify visual, portrait composition, illustrated globe, dark green business CTA and a large footer wordmark.
- The unrelated nutrition catalogue, invented press list, regional map and newsletter were removed from the homepage. Original assets remain in the repository.
- Search filters the homepage's sections. Mobile navigation, section anchors, inquiry dialogs, scroll reveals, reduced-motion preferences and back-to-top navigation work locally.
- Footer includes all five client-specified link groups, the policy labels, five social icons, contact email and full copyright/trademark notice.
- Google Fonts remain external, with sans-serif fallbacks. Images are bundled locally; the media globe is CSS.

## Client details still needed

- The guide contains only `IGNITE KZ ADDRESS` and `IGNITE KZ NUMBER` placeholders, not actual contact details. Populate `siteDetails.address` and `siteDetails.phone` in `src/content/home.ts`; they remain hidden until supplied.
- Confirmed product, affiliate, login, social, policy and content URLs belong in `siteDetails.destinations`, keyed by the displayed destination title. Missing destinations currently open an inquiry dialog with the supplied email. The main business CTA uses the `Become a Brand Affiliate` destination.
- No authentication, enrollment, payment, database or email-delivery backend is implemented. Inquiry links use the visitor's email application.
- Language dropdown shows English, Russian and Kazakh options only; translation is not implemented.
- The media section uses the approved overview copy. Actual articles and source URLs are not supplied and are not fabricated.

## Local setup and verification

- Node 22.22.0 and Bun are available under the ignored `.local/` directory. Start with `powershell -ExecutionPolicy Bypass -File .\start-local.ps1`, then open http://127.0.0.1:3000/.
- TypeScript and production build pass. ESLint reports zero errors and six pre-existing Fast Refresh warnings in reusable UI components.
- Chrome checks at 1440, 768, 390 and 320 pixels: all images loaded, no horizontal overflow, no missing anchor targets, all scroll reveals appeared, search filtered/closed correctly, affiliate inquiry opened, and mobile navigation opened/closed correctly.
- Reduced-motion mode disables animation. No uncaught browser exceptions were recorded.
- Desktop/mobile screenshots of every redesigned section were inspected. This is local verification, not evidence of live backend delivery or a complete accessibility audit.
- Current proof: `.local/redesign-results.json`, `.local/redesign-*-full.png`, section screenshots, `.local/redesign-build.log` and `.local/redesign-lint.log`.

## Interactive experience addition

- Added `src/components/home/ignite-experience.tsx`: a dark, full-width interactive section after brAInify with a Canvas particle sculpture, orbiting accents and three selectable Learn / Connect / Grow states.
- The sculpture morphs between a sphere, torus and helix, with cursor-controlled rotation and a click/tap pulse. The section cycles automatically every eight seconds while visible; manual selection or keyboard focus stops automatic changes. Pause/play controls stop or resume motion.
- Added a moving typography ribbon with its own pause control, cursor depth and light on artwork, magnetic button feedback, a floating portrait emblem and ambient globe/sun movement.
- The canvas renders fewer particles on mobile, caps pixel density, and stops rendering when offscreen, the tab is hidden or motion is paused. Reduced-motion settings show static shapes with working selection controls.
- Existing client copy remains unchanged. The new experience uses additional brand-themed copy; it makes no product, earnings or performance claims.
- Motion checks and screenshots: `.local/motion-results.json`, `.local/motion-*.png`. Verified all three selections, continuous animation, pause/resume, moving-text pause and reduced motion at 1440, 768, 390 and 320 pixels.

## Motion header and page flow

- Rebuilt the plain header as a floating glass navigation shell with an orbiting IGNITE mark, live KZ/RU status, active-section signals, animated login highlight and page scroll progress.
- The header contracts after scrolling. Desktop navigation highlights the currently viewed section; mobile uses a numbered editorial menu with animated orbit artwork.
- Removed the additional geographic graphics from the hero so its photography, message and CTA remain the calm opening statement.
- Added animated transition rails between the major sections, with directional reveals, ambient linework, scan details and scroll-linked background movement that carries the eye through the page.
- Product, interactive experience, About, Media, Business Opportunity and footer now each have distinct motion behavior while sharing one visual rhythm. Cursor-reactive movement remains in the interactive experience rather than competing with the hero.
- Motion is disabled by the user's reduced-motion preference while keeping all navigation and content functional.
- Chrome checks at 1440, 768, 390 and 320 pixels confirmed no horizontal overflow, valid anchors, loaded images, working mobile menu/search/dialog interactions and no browser exceptions. Final captures: `.local/header-1440-hero.png`, `.local/header-390-hero.png`, `.local/header-390-menu.png`, `.local/redesign-*-full.png` and `.local/flow-results.json`.
