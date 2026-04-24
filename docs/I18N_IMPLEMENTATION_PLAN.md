# i18n Implementation Plan

## 1. Overview

Add bilingual support (English + Polish) to the portfolio with:

- **URL-prefix routing** — `/en/about`, `/pl/about` — clean, SEO-friendly, shareable
- **Auto-detection** — browser locale (`Accept-Language`) determines first-visit language
- **Manual toggle** — EN/PL switcher in navbar, overrides auto-detection via cookie
- **Sanity CMS** — content translated via a `language` field on each document
- **UI strings** — nav labels, buttons, headings stored in JSON files (`next-intl`)
- **Blog posts** — gate left open (schema ready) but no translation required now

---

## 2. Architecture Decision: Why next-intl

| Requirement | next-intl | next-i18next | Custom solution |
|---|---|---|---|
| App Router / RSC compatible | Native | Patchy | Manual |
| TypeScript safe | Yes (auto-generates) | Manual | Manual |
| Vercel-friendly | Yes | Yes | Yes |
| Maintenance burden | Low | High | High |
| Community | 12k+ GitHub stars | Stagnant | — |

`next-intl` is the standard for Next.js 16 i18n. It handles:
- Middleware-based locale detection
- URL rewriting and redirects
- Server Component translations (no "use client" needed)
- `hreflang` tags for SEO

---

## 3. Auto-Detection Logic

```
First visit (no cookie):
  1. Check Accept-Language header (browser sends this automatically)
  2. If user's primary language is Polish → redirect to /pl/... 
  3. Otherwise → /en/...
  4. Fallback: /en/

User clicks PL toggle:
  1. Set cookie NEXT_LOCALE=pl (1 year expiry)
  2. Redirect to /pl/<current-page>

Subsequent visits (cookie present):
  1. Cookie wins over Accept-Language
  2. User stays on chosen locale
```

The toggle in the navbar is just:
```
[ EN ]  [ PL ]   ← clicking navigates to /en/... or /pl/...
```

This means:
- Polish recruiters with a Polish browser automatically see the Polish version
- International visitors see English
- Anyone can override by clicking the toggle
- Shared links preserve the locale in the URL

---

## 4. What Gets Translated Where

### 4.1 UI Strings → `messages/en.json` + `messages/pl.json` (~50 strings)

These are the **small, one-line labels** currently hardcoded in React components.
They rarely change and are bundled at build time (zero runtime cost).

Example structure:

```json
// messages/en.json
{
  "nav": {
    "experience": "Experience",
    "projects": "Projects",
    "blog": "Blog",
    "about": "About",
    "home": "home"
  },
  "hero": {
    "greeting": "Hi, I'm",
    "viewProjects": "View My Projects",
    "contactMe": "Contact Me",
    "viewCV": "View CV"
  },
  "contact": {
    "heading": "Get In Touch",
    "cta": "Say Hello",
    "fallbackText": "I'm always open to new opportunities..."
  },
  "homepage": {
    "experienceHeading": "Latest Experience",
    "experienceDesc": "My professional journey in software engineering.",
    "viewFullTimeline": "View Full Timeline",
    "projectsHeading": "Featured Projects",
    "projectsDesc": "A selection of projects that demonstrate my technical expertise.",
    "viewAllProjects": "View All Projects"
  },
  "blog": {
    "heading": "Blog",
    "description": "Technical guides, thoughts, and insights...",
    "minRead": "min read"
  },
  "projects": {
    "heading": "Projects",
    "description": "A collection of projects that showcase...",
    "backToProjects": "Back to Projects",
    "viewSource": "View Source",
    "liveDemo": "Live Demo",
    "theProblem": "The Problem",
    "theApproach": "The Approach",
    "theResults": "The Results",
    "notFound": "Project Not Found"
  },
  "experience": {
    "heading": "Experience",
    "description": "A detailed timeline of my professional career..."
  },
  "about": {
    "heading": "About Me",
    "description": "Learn more about my background...",
    "technologies": "Technologies"
  },
  "footer": {
    "allRightsReserved": "All rights reserved.",
    "github": "GitHub",
    "linkedin": "LinkedIn",
    "email": "Email"
  },
  "brand": {
    "name": "PIOTR ZADKA",
    "tagline": "piotrzadka.dev"
  }
}
```

### 4.2 Sanity Content → Translated via `language` field

Content types and their translation plan:

