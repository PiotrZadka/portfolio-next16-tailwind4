import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CodeTerminal } from "@/components/ui/CodeTerminal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { getBadgeClassName } from "@/lib/skills";
import { FileText } from "lucide-react";
import Link from "next/link";

interface AboutSectionProps {
  profile: {
    about: string;
    location: string;
    skills?: string[];
    resume?: string;
  };
}

export async function AboutSection({ profile }: AboutSectionProps) {
  const displaySkills = profile.skills || [];

  return (
    <section className="pb-20 pt-8">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="prose prose-lg dark:prose-invert">
              <p className="whitespace-pre-wrap">{profile.about}</p>

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
                {displaySkills.map((skill) => {
                  return (
                    <Badge
                      key={skill}
                      variant="none"
                      className={cn("text-sm py-1 px-3", getBadgeClassName())}
                    >
                      {skill}
                    </Badge>
                  );
                })}
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
