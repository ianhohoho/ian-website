"use client";

import { useEffect, useState, useCallback } from "react";

interface TypingEffectProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
  className?: string;
}

export function TypingEffect({
  texts,
  speed = 60,
  deleteSpeed = 40,
  pauseMs = 2000,
  className,
}: TypingEffectProps) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  const currentText = texts[index];

  const tick = useCallback(() => {
    if (!deleting) {
      // Typing forward
      if (displayed.length < currentText.length) {
        setDisplayed(currentText.slice(0, displayed.length + 1));
      } else {
        // Pause at full text, then start deleting
        setTimeout(() => setDeleting(true), pauseMs);
        return;
      }
    } else {
      // Deleting
      if (displayed.length > 0) {
        setDisplayed(currentText.slice(0, displayed.length - 1));
      } else {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [displayed, deleting, currentText, texts.length, pauseMs]);

  useEffect(() => {
    const timeout = setTimeout(tick, deleting ? deleteSpeed : speed);
    return () => clearTimeout(timeout);
  }, [tick, deleting, deleteSpeed, speed]);

  return (
    <span className={className}>
      {displayed}
      <span className="inline-block w-[2px] h-[1.1em] bg-primary align-middle ml-0.5 animate-terminal-blink" />
    </span>
  );
}
