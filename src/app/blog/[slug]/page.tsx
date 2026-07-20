import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to blog
      </Link>

      <article className="mt-8">
        <header>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <time>{post.date}</time>
            {post.readingTimeMinutes && (
              <>
                <span aria-hidden="true">·</span>
                <span>{post.readingTimeMinutes} min read</span>
              </>
            )}
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
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
          {post.coverImage && (
            <figure className="mt-8">
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt || ""}
                width={1536}
                height={1024}
                priority
                sizes="(min-width: 768px) 720px, calc(100vw - 3rem)"
                className="aspect-[3/2] w-full rounded-lg border border-border object-cover"
              />
              {post.coverImageCredit && (
                <figcaption className="mt-2 text-xs text-muted-foreground">
                  {post.coverImageCredit}
                </figcaption>
              )}
            </figure>
          )}
        </header>

        <div
          className="prose prose-invert mt-10 max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary prose-a:underline prose-strong:text-foreground prose-code:text-primary [&_blockquote_em_strong]:box-decoration-clone [&_blockquote_em_strong]:rounded-sm [&_blockquote_em_strong]:bg-primary [&_blockquote_em_strong]:px-1 [&_blockquote_em_strong]:py-0.5 [&_blockquote_em_strong]:text-primary-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
