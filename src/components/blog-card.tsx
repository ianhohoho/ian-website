import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  externalUrl?: string;
}

export function BlogCard({ post }: { post: BlogPostMeta }) {
  const Wrapper = post.externalUrl ? "a" : Link;
  const linkProps = post.externalUrl
    ? { href: post.externalUrl, target: "_blank", rel: "noopener noreferrer" }
    : { href: `/blog/${post.slug}` };

  return (
    <Wrapper
      {...linkProps}
      className="group block rounded-lg border border-border p-6 transition-colors hover:border-primary/30 card-glow"
    >
      <div className="flex items-center gap-2">
        <time className="text-sm text-muted-foreground">{post.date}</time>
        {post.externalUrl?.includes("substack") && (
          <span className="rounded-full border border-orange-400/30 bg-orange-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-orange-400">
            Substack
          </span>
        )}
      </div>
      <h3 className="mt-2 text-lg font-semibold group-hover:text-primary flex items-center gap-1.5">
        {post.title}
        {post.externalUrl && (
          <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        )}
      </h3>
      <p className="mt-2 text-sm text-foreground">{post.description}</p>
      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Wrapper>
  );
}