| Schema | Translate now? | How |
|---|---|---|
| `profile` | Yes | One document per language (name, tagline, skills) |
| `contact` | Yes | One document per language (text, email, social) |
| `about` | Yes | One document per language (bio, location, skills) |
| `experience` | Yes | Duplicate each entry for Polish |
| `project` | Yes | Duplicate each project for Polish (title, summary, content) |
| `post` (blog) | **Not now** | Add `language` field but don't filter queries yet |

---

## 5. Step-by-Step Implementation

### Phase 1: Install & Configure next-intl

**Step 1.1** — Install dependencies

```bash
npm install next-intl
```

No other packages needed. `next-intl` handles everything: middleware, routing, translations.

**Step 1.2** — Create `src/i18n/request.ts`

This is the translation loader — it reads the correct JSON file based on locale.

```ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

**Why:** `next-intl` calls this on every request. It matches the locale from the URL to the correct JSON file. TypeScript will error if you use a key that doesn't exist in the JSON.

**Step 1.3** — Create `src/i18n/routing.ts`

Central locale configuration — defines available languages, default, and URL prefix behavior.

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "pl"],
  defaultLocale: "en",
  localePrefix: "always", // /en/about and /pl/about
});
```

**Why `localePrefix: "always"`:** Both English and Polish get URL prefixes (`/en/about`, `/pl/about`). This is clearer for SEO, avoids ambiguity when sharing links, and ensures consistent URL structure regardless of language.

**Step 1.4** — Create `src/i18n/navigation.ts`

Provides typed Link/redirect helpers that automatically prepend the locale.

```ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

**Why:** Using `<Link href="/about" locale="pl">` instead of `<Link href="/pl/about">` gives you type safety and automatic locale handling. If you ever change the prefix style, URLs update everywhere.

**Step 1.5** — Create `src/middleware.ts`

The middleware runs on every request and:
1. Detects the locale from the URL or cookie
2. Redirects un-prefixed URLs to the correct locale
3. Sets the `Accept-Language` default on first visit

```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except static files and API routes
  matcher: ["/((?!api|_next|_vercel|studio|.*\\..*).*)"],
};
```

**How auto-detection works in the middleware:**
1. If URL has locale prefix (`/pl/about`) → use it
2. If cookie `NEXT_LOCALE` exists → use it, redirect to prefixed URL
3. If neither → read `Accept-Language` header from browser → match to `pl` if Polish is preferred, otherwise `en`
4. Set the cookie so next requests remember the choice

**Step 1.6** — Update `next.config.ts`

Tell Next.js to use the i18n request handler plugin.

```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// ... existing config ...

export default withNextIntl(nextConfig);
```

---

### Phase 2: Restructure Routes Under `[locale]`

**Step 2.1** — Create `src/app/[locale]/` directory

Move all page and layout logic from `src/app/` into `src/app/[locale]/`.

**Current structure:**
```
src/app/
  layout.tsx          ← root layout
  page.tsx            ← homepage
  template.tsx        ← page transition
  about/page.tsx
  blog/page.tsx
  blog/[slug]/page.tsx
  experience/page.tsx
  projects/page.tsx
  projects/[slug]/page.tsx
  api/                ← stays at root (no locale)
  studio/             ← stays at root (no locale)
