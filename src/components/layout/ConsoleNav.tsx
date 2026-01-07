"use client";

import { useState, useEffect, useRef } from "react";
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

export function ConsoleNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Update indicator position based on active link
  useEffect(() => {
    const activeIndex = navItems.findIndex((item) => item.href === pathname);
    const activeLink = linkRefs.current[activeIndex];
    const nav = navRef.current;

    if (activeLink && nav) {
      const navRect = nav.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    } else {
      setIndicatorStyle({ left: 0, width: 0 });
    }
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const isActiveNav = navItems.some((item) => item.href === pathname);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/40 backdrop-blur-xl">
        <Container>
          <div className="flex h-14 items-center justify-between">
            {/* Logo Module */}
            <Link
              href="/"
              className="flex items-center justify-center px-4 md:px-6 h-full md:border-x border-border/40 hover:bg-primary/5 transition-colors group"
            >
              <span className="text-sm font-semibold tracking-tight font-mono group-hover:text-primary transition-colors">
                PIOTR ZADKA
              </span>
            </Link>

            {/* Desktop: Console Links */}
            <nav
              ref={navRef}
              className="hidden md:flex flex-1 h-full items-center relative"
            >
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  ref={(el) => {
                    linkRefs.current[index] = el;
                  }}
                  href={item.href}
                  className={cn(
                    "relative flex items-center justify-center px-8 h-full border-r border-border/40 text-[11px] font-medium font-mono uppercase tracking-[0.15em] transition-all duration-300 hover:bg-primary/5",
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  <span className="relative z-10">{item.label}</span>
                </Link>
              ))}

              {/* CSS-based sliding indicator */}
              <div
                className={cn(
                  "absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-out",
                  !isActiveNav && "opacity-0"
                )}
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                }}
              />
            </nav>

            {/* Actions Module */}
            <div className="flex items-center h-full md:border-x border-border/40 px-4 gap-4">
              <ThemeToggle />

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setIsOpen(true)}
                className="md:hidden p-2 hover:text-primary transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Container>

        {/* Dynamic Scanning Pulse (No static line) */}
        <motion.div
          initial={{ left: "-20%" }}
          animate={{ left: "120%" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 3,
          }}
          className="absolute bottom-0 w-[20%] h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent z-10 opacity-0 dark:opacity-100"
        />
      </header>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col items-center justify-center md:hidden"
          >
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
            </div>

            <button
              className="absolute top-6 right-6 p-3 rounded-full bg-surface border border-border/40 hover:border-primary/50 transition-colors z-10"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>

            <nav className="relative flex flex-col items-center w-full gap-2">
              <Link
                href="/"
                className={cn(
                  "w-full py-6 text-center text-4xl font-bold tracking-tighter uppercase border-b border-border/10 transition-colors hover:text-primary",
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
                    "w-full py-6 text-center text-4xl font-bold tracking-tighter uppercase border-b border-border/10 transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : "text-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-8 text-[10px] font-mono text-muted-foreground tracking-[0.3em] uppercase">
                piotrzadka.dev — 2026
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
