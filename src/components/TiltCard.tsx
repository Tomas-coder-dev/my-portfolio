"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

const SPRING = { stiffness: 220, damping: 24, mass: 0.4 };

export default function TiltCard({
  children,
  className = "",
  intensity = 14,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const rotateX = useSpring(useTransform(my, [0, 100], [intensity, -intensity]), SPRING);
  const rotateY = useSpring(useTransform(mx, [0, 100], [-intensity, intensity]), SPRING);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(255,45,60,0.14), transparent 42%)`;

  function onMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== "mouse") return;
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    mx.set(((event.clientX - box.left) / box.width) * 100);
    my.set(((event.clientY - box.top) / box.height) * 100);
    setActive(true);
  }

  function reset() {
    mx.set(50);
    my.set(50);
    setActive(false);
  }

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`[perspective:1100px] ${className}`}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        onPointerCancel={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full transition-shadow duration-300"
      >
        <motion.div
          aria-hidden
          style={{ background: glare, opacity: active ? 1 : 0.35 }}
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] mix-blend-soft-light"
        />
        {children}
      </motion.div>
    </div>
  );
}