```

**New structure:**
```
src/app/
  layout.tsx          ← minimal root layout (html, body, fonts, providers)
  icon.tsx            ← stays at root (favicon doesn't need localization)
  opengraph-image.tsx ← stays at root (root URL OG image)
  globals.css         ← unchanged
  [locale]/
    layout.tsx        ← locale-aware layout (nav, footer, fetches Sanity)
    metadata.ts       ← locale-aware root metadata (hreflang, title)
    page.tsx          ← homepage
    template.tsx      ← page transition
    about/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
    blog/[slug]/opengraph-image.tsx  ← locale-aware blog OG image
    experience/page.tsx
    projects/page.tsx
    projects/[slug]/page.tsx
  api/                ← unchanged
  studio/             ← unchanged
```

**Note on `icon.tsx`:** The favicon stays at the root level. Moving it under `[locale]` would require generating separate favicons at `/en/icon` and `/pl/icon`, which is unnecessary since the favicon doesn't change per language.

**Note on `opengraph-image.tsx`:** The root OG image stays at root level for `https://piotrzadka.dev/`. The per-blog-post OG image at `blog/[slug]/opengraph-image.tsx` moves under `[locale]/blog/[slug]/opengraph-image.tsx` so it receives the locale parameter and can generate locale-aware images.

**Why root layout stays minimal:** `[locale]` becomes a dynamic parameter. The root `layout.tsx` handles the HTML shell, fonts, and analytics. The `[locale]/layout.tsx` handles navigation, footer, and Sanity data fetching (which needs the locale).

**Step 2.2** — Create `src/app/layout.tsx` (new, minimal root layout)

```tsx
import { Inter, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="antialiased font-sans bg-background text-foreground flex flex-col min-h-screen">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
```

**Note:** The `<html>` tag no longer has `lang="en"` — it will be set dynamically in `[locale]/layout.tsx` based on the actual locale.

**Step 2.3** — Create `src/app/[locale]/layout.tsx`

This is where most of the current `layout.tsx` moves, with locale awareness added.

```tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ConsoleNav } from "@/components/layout/ConsoleNav";
import { Footer } from "@/components/layout/Footer";
import { getContact } from "@/lib/sanity";
import { generateMetadata } from "./metadata";

export { generateMetadata };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale exists in our routing config
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Required by next-intl for static rendering
  setRequestLocale(locale);

  const messages = await getMessages();
  const contact = await getContact(locale);

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0" />
      <ConsoleNav />
      <main className="flex-1 relative z-10 pt-14">{children}</main>
      <Footer contact={contact} />
    </NextIntlClientProvider>
  );
}
```

**Why:**
- `NextIntlClientProvider` wraps the app so all Client Components can access translations
- `setRequestLocale(locale)` is required by `next-intl` — it tells the framework what locale this request is using
- `getContact(locale)` now takes a locale parameter to filter Sanity content
- Metadata is in a separate file for cleanliness

**Step 2.4** — Create `src/app/[locale]/metadata.ts`

Generates SEO metadata per locale, including `alternates` for hreflang tags.

```ts
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL("https://piotrzadka.dev"),
    title: {
      default: t("defaultTitle"),
      template: `%s | Piotr Zadka`,
    },
    description: t("defaultDescription"),
    openGraph: {
      locale: locale === "pl" ? "pl_PL" : "en_GB",
      alternateLocale: locale === "pl" ? "en_GB" : "pl_PL",
      url: `https://piotrzadka.dev/${locale === "pl" ? "pl" : ""}`,
      title: t("ogTitle"),
      description: t("ogDescription"),
      siteName: "Piotr Zadka Portfolio",
    },
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `/${loc === "en" ? "" : loc}`])
      ),
    },
  };
}
```

---

### Phase 3: Replace `next/link` with `@/i18n/navigation` Everywhere

**IMPORTANT:** Every file that imports `Link from "next/link"` must change to `{ Link } from "@/i18n/navigation"`. This is not optional — `next-intl`'s Link automatically prepends the locale prefix to all hrefs.

Files that need this change:
- `src/app/[locale]/page.tsx` (homepage — Link + usePathname)
- `src/app/[locale]/about/page.tsx` (about page)
- `src/app/[locale]/blog/page.tsx` (blog listing — Link)
- `src/app/[locale]/blog/[slug]/page.tsx` (blog post — Link)
- `src/app/[locale]/experience/page.tsx` (experience page)
- `src/app/[locale]/projects/page.tsx` (projects listing)
- `src/app/[locale]/projects/[slug]/page.tsx` (project detail — Link + notFound)
- `src/components/layout/ConsoleNav.tsx` (nav — Link + usePathname)
- `src/components/layout/HeroSection.tsx` (client component — Link)
- `src/components/layout/ContactSection.tsx` (server component — Link)
- `src/components/layout/AboutSection.tsx` (server component — Link)
- `src/components/layout/Footer.tsx` (server component — Link)
- `src/app/[locale]/template.tsx` (page transition — no Link used, this stays unchanged)

**Also replace `usePathname from "next/navigation"` with `usePathname from "@/i18n/navigation"` in client components.** The locale-aware `usePathname` returns the path WITHOUT the locale prefix (e.g., `/about` for both `/en/about` and `/pl/about`), which is important for active-link detection and the language toggle.

**Server Components** use `import { redirect } from "@/i18n/navigation"` instead of `import { redirect } from "next/navigation"`.

---

### Phase 4: Convert All Pages to Use `t()` and `generateMetadata`

**Step 4.1** — Pattern for every page

Every page under `[locale]` needs two things done:
1. **Sanity fetch calls** accept `locale` as a parameter
2. **Hardcoded strings** (headings, descriptions, button text) come from `getTranslations()`
3. **Metadata** changes from `export const metadata: Metadata = { ... }` to `export async function generateMetadata()` using `getTranslations()`

**Step 4.2** — `src/app/[locale]/page.tsx` (homepage)

```tsx
import { getTranslations, getLocale } from "next-intl/server";
import { draftMode } from "next/headers";
import { HeroSection } from "@/components/layout/HeroSection";
import { ExperienceTimeline } from "@/components/layout/ExperienceTimeline";
import { CaseStudyCard } from "@/components/layout/CaseStudyCard";
import { ContactSection } from "@/components/layout/ContactSection";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Link, ArrowRight } from "@/i18n/navigation";
import {
  getProfile, getContact, getAbout, getExperiences, getProjects,
} from "@/lib/sanity";

