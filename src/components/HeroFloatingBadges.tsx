"use client";

import GlowSkillTag from "@/components/GlowSkillTag";

const BADGES = [
  { label: "Google Gemini AI", delay: 0 },
  { label: "Next.js", delay: 0.4 },
  { label: "Flutter", delay: 0.8 },
  { label: "Laravel", delay: 1.2 },
  { label: "Node.js", delay: 1.6 },
];

export default function HeroFloatingBadges() {
  return (
    <div className="pointer-events-none absolute -bottom-2 left-1/2 z-20 flex w-[120%] -translate-x-1/2 flex-wrap justify-center gap-2 px-2 md:-bottom-6">
      {BADGES.map((b) => (
        <GlowSkillTag key={b.label} label={b.label} float delay={b.delay} size="md" className="pointer-events-auto shadow-lg" />
      ))}
    </div>
  );
}
