"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Container } from "@/components/ui/Container";

const navItems = [
  { label: "experience", href: "/experience" },
  { label: "projects", href: "/projects" },
  { label: "blog", href: "/blog" },
  { label: "about", href: "/about" },
];

export function PathNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md">
        <Container>
          <div className="flex h-16 items-center justify-between">
            {/* Desktop: Breadcrumb Path */}
            <nav className="hidden md:flex items-center font-mono text-sm tracking-tight">
              <Link
                href="/"
                className={cn(
                  "hover:text-primary transition-colors font-bold",
                  pathname === "/" ? "text-primary" : "text-foreground"
                )}
              >
                PZ
              </Link>

              {navItems.map((item) => (
                <div key={item.href} className="flex items-center">
                  <span className="mx-2 text-border">/</span>
                  <Link
                    href={item.href}
                    className={cn(
                      "hover:text-primary transition-all duration-200 px-2 py-1 rounded-md",
                      pathname === item.href
                        ? "text-primary bg-primary/5 font-semibold"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Mobile: Logo */}
            <Link
              href="/"
              className="md:hidden text-lg font-bold tracking-tighter hover:text-primary transition-colors"
            >
              Piotr Zadka
            </Link>

            <div className="flex items-center gap-4">
              <ThemeToggle />

              {/* Mobile Menu Toggle */}
              <button
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/40 bg-surface/50 md:hidden text-sm font-medium hover:border-primary/50 transition-colors"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="w-4 h-4" />
                <span>Menu</span>
              </button>
            </div>
          </div>
        </Container>

        {/* Horizon Line Distinction */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/60 to-transparent dark:via-primary/20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-primary/30 blur-[1px] opacity-0 dark:opacity-100" />
      </header>

      {/* Fullscreen Overlay (Mobile & Desktop Trigger) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-6 right-6 p-3 rounded-full bg-surface border border-border/40 hover:border-primary/50 transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            <nav className="flex flex-col items-center gap-8">
              <Link
                href="/"
                className={cn(
                  "text-5xl font-bold tracking-tighter transition-colors hover:text-primary",
                  pathname === "/" ? "text-primary" : "text-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                home
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-5xl font-bold tracking-tighter transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : "text-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-12 text-xs font-mono text-muted-foreground tracking-widest uppercase">
              piotrzadka.dev — 2026
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
