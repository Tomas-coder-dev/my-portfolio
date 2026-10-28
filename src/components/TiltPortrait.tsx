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
  const rotateX = useSpring(useTransform(my, [0, 100], [7, -7]), SPRING);
  const rotateY = useSpring(useTransform(mx, [0, 100], [-8, 8]), SPRING);
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
      <span className="orbit orbit-a pointer-events-none absolute z-0" aria-hidden />
      <span className="orbit orbit-b pointer-events-none absolute z-0" aria-hidden />
      <span className="orbit-rotor orbit-rotor-a pointer-events-none absolute z-0" aria-hidden>
        <span />
        <span />
      </span>
      <span className="orbit-rotor orbit-rotor-b pointer-events-none absolute z-0" aria-hidden>
        <span />
      </span>
      <span className="portrait-halo pointer-events-none absolute -inset-4 z-0" aria-hidden />
      <span className="portrait-marks pointer-events-none absolute -inset-4 z-0" aria-hidden>
        <span />
        <span />
        <span />
        <span />
      </span>

      <div className="relative z-10 [perspective:1100px]">
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
          className="relative z-10 w-[min(78vw,280px)] cursor-pointer touch-manipulation"
        >
          <div className="rounded-[1.7rem] bg-[var(--surface)] p-2 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.5)] ring-1 ring-[var(--line)]">
            <div className="relative overflow-hidden rounded-[1.35rem] bg-zinc-950 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]">
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
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent px-3.5 pb-3 pt-14">
                <p className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-white">
                  <span className="size-1.5 rounded-full bg-[var(--lime)] shadow-[0_0_8px_var(--lime)]" />
                  Full stack · Lima
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
