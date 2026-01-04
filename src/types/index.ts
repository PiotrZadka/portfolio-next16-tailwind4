export interface Profile {
  name: string;
  title: string;
  tagline: string;
  about: string;
  location: string;
  email: string;
  social: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
  skills: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | "Present";
  description: string;
  technologies: string[];
  impact: string[]; // Bullet points of achievements
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  summary: string;
  coverImage: string;
  technologies: string[];
  links: {
    demo?: string;
    repo?: string;
  };
  content: {
    problem: string;
    approach: string;
    results: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string; // MDX content
}
