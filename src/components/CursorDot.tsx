"use client";

import { useEffect, useState } from "react";

export default function CursorDot() {
  const [point, setPoint] = useState({ x: -40, y: -40 });
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;
    setOn(true);
    const move = (event: PointerEvent) => setPoint({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  if (!on) return null;

  return (
    <span
      aria-hidden
      className="pointer-events-none fixed z-[70] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--lime)] bg-[var(--lime)]/30 mix-blend-multiply dark:mix-blend-screen"
      style={{ left: point.x, top: point.y }}
    />
  );
}
