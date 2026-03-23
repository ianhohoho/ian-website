import { ExternalLink, Github } from "lucide-react";

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export function ProjectCard({ project, showTechStack = true }: { project: Project; showTechStack?: boolean }) {
  return (
    <div className="group rounded-lg border border-border p-6 transition-colors hover:border-primary/30 card-glow">
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {project.description}
      </p>
      {showTechStack && project.techStack.length > 0 && (
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
      )}
      <div className="mt-4 flex items-center gap-3">
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
  );
}
