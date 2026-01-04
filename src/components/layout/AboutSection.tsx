import { Profile } from "@/types";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CodeTerminal } from "@/components/ui/CodeTerminal";
import { cn } from "@/lib/utils";
import { getSkillBadgeClassName } from "@/lib/skills";

interface AboutSectionProps {
  profile: Profile;
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section className="py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                    variant="outline"
                    className={cn(
                      "text-sm py-1 px-3",
                      getSkillBadgeClassName(skill)
                    )}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="h-[400px] lg:h-[450px]">
            <CodeTerminal />
          </div>
        </div>
      </Container>
    </section>
  );
}
