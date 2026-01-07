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

export function ConsoleNav() {
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
      <header className="sticky top-0 z-50 w-full bg-background/40 backdrop-blur-xl">
        <Container>
          <div className="flex h-14 items-center justify-between">
            {/* Logo Module */}
            <Link
              href="/"
              className="flex items-center justify-center px-6 h-full border-x border-border/40 hover:bg-primary/5 transition-colors group"
            >
              <span className="text-sm font-bold tracking-tighter group-hover:text-primary transition-colors">
                PIOTR ZADKA
              </span>
            </Link>

            {/* Desktop: Console Links */}
            <nav className="hidden md:flex flex-1 h-full items-center">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center justify-center px-8 h-full border-r border-border/40 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-primary/5",
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  <span className="relative z-10">{item.label}</span>
                  {pathname === item.href && (
                    <motion.div
                      layoutId="console-active"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Actions Module */}
            <div className="flex items-center h-full border-x border-border/40 px-4 gap-4">
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

        {/* Horizontal Laser Line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/60 to-transparent dark:via-primary/20" />

        {/* Scanning Pulse Effect */}
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

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-primary/30 blur-[1px] opacity-0 dark:opacity-100" />
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
            <button
              className="absolute top-6 right-6 p-3 rounded-full bg-surface border border-border/40"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>

            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-5xl font-bold tracking-tighter uppercase",
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
