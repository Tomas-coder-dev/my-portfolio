"use client";

import { Download } from "lucide-react";
import { useCvModal } from "@/context/CvContext";
import { playTick } from "@/lib/tick";

export default function CvOpenButton({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  const { setOpen } = useCvModal();

  return (
    <button
      type="button"
      onClick={() => {
        playTick();
        setOpen(true);
      }}
      className={`${compact ? "btn-nav btn-nav-solid glitch-soft" : "btn-hero btn-hero-solid glitch-soft group"} ${className}`}
    >
      {!compact ? <span className="btn-hero-shine" aria-hidden /> : null}
      <Download className={compact ? "size-3.5" : "size-4"} />
      CV
    </button>
  );
}
