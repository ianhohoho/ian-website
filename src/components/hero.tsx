import Link from "next/link";
import { ArrowRight, User } from "lucide-react";

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-8 py-20 text-center md:py-28">
      <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-muted">
        <User className="h-16 w-16 text-muted-foreground" />
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Ian Ho
        </h1>
        <p className="text-xl text-muted-foreground sm:text-2xl">
          Data Scientist
        </p>
        <p className="mx-auto max-w-xl text-muted-foreground">
          I build data-driven solutions and turn complex datasets into
          actionable insights. Passionate about machine learning, statistical
          modeling, and making data accessible.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/resume"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View Resume
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
        >
          See Portfolio
        </Link>
      </div>
    </section>
  );
}
