"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navItems = [
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export function HUDNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Keyboard shortcut (Cmd/Ctrl + K) to toggle menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
      {/* HUD Elements */}
      <div className="fixed inset-0 pointer-events-none z-50 p-6 md:p-10">
        {/* Top Left: Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-6 left-6 md:top-10 md:left-10 pointer-events-auto"
        >
          <Link
            href="/"
            className="group flex items-center justify-center w-12 h-12 rounded-xl border border-border/40 bg-background/60 backdrop-blur-xl shadow-lg shadow-black/5 hover:border-primary/50 transition-all duration-300"
          >
            <span className="text-sm font-bold tracking-tighter group-hover:text-primary transition-colors">
              PZ
            </span>
            <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </motion.div>

        {/* Top Right: Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-6 right-6 md:top-10 md:right-10 pointer-events-auto"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-border/40 bg-background/60 backdrop-blur-xl shadow-lg shadow-black/5 hover:border-primary/50 transition-all duration-300">
            <ThemeToggle />
          </div>
        </motion.div>

        {/* Bottom Right: Menu FAB */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-6 right-6 md:bottom-10 md:right-10 pointer-events-auto flex flex-col items-end gap-3"
        >
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/20 bg-background/40 backdrop-blur-sm text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            <Command className="w-3 h-3" />
            <span>+ K</span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "group relative flex items-center justify-center w-14 h-14 rounded-2xl border transition-all duration-500 shadow-2xl",
              isOpen
                ? "bg-primary border-primary text-primary-foreground rotate-90"
                : "bg-background/60 border-border/40 backdrop-blur-xl text-foreground hover:border-primary/50"
            )}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Glow Effect */}
            {!isOpen && (
              <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            )}
          </button>
        </motion.div>
      </div>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[45] bg-background/95 backdrop-blur-2xl flex items-center justify-center"
          >
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
            </div>

            <nav className="relative flex flex-col items-center gap-6 md:gap-10">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.1 + 0.2 },
                  }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative text-4xl md:text-7xl font-bold tracking-tighter transition-all duration-300",
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {pathname === item.href && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 bg-primary rounded-full"
                      />
                    )}
                    <div className="absolute -inset-x-6 -inset-y-2 bg-primary/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 -z-10 rounded-xl" />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.6 } }}
                className="mt-10 flex flex-col items-center gap-4"
              >
                <div className="h-px w-20 bg-border" />
                <Link
                  href="/"
                  className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
                >
                  RETURN_HOME
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
