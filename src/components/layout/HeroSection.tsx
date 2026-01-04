"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

interface HeroSectionProps {
  name: string;
  tagline: string;
}

export function HeroSection({ name, tagline }: HeroSectionProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isTyping) return;

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= tagline.length) {
        setDisplayedText(tagline.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(intervalId);
      }
    }, 50); // Typing speed

    return () => clearInterval(intervalId);
  }, [tagline, isTyping]);

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-20">
      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Hi, I'm <span className="text-primary">{name}</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 h-20 sm:h-24 md:h-28 max-w-3xl"
        >
          <p className="text-xl text-muted-foreground sm:text-2xl md:text-3xl font-mono">
            {displayedText}
            <span className="animate-pulse text-primary">|</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link href="/projects">
            <Button size="lg" className="w-full sm:w-auto">
              View My Work
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Contact Me
            </Button>
          </Link>
        </motion.div>
      </Container>

      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
    </section>
  );
}
