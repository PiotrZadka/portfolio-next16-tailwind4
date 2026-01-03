# Project Name: Portfolio

## 1. Project Overview

- **References**
- [Piotr Zadka CV](https://nextcloud.piotrzadka.dev/index.php/s/Men9EaFDCk2fy3a)
- [Piotr Zadka GitHub Profile](https://github.com/piotrzadka)

- **Purpose:** Build a portfolio website to represent my work, skills and career journey and to serve as a personal brand.
- **Target Audience:** Potential employers, clients, and collaborators.
- **Success Criteria:** The portfolio website should be visually appealing, easy to navigate, and provide a clear overview of my skills and experience. It should also be responsive and mobile-friendly.

---

## 2. Core Features

- **Portfolio:** Basically a digitalised CV section showcasing my work, skills and career journey.
- **Projects:** Recent projects found in CV and my GitHub profile.
- **Blog:** Technical guides, thoughts, and experiences (MDX-based), cross-linked to LinkedIn.
- **About:** About section to display about me.
- **Contact:** Contact section to display contact information.

---

## 3. Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, and Tailwind CSS 4.
- **Backend:** Next.js Server Actions (for contact form and simple logic).
- **Database:** Local JSON/TypeScript Data Files (in `src/data/`).
- **Authentication:** No authentication required. Public access.
- **Content (General):** Local JSON/TS files for easy management.
- **Content (Blog):** MDX (Markdown + JSX) for rich text and code snippets.
- **Styling/UI:** Tailwind CSS 4.

---

## 4. Hosting & Infrastructure

- **Hosting:** Vercel (Zero-config deployment for Next.js).

---

## 5. Implementation Plan

### Phase 1: Architecture & Layout

- Create shared layout (Header, Footer, Navigation).
- Configure global styles and Tailwind 4 theme variables.
- Define TypeScript interfaces for content (Project, Experience, Profile).

### Phase 2: Data Layer

- Create `src/data/` directory.
- Implement typed data files (e.g., `projects.ts`, `profile.ts`) to serve as the "CMS".

### Phase 3: Component Development

- **UI Primitives:** Button, Card, Section, Container.
- **Feature Components:** HeroSection, ProjectCard, ExperienceTimeline, ContactSection.
- **Blog System:** MDX configuration, PostList component, PostLayout.

### Phase 4: Assembly & Content

- Assemble components into the main `page.tsx`.
- Populate data files with initial content from your CV/GitHub.

### Phase 5: Polish & Deploy

- Ensure mobile responsiveness.
- Verify accessibility and SEO metadata.
- **Vercel Setup:** Guide user through Vercel account creation and project import (first-time setup).
- Deploy to Vercel.
