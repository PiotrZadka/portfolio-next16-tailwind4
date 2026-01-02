# Agent Guidelines - Portfolio

This document provides essential information for agentic coding agents operating in this repository. Follow these guidelines to ensure consistency, quality, and compatibility with the project's tech stack.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Formatting:** Prettier
- **Linting:** ESLint

## Build, Lint, and Test Commands

### Development
- **Start dev server:** `npm run dev`
- **Build project:** `npm run build`
- **Run linter:** `npm run lint`
- **Fix linting issues:** `npx eslint --fix .`
- **Format code:** `npx prettier --write .`

### Testing
*Note: Testing framework (e.g., Vitest or Jest) is not yet initialized. When adding tests, update this section.*
- **Run all tests:** `npm test` (placeholder)
- **Run single test:** `npx vitest run path/to/file.test.ts` (placeholder)

## Code Style Guidelines

### 1. Imports
- Use absolute imports with the `@/` alias (defined in `tsconfig.json`).
- Group imports in the following order:
  1. React and Next.js built-ins.
  2. External libraries.
  3. Internal components/hooks/utils.
  4. Styles and types.
- Example:
  ```tsx
  import { useState } from "react";
  import Link from "next/link";
  import { Button } from "@/components/ui/Button";
  import { cn } from "@/lib/utils";
  import type { User } from "@/types";
  import "./styles.css";
  ```

### 2. Formatting
- Use Prettier for all formatting. 
- Indentation: 2 spaces.
- Use semicolons.
- Use double quotes for JSX and strings.
- Max line length: 80 characters.

### 3. Types and TypeScript
- Use `interface` for object definitions and `type` for unions or primitives.
- Avoid `any`. Use `unknown` if the type is truly unknown.
- Use strict typing for component props.
- Prefer `type NextConfig` or `Metadata` from `next` where applicable.

### 4. Naming Conventions
- **Components:** PascalCase (e.g., `UserProfile.tsx`).
- **Hooks:** camelCase with `use` prefix (e.g., `useAuth.ts`).
- **Utils/Functions:** camelCase (e.g., `formatDate.ts`).
- **Constants:** SCREAMING_SNAKE_CASE (e.g., `API_BASE_URL`).
- **Files:** Match the export name (usually PascalCase for components).

### 5. Error Handling
- Use `try...catch` blocks for asynchronous operations.
- Implement specialized Error Boundaries for UI segments using Next.js `error.tsx` files.
- Provide user-friendly error messages.
- Log errors to a tracking service (placeholder) in production.

### 6. React 19 & Next.js 16 Specifics
- Use **Server Components** by default. Add `"use client"` directive only when necessary for interactivity or browser APIs.
- Leverage React 19's `use` hook and improved `Action` support for data fetching and mutations.
- Use Next.js 16 metadata API for SEO.

### 7. Tailwind CSS 4
- Tailwind CSS 4 uses a CSS-first approach.
- Configuration is primarily handled within `src/app/globals.css` using the `@theme` block.
- Avoid creating a `tailwind.config.js` unless legacy compatibility is required.
- Use standard Tailwind utility classes in `className`.
- Leverage CSS variables defined in the theme.

## Architecture
- **src/app:** Contains all routes and layouts (App Router).
- **src/components:** Reusable UI components.
- **src/lib:** Utility functions and shared logic.
- **src/hooks:** Custom React hooks.
- **src/types:** Shared TypeScript definitions.

## IDE Integration
- This project is optimized for Antigravity IDE with ESLint and Prettier plugins enabled.
- Ensure "Format on Save" is active.

---
*End of AGENTS.md*
