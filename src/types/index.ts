export interface SocialLinks {
  github: string;
  linkedin: string;
}

export interface Profile {
  name: string;
  tagline: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | "Present";
  description: string;
  technologies: string[];
  impact: string[];
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
  readTime?: string;
  tags: string[];
  content: any; // Portable Text blocks
  externalUrl?: string;
}

