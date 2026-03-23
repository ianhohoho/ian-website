"use client";

import { useEffect, useState } from "react";

interface SideNavProps {
  sections: { id: string; label: string }[];
}

export function SideNav({ sections }: SideNavProps) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="hidden lg:block">
      <div className="sticky top-32 space-y-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`block border-l-2 py-1 pl-4 text-sm transition-colors ${
              active === section.id
                ? "border-primary text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
