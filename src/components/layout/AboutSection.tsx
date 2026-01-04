import { Profile } from "@/types";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

interface AboutSectionProps {
  profile: Profile;
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section className="py-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              About Me
            </h2>
            <div className="prose prose-lg dark:prose-invert text-muted-foreground">
              <p>{profile.about}</p>
              <p>
                Based in{" "}
                <span className="text-foreground font-medium">
                  {profile.location}
                </span>
                , I specialize in building accessible, high-performance web
                applications.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-sm py-1 px-3"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="relative aspect-square md:aspect-[4/5] bg-surface rounded-2xl overflow-hidden border border-border shadow-xl rotate-3 hover:rotate-0 transition-transform duration-300">
            {/* Placeholder for profile image */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-surface flex items-center justify-center">
              <span className="text-6xl font-bold opacity-10">PZ</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
