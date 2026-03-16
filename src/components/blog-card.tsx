import Link from "next/link";

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-lg border border-border p-6 transition-colors hover:border-primary/30 card-glow"
    >
      <time className="text-sm text-muted-foreground">{post.date}</time>
      <h3 className="mt-2 text-lg font-semibold group-hover:text-primary">
        {post.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{post.description}</p>
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
    </Link>
  );
}
