# Aayush Shah — Full Stack Developer


Aayush Shah — Full Stack Developer. Scroll-driven portfolio built with vanilla HTML/CSS/JS featuring looping video backgrounds, glassmorphism chapter overlays, alternating left/right scene animations, and an interactive n8n-style sitemap workflow. 58 pages across Projects, Services, Blog (16 posts), Skills, and more. Fully responsive, SEO-optimized, and dark-mode only.

## Features

- **Scroll Story** — Hero section with looping Mixkit video + 4 alternating left/right chapters (code card, explosion, timeline, API connect card)
- **Video Backgrounds** — Section-level looping MP4 at 0.4x speed with `backdrop-filter: blur()` glass overlay
- **Sitemap Workflow** — Interactive n8n-style visualization with SVG bezier connections, zigzag-scattered child nodes, and hover path highlighting
- **Responsive** — Breakpoints at 1024px, 768px, and 480px; hamburger menu with backdrop overlay on mobile
- **Dark Mode** — Single theme, no toggle; palette: `#0d0d0f` bg, `#ff6b57` accent, `#e8a87c` secondary, `#e8e4dc` text
- **58 Pages** — Full site with sections for About, Projects (with case studies), Services, Blog (16 posts), Skills, Contact, and legal pages
- **SEO Optimized** — Page-specific canonical URLs, JSON-LD structured data, Open Graph / Twitter Card meta tags, robots.txt, and sitemap.xml

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Font Awesome 6 / Devicon for icons
- Google Fonts (Playfair Display, Plus Jakarta Sans, DM Sans)
- Google Analytics (placeholder — replace `G-XXXXXXXXXX`)
- Google Search Console (placeholder — replace `YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE`)

## Project Structure

```
├── index.html                 # Home / scroll story
├── about.html                 # Skills & journey timeline
├── contact.html               # Contact info & form
├── sitemap.html               # Visual n8n-style workflow
├── robots.txt                 # Search engine crawling rules
├── sitemap.xml                # XML sitemap (58 URLs)
├── css/
│   └── style.css              # All styles (responsive breakpoints)
├── js/
│   ├── script.js              # Nav, animations, transitions, loading
│   └── sitemap.js             # SVG connection lines for sitemap
├── projects/                  # Project case studies & detail pages
├── services/                  # Service pages (9 services)
├── blog/                      # 16 blog posts
├── skills/                    # Individual skill pages
├── assets/
│   ├── images/                # Project screenshots
│   └── resume/                # Resume PDF
└── videos/
    └── bg-chapter.mp4         # Chapter background video
```

## Getting Started

1. **Clone or download** the repo
2. Open any `.html` file in a browser — no build step required
3. To deploy, upload all files to any static host (Vercel, Netlify, GitHub Pages)

### Before Going Live

Replace the placeholder values across all HTML files:

- **Google Analytics** — Replace `G-XXXXXXXXXX` with your GA4 measurement ID
- **Search Console** — Replace `YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE` with your verification meta tag content
- **Contact Form** — Add `action` and `method` attributes to the form in `contact.html` (Formspree, Web3Forms, or EmailJS)

## Pages

| Section | Pages |
|---------|-------|
| Main | Home, About, Contact, Sitemap, FAQ, Testimonials, Showcase, Achievements, Hire Me, Education, Experience |
| Projects | Overview, EAT O'CLOCK, EventPass, Case Studies, Timeline, Gallery, Tech Stack, Approach, Results |
| Services | Overview, Web Dev, Mobile Apps, API Dev, UI/UX Design, Database, Cloud, Performance, Maintenance, AI Automation |
| Skills | Overview, C, C++, C#, HTML/CSS, JavaScript, Python, SQL, Next.js |
| Blog | 16 posts on Next.js, TypeScript, Supabase, REST APIs, CSS, SEO, Auth, Deployment, and more |
| Legal | Privacy Policy, Terms of Service |

## License

© Aayush Shah. All rights reserved.
