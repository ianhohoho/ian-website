import type { Metadata } from "next";
import { Lightbulb, Code2, Coffee, Gamepad2 } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";

export const metadata: Metadata = {
  title: "About",
};

const funFacts = [
  {
    icon: Code2,
    text: "I wrote my first line of code in middle school and never looked back.",
  },
  {
    icon: Coffee,
    text: "Fueled by an unreasonable amount of coffee and late-night debugging sessions.",
  },
  {
    icon: Gamepad2,
    text: "When I'm not training models, you'll find me playing strategy games or hiking.",
  },
  {
    icon: Lightbulb,
    text: "I believe the best insights come from asking the right questions, not just having the right data.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">
        <span className="text-primary">#</span> About Me
      </h1>
      <p className="mt-4 text-muted-foreground">
        A few things about me beyond the resume.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {funFacts.map((fact, i) => (
          <AnimateIn key={i} delay={i * 0.1}>
            <div className="flex items-start gap-4 rounded-lg border border-border p-5 card-glow hover:border-primary/30">
              <fact.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">{fact.text}</p>
            </div>
          </AnimateIn>
        ))}
      </div>
    </div>
  );
}