export const dynamic = "force-dynamic";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { isEnabled: preview } = await draftMode();
  const t = await getTranslations({ locale, namespace: "homepage" });
  const heroT = await getTranslations({ locale, namespace: "hero" });

  const [profileData, contactData, aboutData, experience, projects] =
    await Promise.all([
      getProfile(locale, preview),
      getContact(locale, preview),
      getAbout(locale, preview),
      getExperiences(locale, preview, 2),
      getProjects(locale, preview, 3),
    ]);

  return (
    <div className="flex flex-col gap-0">
      <HeroSection
        name={profileData?.name || heroT("fallbackName")}
        tagline={profileData?.tagline || ""}
        resume={aboutData?.resumeFile || aboutData?.resume}
        greeting={heroT("greeting")}
        viewProjects={heroT("viewProjects")}
        contactMe={heroT("contactMe")}
        viewCV={heroT("viewCV")}
      />

      <Section className="bg-muted/50 pt-8 md:pt-12 lg:pt-16">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {t("experienceHeading")}
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                {t("experienceDesc")}
              </p>
            </div>
            <Link href="/experience" className="hidden md:block">
              <Button variant="ghost" className="gap-2">
                {t("viewFullTimeline")} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <ExperienceTimeline items={experience} />
          <div className="mt-8 md:hidden text-center">
            <Link href="/experience">
              <Button variant="outline" className="w-full">
                {t("viewFullTimeline")}
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {t("projectsHeading")}
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                {t("projectsDesc")}
              </p>
            </div>
            <Link href="/projects" className="hidden md:block">
              <Button variant="ghost" className="gap-2">
                {t("viewAllProjects")} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => (
              <CaseStudyCard key={project.id} project={project} />
            ))}
          </div>
          <div className="mt-12 md:hidden text-center">
            <Link href="/projects">
              <Button variant="outline" className="w-full">
                {t("viewAllProjects")}
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      <ContactSection
        email={contactData?.email || ""}
        social={contactData?.social || { github: "", linkedin: "" }}
        text={contactData?.text}
      />
    </div>
  );
}
```

**Pattern:** Each page accepts `params: Promise<{ locale: string }>`, passes `locale` to all Sanity fetches, and uses `getTranslations({ locale, namespace: "..." })` for hardcoded strings.

**Step 4.3** — Every other page follows the same pattern

| Page | Namespace | Changes |
|---|---|---|
| `[locale]/about/page.tsx` | `"about"` | Replace inline queries with `getAbout(locale, preview)` + `getContact(locale, preview)`, replace h1 and subtitle with `t()`, convert `metadata` to `generateMetadata` |
| `[locale]/experience/page.tsx` | `"experience"` | Pass `locale` to `getExperiences(locale, preview)`, replace h1 and subtitle with `t()`, convert `metadata` to `generateMetadata` |
| `[locale]/blog/page.tsx` | `"blog"` | Replace h1 and description with `t()`, replace "min read" in template with `t("minRead")`, convert `metadata` to `generateMetadata` |
| `[locale]/projects/page.tsx` | `"projects"` | Pass `locale` to `getProjects(locale, preview)`, replace h1 and subtitle with `t()`, convert `metadata` to `generateMetadata` |
| `[locale]/projects/[slug]/page.tsx` | `"projects"` | Replace local `getProject` with `getProject(slug, locale, preview)`, replace "Back to Projects", "View Source", "Live Demo", "The Problem", "The Approach", "The Results", "Project Not Found" with `t()`, convert `generateMetadata` to use translations for fallback titles |

**Step 4.4** — Convert static metadata to `generateMetadata`

Each page currently has:
```ts
export const metadata: Metadata = {
  title: "About",
  description: "...",
  openGraph: { title: "About", description: "..." },
  twitter: { title: "About", description: "..." },
};
```

This becomes:
```ts
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    twitter: {
      title: t("twitterTitle"),
      description: t("twitterDescription"),
    },
  };
}
```

Note: The `projects/[slug]/page.tsx` already uses `generateMetadata` — it needs to keep the existing logic (fetching project data) but wrap fallback strings (like "Project Not Found") in translations.

---

### Phase 5: Update Components to Use Translations

**Step 5.1** — `ConsoleNav` (Client Component)

Since `ConsoleNav` is a `"use client"` component, it uses the `useTranslations` hook.

```tsx
"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
// ... other imports

