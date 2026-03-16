import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { ArticleCard } from "@/components/article-card";
import { AnimateIn } from "@/components/animate-in";
import { projects } from "@/data/projects";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Portfolio",
};

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">
        <span className="text-primary">#</span> Portfolio
      </h1>

      {/* Projects */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Things I&apos;ve Built</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {projects.map((project, i) => (
            <AnimateIn key={project.title} delay={i * 0.1}>
              <ProjectCard project={project} />
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section className="mt-16">
        <h2 className="text-xl font-semibold">Articles I&apos;ve Written</h2>
        <div className="mt-6 space-y-4">
          {articles.map((article, i) => (
            <AnimateIn key={article.title} delay={i * 0.1}>
              <ArticleCard article={article} />
            </AnimateIn>
          ))}
        </div>
      </section>
    </div>
  );
}
