import type { ReactNode } from "react";

export default function SectionTitle({
  kicker,
  title,
  icon,
}: {
  kicker: string;
  title: string;
  icon?: ReactNode;
}) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--lime)]">{kicker}</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)] md:text-6xl">{title}</h2>
      </div>
      <span className="hidden text-[var(--lime)] md:block">{icon}</span>
    </div>
  );
}
