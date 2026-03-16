import { ExternalLink } from "lucide-react";

export interface Article {
  title: string;
  publication: string;
  date: string;
  url: string;
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start justify-between gap-4 rounded-lg border border-border p-6 transition-colors hover:border-foreground/20 hover:bg-accent/50"
    >
      <div>
        <h3 className="font-semibold group-hover:underline">{article.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {article.publication} &middot; {article.date}
        </p>
      </div>
      <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
    </a>
  );
}