export function ConsoleNav() {
  const t = useTranslations("nav");
  const locale = useLocale();

  const navItems = [
    { label: t("experience"), href: "/experience" },
    { label: t("projects"), href: "/projects" },
    { label: t("blog"), href: "/blog" },
    { label: t("about"), href: "/about" },
  ];

  // ... rest of component

  return (
    <>
      {/* Nav items use the translated labels */}
      {/* Add language toggle */}
      <div className="flex items-center gap-2">
        <Link
          href={usePathname()}
          locale="en"
          className={cn(
            "text-xs font-mono",
            locale === "en" ? "text-primary" : "text-muted-foreground"
          )}
        >
          EN
        </Link>
        <span className="text-border">/</span>
        <Link
          href={usePathname()}
          locale="pl"
          className={cn(
            "text-xs font-mono",
            locale === "pl" ? "text-primary" : "text-muted-foreground"
          )}
        >
          PL
        </Link>
      </div>
    </>
  );
}
```

**Key change:** Import `Link` and `usePathname` from `@/i18n/navigation` instead of `next/link` / `next/navigation`. This Link automatically prepends the locale to the URL. The `locale` prop on the toggle links tells next-intl to switch locale while staying on the same page.

**Step 5.2** — `HeroSection` (Client Component)

Currently a `"use client"` component receiving `name`, `tagline`, `resume` as props. Update to also accept the translated strings:

```tsx
interface HeroSectionProps {
  name: string;
  tagline: string;
  resume?: string;
  greeting: string;        // NEW — "Hi, I'm" or "Cześć, jestem"
  viewProjects: string;    // NEW — "View My Projects" or "Zobacz projekty"
  contactMe: string;       // NEW — "Contact Me" or "Kontakt"
  viewCV: string;          // NEW — "View CV" or "Zobacz CV"
}
```

Replace hardcoded strings with these props. Also change `import Link from "next/link"` to `import { Link, usePathname } from "@/i18n/navigation"`.

**Step 5.3** — `ContactSection` (Server Component)

Currently a Server Component with hardcoded "Get In Touch", "Say Hello", "GitHub", "LinkedIn". Pass translated strings from the parent page. Change `import Link from "next/link"` to `import { Link } from "@/i18n/navigation"`.

```tsx
interface ContactSectionProps {
  email: string;
  social: SocialLinks;
  text?: string;
  heading: string;       // NEW — "Get In Touch" or "Skontaktuj się"
  cta: string;           // NEW — "Say Hello" or "Przywitaj się"
  githubLabel: string;   // NEW — "GitHub"
  linkedinLabel: string; // NEW — "LinkedIn"
}
```

**Step 5.4** — `AboutSection` (Server Component)

Replace hardcoded "View CV" and "Technologies" with `t()` calls. Since it's a Server Component under `[locale]`, it can use `getTranslations()` directly, OR receive strings as props from the parent page. Props are simpler and avoid coupling:

```tsx
interface AboutSectionProps {
  profile: { about: string; location: string; skills?: string[]; resume?: string };
  viewCV: string;       // NEW
  technologies: string; // NEW
}
```

**Step 5.5** — `Footer` (Server Component)

Replace hardcoded "All rights reserved.", "GitHub", "LinkedIn", "Email" with `t()` calls passed as props. Change `import Link from "next/link"` to `import { Link } from "@/i18n/navigation"`.

```tsx
interface FooterProps {
  contact?: { email?: string; social?: { github?: string; linkedin?: string } };
  allRightsReserved: string;  // NEW
  github: string;             // NEW
  linkedin: string;           // NEW
  email: string;              // NEW
}
```

### Phase 4: Sanity Schema Changes

**Step 4.1** — Add `language` field to all schemas

Each schema gets this field added:

```ts
defineField({
  name: "language",
  title: "Language",
  type: "string",
  initialValue: "en",
  options: {
    list: [
      { title: "English", value: "en" },
      { title: "Polish", value: "pl" },
    ],
    layout: "radio",
  },
  validation: (Rule) => Rule.required(),
}),
```

Add to: `profile.ts`, `contact.ts`, `about.ts`, `experience.ts`, `project.ts`, `post.ts`

**Why `layout: "radio"`:** Forces exactly one language per document. Prevents accidental mixed-language documents.

**Step 4.2** — Update Sanity preview config

Add `language` to the preview selectors so editors can see which language a document is in:

```ts
// In experience.ts
preview: {
  select: {
    title: "role",
    subtitle: "company",
    language: "language",
  },
  prepare({ title, subtitle, language }) {
    const flag = language === "pl" ? "🇵🇱" : "🇬🇧";
    return {
      title,
      subtitle: `${subtitle} ${flag}`,
    };
  },
},
```

**Why:** Sanity Studio will show a flag emoji next to each document so editors can immediately identify the language.

**Step 4.3** — ⚠️ CRITICAL: Sanity migration gap

There is a **migration gap window** between deploying the schema changes and manually editing existing documents:

- New schemas add `language` field with `initialValue: "en"` for **new** documents
- **Existing** documents will have `language` set to `null` (the field doesn't exist on them yet)
- GROQ queries filtering with `language == $locale` will return **NO results** for existing documents
- The site would show empty pages until you manually set `language: "en"` on every existing document

**Fix:** Use a GROQ fallback in all queries during the transition:

```
// Instead of:   *[_type == "profile" && language == $locale][0]
// Use:          *[_type == "profile" && (!defined(language) || language == $locale)][0]
```

This catches both existing documents (where `language` is undefined/null, defaulting to English) and new Polish documents. Once you have manually verified all English documents have `language: "en"`, you can remove the `!defined(language)` fallback.

**Migration steps (IMPORTANT — do NOT skip):**

1. Deploy schema changes + updated code → site shows English content (fallback catches nulls)
2. Open Sanity Studio
3. For each existing document (profile, contact, about, each experience, each project):
   - Open the document
   - Verify `language` is set to `English` (initialValue applies on save)
   - Click **Publish**
4. After all English documents are saved with `language: "en"`, remove the `!defined(language)` fallback from GROQ queries
5. To add Polish versions:
   - Duplicate an English document in the Studio
   - Change `language` to `Polish`
   - Translate the content fields
   - Save as a new document

**Blog posts (post type):** No action needed now. The `language` field exists on the schema but the GROQ query does NOT filter on it, so existing posts appear regardless. When you're ready to translate blog posts:
1. Create Polish duplicates
2. Add `&& language == $locale` to the blog GROQ query
3. Existing posts will continue to show in both languages until you add the filter

---

### Phase 5: Update Data Fetching Functions

**Step 5.1** — ⚠️ GROQ fallback filter for migration safety

Until all existing documents have been manually updated with `language: "en"`, use the fallback filter `(!defined(language) || language == $locale)`. After migration, remove the `!defined(language)` part.

**Step 5.2** — Update `src/lib/sanity.ts`

Add `locale` parameter, fallback filter, and locale-aware queries:

```ts
export async function getProfile(locale: string, preview = false) {
  const query = `*[_type == "profile" && (!defined(language) || language == $locale)][0] {
    name, title, tagline, skills
  }`;
  return await sanityFetch<any>({
    query,
    params: { locale },
    preview,
  });
}

