import { Github, Linkedin, Mail } from "lucide-react";
import packageJson from "../../package.json";

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="text-primary">$</span> &copy; {new Date().getFullYear()} Ian Ho
          <span className="mx-2 text-border">|</span>
          <span className="text-primary">v{packageJson.version}</span>
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/ianhohoho"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary hover:drop-shadow-glow"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com/in/ianhojy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary hover:drop-shadow-glow"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="mailto:ianhojy@gmail.com"
            className="text-muted-foreground transition-colors hover:text-primary hover:drop-shadow-glow"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
