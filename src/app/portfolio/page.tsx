import type { Metadata } from "next";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";
import { SideNav } from "@/components/side-nav";
import { getAllProjects, getAllArticles, getAllSideQuests } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
};

export default function PortfolioPage() {
  const projects = getAllProjects();
  const sideQuests = getAllSideQuests();
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">
        <span className="text-primary">#</span> Portfolio
      </h1>

      <div className="mt-12 flex gap-12">
        <SideNav sections={[
          { id: "projects", label: "Projects" },
          { id: "articles", label: "Articles" },
          { id: "side-quests", label: "Side Quests" },
        ]} />

        <div className="min-w-0 flex-1 space-y-16">
          {/* Projects — Showcase Cards */}
          <section id="projects" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-primary">Things I&apos;ve Built</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Personal projects — to learn, experiment, and scratch my own intellectual itches.
            </p>
            <div className="scrollable-section mt-6 max-h-[600px] space-y-6 overflow-y-auto pr-2">
              {projects.map((project, i) => (
                <AnimateIn key={project.title} delay={i * 0.1}>
                  <div className="group overflow-hidden rounded-lg border border-border card-glow hover:border-primary/30">
                    {/* Terminal header */}
                    <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <span className="h-3 w-3 rounded-full bg-red-500/60" />
                          <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
                          <span className="h-3 w-3 rounded-full bg-green-500/60" />
                        </div>
                        <span className="ml-2 text-xs text-muted-foreground">
                          ~/projects/{project.title.toLowerCase().replace(/\s+/g, "-")}
                        </span>
                      </div>
                      {project.wip && (
                        <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-0.5 text-xs font-medium text-yellow-400">
                          WIP
                        </span>
                      )}
                    </div>
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-bold">{project.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {project.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="mt-5 flex items-center gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_10px_hsl(var(--glow)/0.15)]"
                          >
                            <Github className="h-4 w-4" />
                            Code
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_0_12px_hsl(var(--glow)/0.3)]"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </section>

          {/* Articles — Numbered list */}
          <section id="articles" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-primary">Articles I&apos;ve Written</h2>
            <div className="mt-6 divide-y divide-border rounded-lg border border-border">
              {articles.map((article, i) => (
                <AnimateIn key={article.title} delay={i * 0.05}>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/30"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-primary/30 text-xs font-bold text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium group-hover:text-primary transition-colors">
                        {article.title}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {article.publication} &middot; {article.date}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </AnimateIn>
              ))}
            </div>
          </section>

          {/* Side Quests — Timeline */}
          <section id="side-quests" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-primary">Side Quests</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Less serious things I&apos;ve built for other people, freelance work, side hustles, and other adventures.
            </p>
            <div className="relative mt-8 ml-4 border-l border-primary/30 pl-8">
              {sideQuests.map((quest, i) => (
                <AnimateIn key={`${quest.title}-${i}`} delay={i * 0.1}>
                  <div className="relative mb-8 last:mb-0">
                    {/* Timeline node */}
                    <div className="absolute -left-[2.85rem] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-primary/40 bg-background text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
                    </div>
                    {/* Quest card */}
                    <div className="rounded-lg border border-border p-5 card-glow hover:border-primary/30">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold">{quest.title}</h3>
                        <span className="shrink-0 rounded-full border border-muted-foreground/30 bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                          Retired
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {quest.description}
                      </p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
