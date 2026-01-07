"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navItems = [
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export function SidebarNav() {
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
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-20 flex-col items-center py-8 z-50 bg-background/40 backdrop-blur-xl">
        {/* Logo */}
        <Link
          href="/"
          className="group relative flex items-center justify-center w-12 h-12 rounded-xl border border-border/40 bg-background/60 hover:border-primary/50 transition-all duration-300"
        >
          <span className="text-sm font-bold tracking-tighter group-hover:text-primary transition-colors">
            PZ
          </span>
        </Link>

        {/* Vertical Links */}
        <nav className="flex-1 flex flex-col items-center justify-center gap-12">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 [writing-mode:vertical-lr] rotate-180 hover:text-primary",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
              {pathname === item.href && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute -right-4 top-0 bottom-0 w-1 bg-primary rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="flex flex-col items-center gap-6">
          <ThemeToggle />
        </div>

        {/* Vertical Laser Line */}
        <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-border/60 to-transparent dark:via-primary/20" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-1/2 bg-primary/30 blur-[1px] opacity-0 dark:opacity-100" />
      </aside>

      {/* Mobile Top Bar */}
      <header className="md:hidden fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 z-50 bg-background/80 backdrop-blur-md border-b border-border/10">
        <Link href="/" className="text-lg font-bold tracking-tighter">
          Piotr Zadka
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-lg bg-surface border border-border/40"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
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
              <Link
                href="/"
                className={cn(
                  "text-5xl font-bold tracking-tighter",
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
                    "text-5xl font-bold tracking-tighter",
                    pathname === item.href ? "text-primary" : "text-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label.toLowerCase()}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
