# Project Name: Portfolio

## 1. Project Overview

- **References**
  - [Piotr Zadka GitHub Profile](https://github.com/piotrzadka)

- **Purpose:** Build a portfolio website that communicates my professional narrative, showcases my craft, and establishes my personal brand as a developer.
- **Target Audience:** Potential employers, clients, and recruiters.
- **Success Criteria:** A visually distinctive, memorable portfolio that demonstrates technical expertise through its own implementation. Fast, accessible, and mobile-first.

---

## 2. Core Features

- **Hero:** Bold introduction with animated typing effect and clear value proposition.
- **Experience Timeline:** Interactive, expandable career journey emphasizing impact and outcomes.
- **Case Studies:** 2-3 deep-dive project showcases with problem/approach/results structure.
- **Blog:** Technical guides and thoughts (MDX-based), strategically positioned for expertise.
- **About:** Personal story, professional values, and motivations.
- **Contact:** Simple, functional contact section with social links.

---

## 3. Design Direction

### Visual Identity

- **Theme:** Dark-mode-first with optional light mode toggle.
- **Personality:** Professional yet approachable. Developer aesthetic, avoiding cliché.

### Color Palette

- **Background (Dark):** `#0a0a0b` (near-black with subtle warmth)
- **Background (Light):** `#e2e8f0` (deep slate blue - easier on eyes)
- **Foreground (Dark):** `#e5e5e5` (soft white text)
- **Foreground (Light):** `#0f172a` (dark slate text)
- **Accent Primary:** `#14b8a6` (teal-500 - modern, tech-forward)
- **Accent Muted:** `#0d9488` (teal-600 - for hover states)
- **Surface:** `#18181b` (zinc-900 - cards, elevated surfaces)
- **Border:** `#27272a` (zinc-800 - subtle separation)

### Typography

- **Headings:** Inter (geometric, modern, highly legible)
- **Body:** Inter (consistency)
- **Code/Mono:** JetBrains Mono (optimized for code readability)
- **Scale:** Fluid typography using clamp() for responsiveness

### Visual Motifs

- Subtle grid pattern background (very low opacity)
- Accent color used sparingly for emphasis (links, buttons, highlights)
- Generous whitespace
- Soft shadows and borders (no harsh edges)
- Micro-animations on interactions (hover, focus, page transitions)

### Micro-Interactions

- Blinking cursor in hero typing effect
- Smooth scroll behavior
- Hover lift on cards (subtle transform + shadow)
- Button press feedback
- Page fade-in on navigation
- Dark/light mode toggle with smooth transition

---

## 4. Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, and Tailwind CSS 4.
- **Backend:** Next.js Server Actions (for contact form).
- **Content (Dynamic):** Sanity CMS for blog posts, projects, and experience data.
- **Content (Static):** Local TypeScript data files (in `src/data/`) for rarely-changing data like profile info.
- **Styling/UI:** Tailwind CSS 4 with CSS variables for theming.
- **Fonts:** Next.js Font Optimization (Inter, JetBrains Mono).
- **Animations:** CSS transitions + Tailwind animation utilities.

### Content Management Strategy

Sanity CMS will manage all frequently-updated content, enabling edits without code deployments:

| Content Type          | Source              | Rationale                               |
| --------------------- | ------------------- | --------------------------------------- |
| Blog posts            | Sanity CMS          | Frequent updates, typo fixes, new posts |
| Projects/Case studies | Sanity CMS          | Occasional updates, rich content        |
| Experience timeline   | Sanity CMS          | Career updates without deploys          |
| Profile info          | Local (`src/data/`) | Rarely changes, simple structure        |
| Skills list           | Local (`src/data/`) | Rarely changes                          |

**Workflow:** Edit in Sanity Studio → Save → Webhook triggers Vercel rebuild → Site updates (~30-60s)

---

## 5. Hosting & Infrastructure

- **Hosting:** Vercel (Zero-config deployment via CLI).
- **CMS:** Sanity (headless CMS with real-time editing).
- **Domain:** piotrzadka.dev (Cloudflare DNS pointing to Vercel).
- **CI/CD:** GitHub → Vercel (auto-deploy on push) + Sanity webhooks (rebuild on content change).

---

## 6. Implementation Plan

> **Session Protocol:** At the start of each session, agents should read this file to understand current progress. Mark items `[x]` when complete.

### Phase 0: Design Foundation

- [x] Define design tokens in `globals.css` (colors, typography, spacing)
- [x] Set up dark/light mode CSS variables
- [x] Configure Inter and JetBrains Mono fonts
- [x] Create subtle grid background pattern

### Phase 1: Architecture & Layout

- [x] Create `src/types/index.ts` with rich interfaces (Profile, Experience, CaseStudy, BlogPost)
- [x] Create shared layout (`SidebarNav`, `Footer`) with navigation
- [x] Implement dark/light mode toggle component
- [x] Set up smooth scroll and page transition foundations

### Phase 2: Data Layer

- [x] Create `src/data/profile.ts` (personal info, social links)
- [x] Create `src/data/experience.ts` (career timeline with impact statements)
- [x] Create `src/data/projects.ts` (case study structure)
- [x] Create `src/content/blog/` directory for MDX posts

### Phase 3: Component Development

**UI Primitives:**

- [x] `Container` - Max-width wrapper with responsive padding
- [x] `Section` - Semantic section with consistent spacing
- [x] `Button` - Primary/secondary variants with hover states
- [x] `Card` - Elevated surface with hover lift effect
- [x] `Badge` - Technology/skill tags

**Feature Components:**

- [x] `HeroSection` - Animated typing effect, value proposition, CTA
- [x] `ExperienceTimeline` - Interactive, expandable career entries
- [x] `CaseStudyCard` - Project preview with image and summary
- [x] `CaseStudyDetail` - Full case study layout (problem/approach/results)
- [x] `ContactSection` - Contact info with social links
- [x] `AboutSection` - Personal story with animated code terminal

**Blog System:**

- [x] Configure MDX with syntax highlighting
- [x] `PostList` - Blog index with previews
- [x] `PostLayout` - Individual post template with metadata

### Phase 4: Page Assembly

- [x] Build homepage (`/`) - Hero, Experience preview, Featured projects, Contact CTA
- [x] Build experience page (`/experience`) - Full timeline
- [x] Build projects page (`/projects`) - Case study grid
- [x] Build individual project pages (`/projects/[slug]`)
- [x] Build blog index (`/blog`)
- [x] Build blog post pages (`/blog/[slug]`)
- [x] Build about page (`/about`)

### Phase 5: Content Population

- [x] Write hero copy and tagline
- [x] Populate experience data from CV (with impact statements)
- [x] Create 2-3 case study entries (problem/approach/results format)
- [x] Write about page content
- [x] Create 1 sample blog post (technical deep-dive)

### Phase 6: Polish & Optimization

- [x] Verify mobile responsiveness (test at 320px, 768px, 1024px, 1440px)
- [x] Audit accessibility (color contrast, focus states, ARIA labels)
- [x] Configure SEO metadata (title, description, Open Graph, Twitter cards)
- [x] Add favicon and social preview image
- [x] Performance audit (Lighthouse score target: 90+)

### Phase 7: Sanity CMS Integration

- [x] Create Sanity project and install dependencies (`sanity`, `next-sanity`)
- [x] Define Sanity schemas (blog posts, projects, experience)
- [x] Set up Sanity Studio (embedded at `/studio`)
- [x] Create Sanity client and GROQ queries
- [x] Migrate blog pages to fetch from Sanity
- [x] Migrate projects pages to fetch from Sanity
- [x] Migrate experience data to fetch from Sanity
- [x] Test content editing workflow in Sanity Studio
- [x] Remove legacy MDX files and local data files (cleanup)

### Phase 8: GitHub & Vercel Integration

- [x] Push code to GitHub repository
- [x] Connect GitHub repo to Vercel
- [x] Configure Environment Variables in Vercel dashboard
- [x] Configure Sanity webhook to trigger Vercel rebuilds
- [x] Test end-to-end: Sanity edit → webhook → Vercel rebuild → live update

### Phase 9: Pre-Deployment QA

- [x] Manual testing of all pages and interactions
- [x] Verify Sanity content renders correctly
- [x] Test on multiple browsers (Chrome, Firefox, Safari)
- [x] Test on mobile devices
- [x] Fix any noticeable bugs
- [x] Final approval from owner

### Phase 10: Production Deployment (In Progress)

- [x] Run `vercel login` to authenticate
- [x] Run `vercel link` to connect project
- [x] Run `vercel deploy --prod` for production deployment
- [x] Configure custom domain (piotrzadka.dev)
- [x] Verify live site functionality
- [x] Set up Sanity production dataset (if using separate dev/prod)

---

## 7. Content Strategy (Blog)

Initial posts to establish authority and voice:

1. **Technical Deep-Dive:** A detailed walkthrough of a technical challenge solved — demonstrates domain expertise.
2. **Lessons Learned:** Reflections on a project, career decision, or technology adoption — demonstrates continuous improvement.
3. **Opinion Piece:** Perspective on a trend, tool, or practice — demonstrates independent thinking and industry awareness.

---

## 8. Future Enhancements (Post-Launch)

- [ ] Unit tests with Vitest (component and utility testing)
- [ ] Contact form with Server Actions (email integration)
- [ ] RSS feed for blog
- [ ] Reading time estimates on blog posts
- [ ] "Copy link" button on blog posts
- [ ] Analytics (privacy-respecting, e.g., Plausible or Umami)
- [x] Sanity Studio preview mode (live preview while editing)

---

_Last Updated: 2026-01-05_