export async function getContact(locale: string, preview = false) {
  const query = `*[_type == "contact" && (!defined(language) || language == $locale)][0] {
    email, social, text
  }`;
  return await sanityFetch<any>({
    query,
    params: { locale },
    preview,
  });
}

export async function getAbout(locale: string, preview = false) {
  const query = `*[_type == "about" && (!defined(language) || language == $locale)][0] {
    about, location, skills, resume, "resumeFile": resumeFile.asset->url
  }`;
  return await sanityFetch<any>({
    query,
    params: { locale },
    preview,
  });
}

export async function getExperiences(
  locale: string,
  preview = false,
  limit?: number
) {
  const limitStr = limit ? `[0...${limit}]` : "";
  const query = `*[_type == "experience" && (!defined(language) || language == $locale)] | order(order asc) ${limitStr} {
    "id": _id, company, role, startDate, endDate, description, impact, technologies
  }`;
  return await sanityFetch<Experience[]>({
    query,
    params: { locale },
    preview,
  });
}

export async function getProjects(locale: string, preview = false, limit?: number) {
  const limitStr = limit ? `[0...${limit}]` : "";
  const query = `*[_type == "project" && (!defined(language) || language == $locale)] ${limitStr} {
    "id": _id, title, "slug": slug.current, summary,
    "coverImage": coverImage.asset->url, technologies, links
  }`;
  return await sanityFetch<CaseStudy[]>({
    query,
    params: { locale },
    preview,
  });
}

