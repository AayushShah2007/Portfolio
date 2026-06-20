## Goal
Scroll-driven portfolio with looping video backgrounds, glassmorphism chapter overlays, and alternating left/right chapter scenes, fully responsive and SEO-optimized. Sitemap page is an n8n-style scattered workflow visualization.

## Constraints & Preferences
- Dark mode only, no theme toggle
- Color palette: soft warm gray (#0d0d0f) bg, red accent (#ff6b57), warm peach (#e8a87c) secondary, smoke white (#e8e4dc) text
- Contact form needs backend (Formspree/Web3Forms/EmailJS) — not set up yet
- Ch4 visual currently an API code response card
- Navbar logo hidden in hero and near footer; links take full width when logo hidden — uses `flex:1; justify-content:space-evenly` on `.nav-links`, logo collapses to width:0
- All internal links must resolve (no 404s)
- Fully mobile responsive with 768px and 480px breakpoints

## Progress
### Done
- Hero background: looping Mixkit MP4 video + dark gradient overlay (no Three.js)
- Chapter backgrounds: single `.chapter-video-bg` at `.scroll-story` level looping `videos/bg-chapter.mp4` with glassmorphism overlay
- Chapter video slowed to 0.4x playbackRate
- Ch1 code card (left): syntax-highlighted JSON/CSS typing animation
- Ch2 explosion (right): 12 language icons scatter with staggered delays, 4 concentric wobbling ripples
- Ch3 timeline (left): alternating entries with clickable project links, "Revealing Soon" for current projects
- Ch4 API connect card (right): `connect.js` terminal-style card with async function, syntax highlighting, blinking cursor, green "Ready" status
- Scene containers (`.code-card`, `.explosion-container`, `.scene-timeline`, `.api-card`) excluded from reveal-in animation
- Timeline center gradient line grows top-to-bottom on scroll
- Color palette, footer copyright, SEO tags, Google Analytics, JSON-LD structured data added to all 58 pages
- Theme toggle fully removed from all HTML + CSS + JS
- Contact cards changed to full `<a>` tags
- Mobile responsive: 768px (hamburger with backdrop, body scroll lock) + 480px breakpoints
- Critical JS bug fixed: premature `});` removed, restoring hamburger, loading screen, animations, active nav
- Hero title `y` descender clipping fixed
- Sitemap page redesigned 3 times: final version is static n8n-style workflow with scattered child nodes (zigzag alignment), SVG bezier connections behind cards, dot-grid canvas background, hover path highlighting
- Sitemap canvas centered, non-scrollable on desktop, `min-height: calc(100vh - 260px)`, z-index stack ensures lines behind cards
- Sitemap child nodes (53 cards) added to branch columns with SVG connection lines
- Timeline styles added for about "My Journey" (card layout) and project phases (text format) with distinct per-item colors
- Skill cards on about.html now clickable, linking to respective skills pages
- "Sitemap" link added to navbar on all 58 pages after "About"
- Sitemap nav link now correctly shows as active on sitemap.html
- Mobile responsive fixes: inline grids collapse on project/blog pages, iOS form zoom fixed (font-size:16px), floating buttons 48px, font sizes above 12px minimum, Hire Me visible on mobile
- SEO: canonical URLs fixed site-wide (page-specific instead of all pointing to root), robots.txt and sitemap.xml created (58 URLs)

### In Progress
- (none)

### Blocked
- Contact form has no `action`/`method` — user needs to sign up for Formspree (or similar) and provide endpoint URL

## Key Decisions
- Single section-level chapter video instead of per-chapter
- `backdrop-filter: blur()` for glass effect
- Scene containers excluded from reveal-in animation via explicit CSS overrides
- Removed theme toggle entirely — dark mode only
- JS `playbackRate = 0.4` for chapter video slow-motion
- Navbar logo hidden via `classList.toggle('hidden')` + CSS `opacity:0; width:0; flex:0` — logo fully collapses from flex layout
- Sitemap uses static n8n-style layout: branch headers in a row, child nodes scattered via `align-self` zigzag + staggered column margins, SVG bezier curves behind cards (z-index:1 vs z-index:2), no zoom/pan/drag, no toolbar, no minimap

## Next Steps
- **Replace placeholders**: Search for `G-XXXXXXXXXX` (GA4 ID) and `YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE` across all HTML files with your real values
- Set up contact form backend (Formspree/Web3Forms)
- Deploy and verify all pages render correctly

## Critical Context
- Pixabay download URLs require captcha/auth — use Mixkit CDN or local file instead
- Chapter video overlay uses `pointer-events:none`
- `devicon-nextjs-original` does NOT exist — use `devicon-nextjs-plain`
- The JS had a critical bug where a premature `});` closed the DOMContentLoaded callback early — now fixed
- `.nav-logo.hidden` now sets `opacity:0; width:0; overflow:hidden; padding:0; margin:0; flex:0; min-width:0` to fully remove from layout
- Sitemap JS (`js/sitemap.js`) runs independently from `js/script.js` — draws SVG bezier connections, handles hover path highlighting, recalculates on resize

## Relevant Files
- `index.html`: main page with hero video + 4-chapter scroll story
- `css/style.css`: all chapter animations, explosion/ripple/timeline/api-card styles, nav (flex:1 logo collapse), sitemap workflow styles (scatter layout, SVG z-index, dot-grid canvas), footer grid, responsive breakpoints
- `js/script.js`: scroll reveal IntersectionObserver, navbar scroll behavior, hamburger with overlay, video playbackRate, page transitions
- `js/sitemap.js`: independent JS for sitemap — bezier connection drawing, node hover highlight, resize recalculation
- `sitemap.html`: n8n-style workflow with 58 nodes, SVG connections, scattered child layout, no zoom/pan
- `contact.html`: clickable contact info cards, form without backend
- `about.html`: languages + frameworks skill cards
- `videos/bg-chapter.mp4`: local chapter background video
- `privacy-policy.html`: mentions form data collection (name, email, message)
