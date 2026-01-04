# Project Name: Portfolio

## 1. Project Overview

- **References**
  - [Piotr Zadka CV](https://nextcloud.piotrzadka.dev/index.php/s/Men9EaFDCk2fy3a)
  - [Piotr Zadka GitHub Profile](https://github.com/piotrzadka)

- **Purpose:** Build a portfolio website that communicates my professional narrative, showcases my craft, and establishes my personal brand as a developer.
- **Target Audience:** Potential employers, clients, and collaborators.
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
- **Background (Light):** `#fafafa` (soft white)
- **Foreground (Dark):** `#e5e5e5` (soft white text)
- **Foreground (Light):** `#171717` (near-black text)
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
- **Content (General):** Local TypeScript data files (in `src/data/`).
- **Content (Blog):** MDX (Markdown + JSX) for rich posts with code highlighting.
- **Styling/UI:** Tailwind CSS 4 with CSS variables for theming.
- **Fonts:** Next.js Font Optimization (Inter, JetBrains Mono).
- **Animations:** CSS transitions + Tailwind animation utilities.

---

## 5. Hosting & Infrastructure

- **Hosting:** Vercel (Zero-config deployment via CLI).
- **Domain:** piotrzadka.dev (Cloudflare DNS pointing to Vercel).

---

## 6. Implementation Plan

> **Session Protocol:** At the start of each session, agents should read this file to understand current progress. Mark items `[x]` when complete.

### Phase 0: Design Foundation

- [ ] Define design tokens in `globals.css` (colors, typography, spacing)
- [ ] Set up dark/light mode CSS variables
- [ ] Configure Inter and JetBrains Mono fonts
- [ ] Create subtle grid background pattern

### Phase 1: Architecture & Layout

- [ ] Create `src/types/index.ts` with rich interfaces (Profile, Experience, CaseStudy, BlogPost)
- [ ] Create shared layout (`Header`, `Footer`) with navigation
- [ ] Implement dark/light mode toggle component
- [ ] Set up smooth scroll and page transition foundations

### Phase 2: Data Layer

- [ ] Create `src/data/profile.ts` (personal info, social links)
- [ ] Create `src/data/experience.ts` (career timeline with impact statements)
- [ ] Create `src/data/projects.ts` (case study structure)
- [ ] Create `src/content/blog/` directory for MDX posts

### Phase 3: Component Development

**UI Primitives:**

- [ ] `Container` - Max-width wrapper with responsive padding
- [ ] `Section` - Semantic section with consistent spacing
- [ ] `Button` - Primary/secondary variants with hover states
- [ ] `Card` - Elevated surface with hover lift effect
- [ ] `Badge` - Technology/skill tags

**Feature Components:**

- [ ] `HeroSection` - Animated typing effect, value proposition, CTA
- [ ] `ExperienceTimeline` - Interactive, expandable career entries
- [ ] `CaseStudyCard` - Project preview with image and summary
- [ ] `CaseStudyDetail` - Full case study layout (problem/approach/results)
- [ ] `ContactSection` - Contact info with social links
- [ ] `AboutSection` - Personal story with photo

**Blog System:**

- [ ] Configure MDX with syntax highlighting
- [ ] `PostList` - Blog index with previews
- [ ] `PostLayout` - Individual post template with metadata

### Phase 4: Page Assembly

- [ ] Build homepage (`/`) - Hero, Experience preview, Featured projects, Contact CTA
- [ ] Build experience page (`/experience`) - Full timeline
- [ ] Build projects page (`/projects`) - Case study grid
- [ ] Build individual project pages (`/projects/[slug]`)
- [ ] Build blog index (`/blog`)
- [ ] Build blog post pages (`/blog/[slug]`)
- [ ] Build about page (`/about`)

### Phase 5: Content Population

- [ ] Write hero copy and tagline
- [ ] Populate experience data from CV (with impact statements)
- [ ] Create 2-3 case study entries (problem/approach/results format)
- [ ] Write about page content
- [ ] Create 1 sample blog post (technical deep-dive)

### Phase 6: Polish & Optimization

- [ ] Verify mobile responsiveness (test at 320px, 768px, 1024px, 1440px)
- [ ] Audit accessibility (color contrast, focus states, ARIA labels)
- [ ] Configure SEO metadata (title, description, Open Graph, Twitter cards)
- [ ] Add favicon and social preview image
- [ ] Performance audit (Lighthouse score target: 90+)

### Phase 7: Deploy

- [ ] Run `vercel login` to authenticate
- [ ] Run `vercel link` to connect project
- [ ] Run `vercel deploy --prod` for production deployment
- [ ] Configure custom domain (piotrzadka.dev)
- [ ] Verify live site functionality

---

## 7. Content Strategy (Blog)

Initial posts to establish authority and voice:

1. **Technical Deep-Dive:** A detailed walkthrough of a technical challenge solved — demonstrates domain expertise.
2. **Lessons Learned:** Reflections on a project, career decision, or technology adoption — demonstrates continuous improvement.
3. **Opinion Piece:** Perspective on a trend, tool, or practice — demonstrates independent thinking and industry awareness.

---

## 8. Future Enhancements (Post-Launch)

- [ ] Contact form with Server Actions (email integration)
- [ ] RSS feed for blog
- [ ] Reading time estimates on blog posts
- [ ] "Copy link" button on blog posts
- [ ] Analytics (privacy-respecting, e.g., Plausible or Umami)
- [ ] CMS migration (Sanity or Contentful) if content updates become frequent

---

_Last Updated: 2025-01-04_