export async function getProject(slug: string, locale: string, preview = false) {
  const query = `*[_type == "project" && slug.current == $slug && (!defined(language) || language == $locale)][0] {
    "id": _id, title, "slug": slug.current, summary,
    "coverImage": coverImage.asset->url, technologies, links, content
  }`;
  return await sanityFetch<CaseStudy | null>({
    query,
    params: { slug, locale },
    preview,
  });
}
```

**Pattern for all functions:** Use `(!defined(language) || language == $locale)` GROQ filter and pass `locale` as a query parameter. This ensures existing documents (with null language) match the `en` locale while also allowing filtered Polish documents.

**Step 5.3** — ⚠️ CRITICAL: `src/app/[locale]/about/page.tsx` has its own inline Sanity queries

The about page at `src/app/about/page.tsx` does NOT use `src/lib/sanity.ts`. It has its own `getAboutData` and `getContactData` functions with hardcoded queries:

```ts
// Current (doesn't use sanity.ts):
const aboutQuery = `*[_type == "about"][0] { about, location, skills, resume, "resumeFile": resumeFile.asset->url }`;
const contactQuery = `*[_type == "contact"][0] { email, social, text }`;

// Fix: Replace with calls to the updated sanity.ts
import { getAbout, getContact } from "@/lib/sanity";
const aboutData = await getAbout(locale, preview);
const contactData = await getContact(locale, preview);
```

The about page also has hardcoded text "About Me" (h1) and "Learn more about..." (subtitle). These need `getTranslations()` calls.

**Step 5.4** — Update `src/lib/blog.ts` (leave open for future blog translation)

**Step 5.4** — Update `src/lib/blog.ts` (leave open for future)

```ts
export async function getBlogPosts(preview = false): Promise<BlogPost[]> {
  // NOTE: No language filter yet.
  // When ready to translate blog posts, add:
  // && language == $locale
  // and accept a locale parameter.
  const query = `*[_type == "post"] | order(date desc) {
    "id": _id,
    "slug": slug.current,
    title,
    excerpt,
    date,
    readTime,
    tags,
    externalUrl,
    linkedinHook,
    "socialImage": socialImage.asset->url,
    content
  }`;

  return await sanityFetch<BlogPost[]>({ query, preview });
}
```

**Why:** The `language` field exists on the `post` schema but we don't filter on it. All blog posts (both English and future Polish) will show on the blog page. You can create Polish blog posts later and they'll appear alongside English ones until you enable the filter.

**Step 5.5** — Update `blog/[slug]/opengraph-image.tsx` with locale awareness

The per-blog-post OG image generator at `src/app/blog/[slug]/opengraph-image.tsx` moves to `src/app/[locale]/blog/[slug]/opengraph-image.tsx`. It currently calls `getBlogPost(slug, false)` without locale. Since blog posts aren't locale-filtered, this works as-is. The only change needed is:
1. Move the file to the `[locale]` path
2. Accept `params: Promise<{ locale: string; slug: string }>` instead of just `slug`

```tsx
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug, false);
  // ... rest unchanged
}
```

---

### Phase 6: Language Toggle Component

**Step 6.1** — Add toggle to `ConsoleNav`

The toggle uses `Link` from `@/i18n/navigation` with the `locale` prop to switch languages. It preserves the current page so flipping from `/pl/about` goes to `/en/about` (or `/about` if using `as-needed` prefix).

```tsx
// Inside ConsoleNav, alongside ThemeToggle
<LanguageToggle />

