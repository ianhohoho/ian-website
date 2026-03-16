import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <h1 className="text-6xl font-bold text-gradient">404</h1>
      <p className="mt-4 text-muted-foreground">
        <span className="text-primary">$</span> page not found
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_0_16px_hsl(var(--glow)/0.4)]"
      >
        Go Home
      </Link>
    </div>
  );
}
