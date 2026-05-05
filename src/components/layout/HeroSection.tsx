"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CvButton } from "@/components/ui/CvButton";
import { Container } from "@/components/ui/Container";
import { Link, usePathname } from "@/i18n/navigation";

interface HeroSectionProps {
  name: string;
  tagline: string;
  bio?: string;
  resumeEn?: string;
  resumePl?: string;
  locale: string;
  greeting: string;
  viewProjects: string;
  contactMe: string;
  viewCV: string;
  viewCVAlt: string;
}

export function HeroSection({
  name,
  tagline,
  bio,
  resumeEn,
  resumePl,
  locale,
  greeting,
  viewProjects,
  contactMe,
  viewCV,
  viewCVAlt,
}: HeroSectionProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const pathname = usePathname();

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
    }, 50);

    return () => clearInterval(intervalId);
  }, [tagline, isTyping]);

  const handleContactClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", "#contact");
      }
    }
  };

  // Decide primary/alternative CV based on current locale
  const primaryResume = locale === "pl" ? resumePl : resumeEn;
  const altResume = locale === "pl" ? resumeEn : resumePl;

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-20">
      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {greeting} <span className="text-primary">{name}</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 h-16 sm:h-24 md:h-28 max-w-3xl"
        >
          <p className="text-xl text-muted-foreground sm:text-2xl md:text-3xl font-mono">
            {displayedText}
            <span className="animate-pulse text-primary">|</span>
          </p>
        </motion.div>

        {bio && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg"
          >
            {bio}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Link href="/projects">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {viewProjects}
            </Button>
          </Link>
          <Link href="/#contact" onClick={handleContactClick}>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {contactMe}
            </Button>
          </Link>
          {primaryResume && (
            <CvButton
              primaryUrl={primaryResume}
              alternativeUrl={altResume}
              label={viewCV}
              alternativeLabel={viewCVAlt}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            />
          )}
        </motion.div>
      </Container>

      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
    </section>
  );
}
