export type Project = {
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    title: "Snapmap",
    slug: "snapmap",
    description: "Location-based social application.",
    technologies: ["Next.js", "React", "Supabase", "PostGIS"],
    featured: true,
  },
  {
    title: "Student Performance ML",
    slug: "student-performance-ml",
    description: "Machine learning project focused on classification and model evaluation.",
    technologies: ["Python", "Machine Learning", "Logistic Regression", "Random Forest"],
    featured: true,
  },
];
