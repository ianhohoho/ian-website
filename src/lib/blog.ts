import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const blogDir = path.join(process.cwd(), "content/blog");
const WORDS_PER_MINUTE = 200;

function estimateReadingTime(content: string): number {
  const plainText = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~\-]/g, " ");

  const wordCount = plainText
    .split(/\s+/)
    .filter((word) => /[A-Za-z0-9]/.test(word)).length;

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  externalUrl?: string;
  coverImage?: string;
  coverImageAlt?: string;
  coverImageCredit?: string;
  readingTimeMinutes?: number;
  content: string;
}

export function getAllPosts(): Omit<BlogPost, "content">[] {
  if (!fs.existsSync(blogDir)) return [];

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const filePath = path.join(blogDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      description: data.description || "",
      tags: data.tags || [],
      ...(data.externalUrl && { externalUrl: data.externalUrl }),
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(blogDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    description: data.description || "",
    tags: data.tags || [],
    ...(data.externalUrl && { externalUrl: data.externalUrl }),
    ...(data.coverImage && { coverImage: data.coverImage }),
    ...(data.coverImageAlt && { coverImageAlt: data.coverImageAlt }),
    ...(data.coverImageCredit && { coverImageCredit: data.coverImageCredit }),
    ...(!data.externalUrl && { readingTimeMinutes: estimateReadingTime(content) }),
    content: processedContent.toString(),
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(blogDir)) return [];

  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
