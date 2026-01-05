import { Profile } from "@/types";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CodeTerminal } from "@/components/ui/CodeTerminal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { getSkillBadgeClassName } from "@/lib/skills";
import { FileText } from "lucide-react";
import Link from "next/link";

interface AboutSectionProps {
  profile: Profile;
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section className="pb-20 pt-8">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="prose prose-lg dark:prose-invert">
              <p>{profile.about}</p>
              <p>
                Based in{" "}
                <span className="text-foreground font-medium">
                  {profile.location}
                </span>
                , I specialize in building accessible, high-performance web
                applications.
              </p>

              {profile.resume && (
                <div className="pt-2">
                  <Link
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="gap-2">
                      <FileText className="h-4 w-4" />
                      View CV
                    </Button>
                  </Link>
                </div>
              )}
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
