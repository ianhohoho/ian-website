import type { Metadata } from "next";
import Link from "next/link";
import { Mountain, Heart, PenLine, Trophy, Zap, GraduationCap } from "lucide-react";
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
    text: "I spend an unhealthy number of hours in the gym or at Crossfit class... but it's really like my adult playground",
  },
  {
    icon: Heart,
    text: "I volunteer for Access Singapore — a strong believer in education as a force for social mobility.",
  },
  {
    icon: PenLine,
    text: "I love writing and conducting sharings on technical concepts — turning complex ideas into something anyone can follow.",
  },
  {
    icon: Zap,
    text: "I'm a strong believer in having a bias to action — too much planning is sometimes unproductive. I like working with people who just get things done.",
  },
  {
    icon: GraduationCap,
    text: "I'm a PPE humanities student by training — so I'm quite allergic to BS/Fluff'",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">
        <span className="text-primary">#</span> About Me
      </h1>
      <p className="mt-4 text-muted-foreground">
        For my professional background, check out my{" "}
        <Link href="/resume" className="text-primary hover:underline">
          resume
        </Link>
        . But more personally...
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {funFacts.map((fact, i) => (
          <AnimateIn key={i} delay={i * 0.1} className="h-full">
            <div className="flex h-full items-start gap-4 rounded-lg border border-border p-5 card-glow hover:border-primary/30">
              <fact.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm text-foreground">{fact.text}</p>
            </div>
          </AnimateIn>
        ))}
      </div>
    </div>
  );
}
