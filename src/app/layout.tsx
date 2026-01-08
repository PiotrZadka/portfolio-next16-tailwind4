import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ConsoleNav } from "@/components/layout/ConsoleNav";
import { Footer } from "@/components/layout/Footer";
import { sanityFetch } from "../../sanity/lib/client";
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://piotrzadka.dev"),
  title: {
    default: "Piotr Zadka | Full-stack Developer",
    template: "%s | Piotr Zadka",
  },
  description:
    "Full-stack developer specializing in React, Next.js, and AI-driven productivity. Building accessible, high-performance web applications.",
  keywords: [
    "Software Engineer",
    "Full-stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Piotr Zadka",
  ],
  authors: [{ name: "Piotr Zadka", url: "https://piotrzadka.dev" }],
  creator: "Piotr Zadka",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://piotrzadka.dev",
    title: "Piotr Zadka | Full-stack Developer",
    description:
      "Full-stack developer specializing in React, Next.js, and AI-driven productivity.",
    siteName: "Piotr Zadka Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Piotr Zadka | Full-stack Developer",
    description:
      "Full-stack developer specializing in React, Next.js, and AI-driven productivity.",
    creator: "@piotrzadka",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

async function getContact() {
  const query = `*[_type == "contact"][0] {
    email,
    social
  }`;
  return await sanityFetch<{
    email?: string;
    social?: {
      github?: string;
      linkedin?: string;
      twitter?: string;
    };
  }>({ query });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contact = await getContact();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="antialiased font-sans bg-background text-foreground flex flex-col min-h-screen">
        <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0" />
        <ConsoleNav />
        <main className="flex-1 relative z-10 pt-14">{children}</main>
        <Footer contact={contact} />
      </body>
    </html>
  );
}