// New component:
function LanguageToggle() {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <div className="flex items-center gap-0.5 text-xs font-mono">
      <Link
        href={pathname}
        locale="en"
        className={cn(
          "px-1 py-0.5 rounded transition-colors",
          locale === "en"
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </Link>
      <span className="text-border/40">/</span>
      <Link
        href={pathname}
        locale="pl"
        className={cn(
          "px-1 py-0.5 rounded transition-colors",
          locale === "pl"
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        PL
      </Link>
    </div>
  );
}
```

---

### Phase 7: Root Redirect

**Step 7.1** — Handle root `/` path

When a user visits `https://piotrzadka.dev/` (no locale prefix), the middleware automatically detects their preferred locale from `Accept-Language` and redirects to `/en/...` or `/pl/...`.

No extra code needed — `next-intl` middleware handles this.

**Edge case:** The old `/about` URLs without locale prefix will still work if someone has them bookmarked — the middleware redirects to the appropriate locale-prefixed version.

---

## 6. Files Changed Summary

| File | Action |
|---|---|
| `package.json` | Add `next-intl` dependency |
| `next.config.ts` | Add `withNextIntl` plugin |
| `src/middleware.ts` | **New** — locale detection & redirect |
| `src/i18n/request.ts` | **New** — translation loader |
| `src/i18n/routing.ts` | **New** — locale config |
| `src/i18n/navigation.ts` | **New** — typed Link/redirect helpers |
| `messages/en.json` | **New** — English UI strings |
| `messages/pl.json` | **New** — Polish UI strings (you write this) |
| `src/app/layout.tsx` | **Rewrite** — minimal root layout |
| `src/app/[locale]/layout.tsx` | **New** — locale-aware layout |
| `src/app/[locale]/metadata.ts` | **New** — locale-aware SEO |
| `src/app/[locale]/page.tsx` | **Move + Update** — use `t()` |
| `src/app/[locale]/about/page.tsx` | **Move + Update** |
| `src/app/[locale]/blog/page.tsx` | **Move + Update** |
| `src/app/[locale]/blog/[slug]/page.tsx` | **Move + Update** |
| `src/app/[locale]/experience/page.tsx` | **Move + Update** |
| `src/app/[locale]/projects/page.tsx` | **Move + Update** |
| `src/app/[locale]/projects/[slug]/page.tsx` | **Move + Update** |
| `src/app/[locale]/template.tsx` | **Move** — unchanged |
| `src/app/[locale]/icon.tsx` | **Move** — unchanged |
| `src/components/layout/ConsoleNav.tsx` | **Update** — add LanguageToggle, use `useTranslations` |
| `src/components/layout/Footer.tsx` | **Update** — use translations |
| `src/components/layout/HeroSection.tsx` | **Update** — accept translated strings as props |
| `src/components/layout/ContactSection.tsx` | **Update** — use translations for fallback text |
| `src/components/layout/AboutSection.tsx` | **Update** — use translations |
| `src/lib/sanity.ts` | **Update** — add `locale` param, filter GROQ queries |
| `src/lib/blog.ts` | **Update** — add comment about future locale filter |
| `sanity/schemaTypes/profile.ts` | **Update** — add `language` field |
| `sanity/schemaTypes/contact.ts` | **Update** — add `language` field |
| `sanity/schemaTypes/about.ts` | **Update** — add `language` field |
| `sanity/schemaTypes/experience.ts` | **Update** — add `language` field |
| `sanity/schemaTypes/project.ts` | **Update** — add `language` field |
| `sanity/schemaTypes/post.ts` | **Update** — add `language` field (future use) |

---

## 7. What You Need to Translate

### Polish translations needed from you:

1. **`messages/pl.json`** — ~50 UI strings (nav labels, buttons, headings, metadata)
2. **Sanity documents (Polish versions):**
   - 1× Profile (name stays "Piotr Zadka", translate tagline + skills labels)
   - 1× Contact (translate contact text)
   - 1× About (translate bio)
   - 2-3× Experience (translate job descriptions)
   - 2-3× Projects (translate problem/approach/results)
   - Blog posts — optional, no action now

### What I handle:
- All code changes listed above
- Schema modifications
- GROQ query updates
- Middleware and routing setup
- Component wiring

---

## 8. Testing Checklist

- [ ] `/` redirects to `/en` or `/pl` based on browser locale
- [ ] `/about` redirects to `/en/about` or `/pl/about`
- [ ] Language toggle switches locale and preserves current page path
- [ ] Refresh preserves chosen locale (cookie works)
- [ ] Sanity Studio shows `language` field with EN/PL radio buttons
- [ ] English Sanity content only appears on `/en/*` pages
- [ ] Polish Sanity content only appears on `/pl/*` pages
- [ ] Blog posts appear regardless of locale (no filter active)
- [ ] Page metadata (title, description) translates per locale
- [ ] `hreflang` alternate links present in HTML `<head>`
- [ ] `lang` attribute on `<html>` matches current locale
- [ ] Vercel deployment succeeds
- [ ] Old URLs (without locale prefix) redirect correctly
