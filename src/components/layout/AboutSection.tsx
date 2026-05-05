import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CodeTerminal } from "@/components/ui/CodeTerminal";
import { CvButton } from "@/components/ui/CvButton";
import { cn } from "@/lib/utils";
import { getBadgeClassName } from "@/lib/skills";

interface AboutSectionProps {
  profile: {
    about: string;
    locationBio?: string;
    skills?: string[];
    resumeEn?: string;
    resumePl?: string;
  };
  locale: string;
  viewCV: string;
  viewCVAlt: string;
  technologies: string;
}

export async function AboutSection({
  profile,
  locale,
  viewCV,
  viewCVAlt,
  technologies,
}: AboutSectionProps) {
  const primaryResume = locale === "pl" ? profile.resumePl : profile.resumeEn;
  const altResume = locale === "pl" ? profile.resumeEn : profile.resumePl;
  const displaySkills = profile.skills || [];

  return (
    <Section className="pt-8">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="prose prose-lg dark:prose-invert">
              <p className="whitespace-pre-wrap">{profile.about}</p>

              {profile.locationBio && (
                <p className="text-muted-foreground italic">
                  {profile.locationBio}
                </p>
              )}

              {primaryResume && (
                <div className="pt-2">
                  <CvButton
                    primaryUrl={primaryResume}
                    alternativeUrl={altResume}
                    label={viewCV}
                    alternativeLabel={viewCVAlt}
                    size="md"
                  />
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{technologies}</h3>
              <div className="flex flex-wrap gap-2">
                {displaySkills.filter(Boolean).map((skill, index) => {
                  return (
                    <Badge
                      key={`${skill}-${index}`}
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
    </Section>
  );
}
