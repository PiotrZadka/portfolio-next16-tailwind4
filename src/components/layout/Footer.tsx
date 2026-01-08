import Link from "next/link";
import { Container } from "@/components/ui/Container";

interface FooterProps {
  contact?: {
    email?: string;
    social?: {
      github?: string;
      linkedin?: string;
    };
  };
}

export function Footer({ contact }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const email = contact?.email || "piotr.zadka@gmail.com";
  const github = contact?.social?.github || "https://github.com/piotrzadka";
  const linkedin =
    contact?.social?.linkedin || "https://www.linkedin.com/in/piotr-zadka/";

  return (
    <footer className="border-t border-border/40 bg-background py-8 transition-colors duration-300">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Piotr Zadka. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {github && (
              <Link
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                GitHub
              </Link>
            )}
            {linkedin && (
              <Link
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                LinkedIn
              </Link>
            )}
            {email && (
              <Link
                href={`mailto:${email}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Email
              </Link>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}
