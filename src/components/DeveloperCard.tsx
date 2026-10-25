"use client";

import { motion } from "motion/react";

const ROWS = {
  es: [
    ["Estudios", "Ingeniería de Software, USIL"],
    ["Móvil", "Flutter y Dart"],
    ["Frontend", "Vue, Angular y TypeScript"],
    ["Backend", "Node, Laravel y .NET"],
  ],
  en: [
    ["Studies", "Software Engineering, USIL"],
    ["Mobile", "Flutter and Dart"],
    ["Frontend", "Vue, Angular and TypeScript"],
    ["Backend", "Node, Laravel and .NET"],
  ],
};

export default function DeveloperCard({ focus, lang }: { focus: string; lang: "es" | "en" }) {
  const rows = ROWS[lang];
  const focusLabel = lang === "es" ? "Enfoque" : "Focus";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_24px_50px_-28px_rgba(0,0,0,0.45)] dark:border-white/10 dark:bg-[#121212]"
    >
      <div className="border-b border-zinc-200 px-5 py-3 dark:border-white/10">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-red-600 dark:text-red-400">
          {lang === "es" ? "Lo que uso" : "What I use"}
        </p>
      </div>
      <dl className="divide-y divide-zinc-100 dark:divide-white/10">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1 px-5 py-3 sm:grid-cols-[7.5rem_1fr] sm:items-baseline sm:gap-4">
            <dt className="text-sm font-medium text-zinc-500">{label}</dt>
            <dd className="text-sm font-semibold text-zinc-950 dark:text-white">{value}</dd>
          </div>
        ))}
        <div className="grid gap-1 px-5 py-3 sm:grid-cols-[7.5rem_1fr] sm:items-baseline sm:gap-4">
          <dt className="text-sm font-medium text-zinc-500">{focusLabel}</dt>
          <dd className="min-h-5 text-sm font-semibold text-zinc-950 dark:text-white">
            {focus}
            <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-red-600" />
          </dd>
        </div>
      </dl>
    </motion.div>
  );
}
