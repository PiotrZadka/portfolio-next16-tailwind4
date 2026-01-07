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
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pointer-events-auto"
        >
          <nav className="relative flex items-center gap-2 px-3 py-2 rounded-full border border-border/40 bg-background/60 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-primary/5 transition-colors duration-300">
            {/* Logo/Home Link */}
            <Link
              href="/"
              className="px-3 py-1.5 text-sm font-bold tracking-tight hover:text-primary transition-colors"
            >
              PZ
            </Link>

            <div className="h-4 w-px bg-border/60 mx-1 hidden md:block" />

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    onMouseEnter={() => setHoveredPath(item.href)}
                    onMouseLeave={() => setHoveredPath(null)}
                    className={cn(
                      "relative px-4 py-1.5 text-sm font-medium transition-colors duration-300 rounded-full",
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}

                    {/* Active/Hover Highlight */}
                    <AnimatePresence>
                      {(hoveredPath === item.href ||
                        pathname === item.href) && (
                        <motion.span
                          layoutId="nav-highlight"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                          className={cn(
                            "absolute inset-0 -z-10 rounded-full bg-primary/10",
                            pathname === item.href && "bg-primary/15"
                          )}
                        />
                      )}
                    </AnimatePresence>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="h-4 w-px bg-border/60 mx-1" />

            <div className="flex items-center gap-1">
              <ThemeToggle />

              {/* Mobile Menu Toggle */}
              <button
                className="p-2 md:hidden text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </nav>
        </motion.div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col items-center justify-center md:hidden"
          >
            {/* Close button in overlay */}
            <button
              className="absolute top-8 right-8 p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-8 w-8" />
            </button>

            <nav className="flex flex-col items-center gap-8">
              <Link
                href="/"
                className={cn(
                  "text-4xl font-bold transition-colors hover:text-primary",
                  pathname === "/" ? "text-primary" : "text-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-4xl font-semibold transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : "text-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
