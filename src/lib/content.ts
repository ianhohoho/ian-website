import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { Project } from "@/components/project-card";
import type { Article } from "@/components/article-card";

const contentDir = path.join(process.cwd(), "content");

export function getAllProjects(): Project[] {
  const dir = path.join(contentDir, "projects");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const projects = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      title: data.title as string,
      description: content.trim(),
      techStack: data.techStack as string[],
      githubUrl: data.githubUrl as string | undefined,
      liveUrl: data.liveUrl as string | undefined,
      wip: (data.wip as boolean) || false,
      order: (data.order as number) || 0,
    };
  });

  return projects
    .sort((a, b) => a.order - b.order)
    .map(({ order: _, ...rest }) => rest);
}

export interface SideQuest {
  title: string;
  description: string;
  status: "completed" | "abandoned" | "active";
}

export function getAllSideQuests(): SideQuest[] {
  const dir = path.join(contentDir, "sidequests");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const quests = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      title: data.title as string,
      description: data.description as string,
      status: (data.status as SideQuest["status"]) || "completed",
      order: (data.order as number) || 0,
    };
  });

  return quests
    .sort((a, b) => a.order - b.order)
    .map(({ order: _, ...rest }) => rest);
}

export function getAllArticles(): Article[] {
  const dir = path.join(contentDir, "articles");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const articles = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      title: data.title as string,
      publication: data.publication as string,
      date: data.date as string,
      url: data.url as string,
      order: (data.order as number) || 0,
    };
  });

  return articles
    .sort((a, b) => a.order - b.order)
    .map(({ order: _, ...rest }) => rest);
}

export interface ResumeExperience {
  title: string;
  company: string;
  team?: string;
  startDate: string;
  endDate: string;
  bulletsHtml: string;
}

export interface ResumeEducation {
  title: string;
  school: string;
  startDate: string;
  endDate: string;
  note?: string;
  subjects?: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
}

export interface CertificationCategory {
  name: string;
  certs: Certification[];
}

export interface ResumeData {
  summary: string;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skillCategories: SkillCategory[];
  certCategories: CertificationCategory[];
}

export async function getResumeData(): Promise<ResumeData> {
  // Summary
  const summaryPath = path.join(contentDir, "resume/summary.md");
  const summaryContent = fs.readFileSync(summaryPath, "utf8");
  const { content: summaryBody } = matter(summaryContent);

  // Experience
  const expDir = path.join(contentDir, "resume/experience");
  const expFiles = fs.readdirSync(expDir).filter((f) => f.endsWith(".md"));

  const experienceRaw = await Promise.all(
    expFiles.map(async (filename) => {
      const filePath = path.join(expDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      const processed = await remark().use(html).process(content);

      return {
        title: data.title as string,
        company: data.company as string,
        team: data.team as string | undefined,
        startDate: data.startDate as string,
        endDate: data.endDate as string,
        bulletsHtml: processed.toString(),
        order: (data.order as number) || 0,
      };
    })
  );

  const experience = experienceRaw
    .sort((a, b) => a.order - b.order)
    .map(({ order: _, ...rest }) => rest);

  // Education
  const eduDir = path.join(contentDir, "resume/education");
  const eduFiles = fs.readdirSync(eduDir).filter((f) => f.endsWith(".md"));

  const educationRaw = eduFiles.map((filename) => {
    const filePath = path.join(eduDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      title: data.title as string,
      school: data.school as string,
      startDate: data.startDate as string,
      endDate: data.endDate as string,
      note: data.note as string | undefined,
      subjects: data.subjects as string[] | undefined,
      order: (data.order as number) || 0,
    };
  });

  const education = educationRaw
    .sort((a, b) => a.order - b.order)
    .map(({ order: _, ...rest }) => rest);

  // Skills
  const skillsPath = path.join(contentDir, "resume/skills.md");
  const skillsContent = fs.readFileSync(skillsPath, "utf8");
  const { data: skillsData } = matter(skillsContent);
  const skillCategories = skillsData.categories as SkillCategory[];

  // Certifications
  const certsPath = path.join(contentDir, "resume/certifications.md");
  const certsContent = fs.readFileSync(certsPath, "utf8");
  const { data: certsData } = matter(certsContent);
  const certCategories = certsData.categories as CertificationCategory[];

  return {
    summary: summaryBody.trim(),
    experience,
    education,
    skillCategories,
    certCategories,
  };
}
