"use client";

import { motion, useReducedMotion } from "motion/react";
import { SkillIcon, getSkillBrandColor } from "@/lib/skillIcons";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  className?: string;
  float?: boolean;
  delay?: number;
  size?: "sm" | "md";
};

export default function GlowSkillTag({ label, className = "", float = false, delay = 0, size = "sm" }: Props) {
  const reduce = useReducedMotion();
  const color = getSkillBrandColor(label);
  const pad = size === "md" ? "px-3.5 py-1.5 text-xs" : "px-2.5 py-1 text-[11px]";

  const inner = (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border bg-[var(--chip)] font-semibold backdrop-blur-sm",
        pad,
        className,
      )}
      style={{
        borderColor: color,
        color,
        boxShadow: `0 0 0 1px color-mix(in srgb, ${color} 35%, transparent), 0 0 18px -4px color-mix(in srgb, ${color} 55%, transparent), inset 0 1px 0 color-mix(in srgb, ${color} 25%, transparent)`,
      }}
    >
      <SkillIcon name={label} size={size === "md" ? 16 : 14} />
      <span className="font-medium" style={{ color }}>{label}</span>
    </span>
  );

  if (!float || reduce) return inner;

  return (
    <motion.span
      className="inline-block"
      animate={{ y: [0, -5, 0], rotate: [-1.2, 1.2, -1.2] }}
      transition={{ duration: 4.2 + delay * 0.3, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {inner}
    </motion.span>
  );
}
