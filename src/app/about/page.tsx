import type { Metadata } from "next";
import { Mountain, Heart, PenLine, Trophy } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";

export const metadata: Metadata = {
  title: "About",
};

const funFacts = [
  {
    icon: Mountain,
    text: "I run, hike, travel, and hit the slopes for skiing & snowboarding whenever I can get the adrenaline fix.",
  },
  {
    icon: Trophy,
    text: "Badminton is my go that to sport — always up for a game.",
  },
  {
    icon: Heart,
    text: "I volunteer for Access Singapore — a strong believer in education as a force for social mobility.",
  },
  {
    icon: PenLine,
    text: "I love writing and conducting sharings on technical concepts — turning complex ideas into something anyone can follow.",
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
