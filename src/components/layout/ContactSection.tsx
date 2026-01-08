import { SocialLinks } from "@/types";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Mail, Github, Linkedin } from "lucide-react";
import Link from "next/link";

interface ContactSectionProps {
  email: string;
  social: SocialLinks;
}

export function ContactSection({ email, social }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 bg-muted/50">
      <Container className="text-center max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          Get In Touch
        </h2>
        <p className="text-lg text-muted-foreground mb-10">
          I'm currently open to new opportunities and collaborations. Whether
          you have a question or just want to say hi, I'll try my best to get
          back to you!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href={`mailto:${email}`}>
            <Button size="lg" className="gap-2">
              <Mail className="h-5 w-5" />
              Say Hello
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-6">
          {social.github && (
            <Link
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
          )}
          {social.linkedin && (
            <Link
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}
