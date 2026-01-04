import { AboutSection } from "@/components/layout/AboutSection";
import { ContactSection } from "@/components/layout/ContactSection";
import { profile } from "@/data/profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Piotr Zadka",
  description:
    "Learn more about my background, skills, and professional journey.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col pt-16">
      <AboutSection profile={profile} />

      <ContactSection email={profile.email} social={profile.social} />
    </div>
  );
}
