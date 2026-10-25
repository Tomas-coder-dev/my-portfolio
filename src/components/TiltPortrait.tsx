"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

const SPRING = { stiffness: 260, damping: 22, mass: 0.35 };

export default function TiltPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const rotateX = useSpring(useTransform(my, [0, 100], [16, -16]), SPRING);
  const rotateY = useSpring(useTransform(mx, [0, 100], [-18, 18]), SPRING);
  const glare = useMotionTemplate`radial-gradient(280px circle at ${mx}% ${my}%, rgba(255,255,255,0.45), rgba(255,45,60,0.2) 28%, transparent 46%)`;

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

  return (
    <div className="relative mx-auto w-fit">
      <span className="pointer-events-none absolute -left-3 -top-3 z-10 size-7 border-l-2 border-t-2 border-[var(--lime)]" />
      <span className="pointer-events-none absolute -right-3 -top-3 z-10 size-7 border-r-2 border-t-2 border-[var(--lime)]" />
      <span className="pointer-events-none absolute -bottom-3 -left-3 z-10 size-7 border-b-2 border-l-2 border-[var(--lime)]" />
      <span className="pointer-events-none absolute -bottom-3 -right-3 z-10 size-7 border-b-2 border-r-2 border-[var(--lime)]" />

      <div className="[perspective:1100px]">
        <motion.div
          ref={ref}
          onPointerMove={onMove}
          onPointerLeave={reset}
          onPointerCancel={reset}
          animate={reduce || active ? { y: 0 } : { y: [0, -8, 0] }}
          transition={
            reduce || active
              ? { duration: 0.2 }
              : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
          }
          style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
          data-tilt="portrait"
          className="w-[min(78vw,280px)] cursor-pointer touch-manipulation"
        >
          <div className="rounded-[1.7rem] bg-[var(--surface)] p-2.5 shadow-[0_28px_60px_-28px_rgba(0,0,0,0.55)] ring-1 ring-[var(--line)]">
            <div className="relative overflow-hidden rounded-[1.25rem] bg-zinc-950 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
              <Image
                src="https://avatars.githubusercontent.com/u/149453943?v=4"
                alt="Fabricio Aylas Moreno"
                width={640}
                height={640}
                priority
                className="aspect-square w-full object-cover"
              />
              <motion.div
                aria-hidden
                style={{ background: glare, opacity: active ? 1 : 0.35 }}
                className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent px-4 pb-3 pt-12">
                <p className="font-mono text-[11px] tracking-wide text-white/90">Full stack · Lima</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
