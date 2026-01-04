import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Piotr Zadka. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <Link
            href="https://github.com/piotrzadka"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            LinkedIn
          </Link>
          <Link
            href="mailto:contact@piotrzadka.dev"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
