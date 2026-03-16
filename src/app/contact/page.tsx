import type { Metadata } from "next";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";

export const metadata: Metadata = {
  title: "Contact",
};

const contactLinks = [
  {
    label: "Email",
    href: "mailto:hello@example.com",
    description: "hello@example.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ianho",
    description: "linkedin.com/in/ianho",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/ianho",
    description: "github.com/ianho",
    icon: Github,
  },
  {
    label: "Twitter / X",
    href: "https://x.com/ianho",
    description: "@ianho",
    icon: Twitter,
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">
        <span className="text-primary">&gt;</span> Contact
      </h1>
      <p className="mt-2 text-muted-foreground">
        Want to get in touch? Feel free to reach out through any of the channels
        below.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {contactLinks.map((link, i) => (
          <AnimateIn key={link.label} delay={i * 0.1}>
            <a
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                link.href.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="group flex items-center gap-4 rounded-lg border border-border p-6 transition-colors hover:border-primary/30 card-glow"
            >
              <link.icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
              <div>
                <h2 className="font-medium">{link.label}</h2>
                <p className="text-sm text-muted-foreground">
                  {link.description}
                </p>
              </div>
            </a>
          </AnimateIn>
        ))}
      </div>
    </div>
  );
}
