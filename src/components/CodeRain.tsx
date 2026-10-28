"use client";

import { useEffect, useRef } from "react";

const SOURCES = [
  "const fabricio = 'fullstack';",
  "flutter build apk --release",
  "docker push gcr.io/api",
  "SELECT * FROM experiencia;",
  "async await fetch('/v1')",
  "git commit -m ship",
  "export default function",
  "if (liveness) onboard()",
  "class BelityApp extends ",
  "npm run build && next",
  "{ laravel: true, vue: 3 }",
  "aws.rekognition.compare",
  "█▓▒░▄▀▌▐■□█▓▒░▄▀",
  "function App() { return }",
  "GET /api/cvs 200 OK",
  "import 'package:flutter'",
  "ng generate component cv",
  "jwt.verify(token, key)",
  "map.get('quechua') ??",
];

export default function CodeRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let alive = true;
    let font = "13px ui-monospace, monospace";

    type Col = { x: number; y: number; text: string };
    let cols: Col[] = [];
    let width = 0;
    let height = 0;

    const isDark = () => document.documentElement.classList.contains("dark");

    const readFont = () => {
      const mono = getComputedStyle(document.body)
        .getPropertyValue("--font-geist-mono")
        .trim();
      font = `13px ${mono || "ui-monospace"}, ui-monospace, monospace`;
    };

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.ceil(width / (width < 720 ? 30 : 24)), 62);
      cols = Array.from({ length: count }, (_, i) => ({
        x: Math.round((i + 0.35) * (width / count)),
        y: Math.random() * (height / 14),
        text: SOURCES[Math.floor(Math.random() * SOURCES.length)],
      }));
      ctx.clearRect(0, 0, width, height);
    };

    const paintStatic = () => {
      readFont();
      layout();
      ctx.font = font;
      ctx.fillStyle = isDark() ? "rgba(255, 45, 60, 0.16)" : "rgba(120, 24, 36, 0.08)";
      const step = 16;
      for (const col of cols) {
        for (let row = 1; row < height / step; row += 2) {
          const ch = col.text[row % col.text.length];
          if (ch && ch !== " ") ctx.fillText(ch, col.x, row * step);
        }
      }
    };

    readFont();
    document.fonts?.ready.then(() => {
      if (alive) readFont();
    });

    if (media.matches) {
      paintStatic();
      window.addEventListener("resize", paintStatic);
      return () => {
        alive = false;
        window.removeEventListener("resize", paintStatic);
      };
    }

    layout();
    let last = 0;
    let dark = isDark();

    const frame = (time: number) => {
      if (!alive) return;
      raf = requestAnimationFrame(frame);
      if (time - last < 90) return;
      last = time;

      const nowDark = isDark();
      if (nowDark !== dark) {
        dark = nowDark;
        ctx.clearRect(0, 0, width, height);
      }

      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
      ctx.font = font;
      ctx.fillStyle = dark ? "rgba(255, 45, 60, 0.78)" : "rgba(120, 24, 36, 0.16)";

      for (const col of cols) {
        const index = Math.floor(col.y) % col.text.length;
        const ch = col.text[index] ?? "";
        if (ch !== " ") ctx.fillText(ch, col.x, col.y * 14);
        col.y += 1;
        if (col.y * 14 > height + 24) {
          col.y = -Math.random() * 16;
          if (Math.random() > 0.62) {
            col.text = SOURCES[Math.floor(Math.random() * SOURCES.length)];
          }
        }
      }
    };

    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", layout);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", layout);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
