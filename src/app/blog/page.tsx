import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog-card";
import { AnimateIn } from "@/components/animate-in";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">
        <span className="text-primary">$</span> Blog
      </h1>
      <p className="mt-2 text-muted-foreground">
        Thoughts on Life, Tech, Money, Happiness... anything.
      </p>

      {posts.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          No posts yet. Check back soon!
        </p>
      ) : (
        <div className="mt-10 space-y-4">
          {posts.map((post, i) => (
            <AnimateIn key={post.slug} delay={i * 0.1}>
              <BlogCard post={post} />
            </AnimateIn>
          ))}
        </div>
      )}
    </div>
  );
}
