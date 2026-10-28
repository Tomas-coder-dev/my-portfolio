"use client";

import { useEffect, useRef, useState } from "react";
import { Press_Start_2P } from "next/font/google";
import { ChevronLeft, ChevronRight, Crosshair } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SectionTitle from "@/components/SectionTitle";

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pixel",
});

type Bullet = { x: number; y: number };
type Rock = { x: number; y: number; r: number; vy: number; phase: number; kind: number; hit: boolean };
type Boom = { x: number; y: number; life: number };
type Pop = { x: number; y: number; life: number; text: string };
type Star = { x: number; y: number; r: number; a: number; phase: number };

type Play = {
  ship: number;
  aim: number | null;
  pointer: "mouse" | "touch";
  left: boolean;
  right: boolean;
  fire: boolean;
  fireTap: boolean;
  bullets: Bullet[];
  rocks: Rock[];
  booms: Boom[];
  pops: Pop[];
  stars: Star[];
  score: number;
  best: number;
  level: number;
  banner: number;
  lang: "es" | "en";
  lives: number;
  playing: boolean;
  cool: number;
  shield: number;
  flash: number;
  handsOff: number;
  spawn: number;
  w: number;
  h: number;
  dpr: number;
};

function makeStars(w: number, h: number): Star[] {
  return Array.from({ length: 42 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 0.4 + Math.random() * 1.3,
    a: 0.25 + Math.random() * 0.65,
    phase: Math.random() * Math.PI * 2,
  }));
}

function pixelText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  size: number,
  font: string,
  fill: string,
) {
  ctx.font = `${size}px ${font}`;
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.lineWidth = Math.max(3, size / 5);
  ctx.strokeStyle = "#1a0a10";
  ctx.strokeText(text, x, y);
  ctx.fillStyle = fill;
  ctx.fillText(text, x, y);
}

function paint(ctx: CanvasRenderingContext2D, s: Play, lime: string, font: string) {
  const { w, h } = s;
  ctx.clearRect(0, 0, w, h);

  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#241018");
  sky.addColorStop(0.55, "#120c12");
  sky.addColorStop(1, "#09090c");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  const glow = ctx.createRadialGradient(w * 0.72, h * 0.22, 8, w * 0.72, h * 0.22, w * 0.48);
  glow.addColorStop(0, "rgba(225, 29, 46, 0.38)");
  glow.addColorStop(1, "rgba(225, 29, 46, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  const now = performance.now();
  for (const star of s.stars) {
    ctx.globalAlpha = star.a * (0.45 + 0.55 * Math.sin(now / 700 + star.phase));
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  for (const rock of s.rocks) {
    if (rock.hit) continue;
    const bonus = rock.kind === 3;
    const fill = bonus ? "#ffe38a" : rock.kind === 1 ? "#ffd7dc" : rock.kind === 2 ? "#ff8b96" : "#fff";
    const orb = ctx.createRadialGradient(rock.x - rock.r * 0.35, rock.y - rock.r * 0.4, rock.r * 0.1, rock.x, rock.y, rock.r);
    orb.addColorStop(0, "#fff");
    orb.addColorStop(0.55, fill);
    orb.addColorStop(1, bonus ? "#f5b942" : lime);
    ctx.fillStyle = orb;
    ctx.shadowColor = bonus ? "#f5b942" : lime;
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(rock.x, rock.y, rock.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(rock.x, rock.y, rock.r + 3, 0, Math.PI * 2);
    ctx.stroke();
  }

  for (const boom of s.booms) {
    const t = 1 - boom.life / 0.32;
    ctx.globalAlpha = 1 - t;
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(boom.x, boom.y, 8 + t * 22, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  ctx.lineCap = "round";
  for (const bullet of s.bullets) {
    const beam = ctx.createLinearGradient(bullet.x, bullet.y - 28, bullet.x, bullet.y + 14);
    beam.addColorStop(0, "rgba(255,255,255,0)");
    beam.addColorStop(0.35, "#fff");
    beam.addColorStop(1, lime);
    ctx.strokeStyle = beam;
    ctx.lineWidth = 5;
    ctx.shadowColor = lime;
    ctx.shadowBlur = 22;
    ctx.beginPath();
    ctx.moveTo(bullet.x, bullet.y - 26);
    ctx.lineTo(bullet.x, bullet.y + 12);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  const sx = s.ship * w;
  const sy = h - 36;
  ctx.shadowColor = lime;
  ctx.shadowBlur = 18;
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(sx, sy - 20);
  ctx.quadraticCurveTo(sx + 16, sy + 4, sx + 11, sy + 12);
  ctx.lineTo(sx, sy + 6);
  ctx.lineTo(sx - 11, sy + 12);
  ctx.quadraticCurveTo(sx - 16, sy + 4, sx, sy - 20);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = lime;
  ctx.beginPath();
  ctx.moveTo(sx, sy - 8);
  ctx.lineTo(sx + 4.5, sy + 6);
  ctx.lineTo(sx - 4.5, sy + 6);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 0.9;
  ctx.beginPath();
  ctx.ellipse(sx, sy + 16, 2.6, 7 + Math.sin(now / 80) * 1.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  if (s.flash > 0) {
    ctx.globalAlpha = Math.min(1, s.flash / 0.2);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 4;
    ctx.shadowColor = lime;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.moveTo(sx, 12);
    ctx.lineTo(sx, sy - 16);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  if (s.shield > 0) {
    ctx.globalAlpha = 0.45 + 0.35 * Math.sin(now / 90);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.shadowColor = lime;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(sx, sy, 28, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  for (const pop of s.pops) {
    ctx.globalAlpha = Math.min(1, pop.life * 2);
    pixelText(ctx, pop.text, pop.x, pop.y, 14, font, "#fff");
    ctx.globalAlpha = 1;
  }

  if (s.playing || s.banner > 0) {
    pixelText(ctx, s.lang === "en" ? `LV ${s.level}` : `NIVEL ${s.level}`, w / 2, 36, 13, font, "#fff");
  }

  if (s.banner > 0) {
    ctx.globalAlpha = Math.min(1, s.banner);
    ctx.fillStyle = "rgba(12, 6, 10, 0.55)";
    ctx.fillRect(w / 2 - 132, h * 0.4 - 28, 264, 54);
    pixelText(ctx, s.lang === "en" ? `LEVEL ${s.level}` : `NIVEL ${s.level}`, w / 2, h * 0.4 + 8, 22, font, lime);
    ctx.globalAlpha = 1;
  }
}

export default function Arcade() {
  const { lang } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const play = useRef<Play>({
    ship: 0.5,
    aim: null,
    pointer: "mouse",
    left: false,
    right: false,
    fire: false,
    fireTap: false,
    bullets: [],
    rocks: [],
    booms: [],
    pops: [],
    stars: [],
    score: 0,
    best: 0,
    level: 1,
    banner: 0,
    lang: "es",
    lives: 3,
    playing: false,
    cool: 0,
    shield: 0,
    flash: 0,
    handsOff: 0,
    spawn: 0.4,
    w: 640,
    h: 360,
    dpr: 1,
  });
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [status, setStatus] = useState<"ready" | "play" | "over">("ready");
  play.current.lang = lang;

  const copy = {
    es: {
      kicker: "05  //  juego",
      title: "Nave",
      lead: "La nave sigue el mouse y el clic dispara. Cada 6 puntos sube el nivel. En el celular salen los botones.",
      score: "Puntos",
      level: "Nivel",
      lives: "Vidas",
      best: "Récord",
      play: "Jugar",
      again: "Otra vez",
      over: "Se acabaron las vidas",
      mouse: "El mouse mueve la nave. Clic o espacio dispara. A, D y las flechas corrigen después del clic.",
      touch: "Izquierda, disparo y derecha.",
      left: "Mover a la izquierda",
      right: "Mover a la derecha",
      fire: "Disparar",
    },
    en: {
      kicker: "05  //  game",
      title: "Ship",
      lead: "The ship follows the mouse and a click shoots. Every 6 points raises the level. On a phone, the buttons appear.",
      score: "Score",
      level: "Level",
      lives: "Lives",
      best: "Best",
      play: "Play",
      again: "Again",
      over: "Out of lives",
      mouse: "The mouse moves the ship. Click or space shoots. A, D and the arrows still steer after a click.",
      touch: "Left, shoot and right.",
      left: "Move left",
      right: "Move right",
      fire: "Shoot",
    },
  }[lang];

  function begin() {
    const s = play.current;
    s.ship = 0.5;
    s.aim = null;
    s.left = false;
    s.right = false;
    s.fire = false;
    s.fireTap = false;
    s.bullets = [];
    s.rocks = [];
    s.booms = [];
    s.pops = [];
    s.handsOff = 0;
    s.score = 0;
    s.level = 1;
    s.lives = 3;
    s.playing = true;
    s.cool = 0;
    s.shield = 3.2;
    s.flash = 0;
    s.banner = 1.6;
    s.spawn = 1.8;
    setScore(0);
    setLives(3);
    setLevel(1);
    setStatus("play");
  }

  function hold(key: "left" | "right" | "fire", down: boolean) {
    play.current[key] = down;
    if (key === "fire" && down && play.current.playing) play.current.fireTap = true;
  }

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem("arcade-best") || 0);
      if (saved > 0) {
        play.current.best = saved;
        setBest(saved);
      }
    } catch {
      /* ignore private mode */
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const width = parent.clientWidth;
      const height = Math.max(240, Math.min(420, Math.round(width * 0.58)));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.style.height = `${height}px`;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      play.current.w = width;
      play.current.h = height;
      play.current.dpr = dpr;
      play.current.stars = makeStars(width, height);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(parent);

    const onKeyDown = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const s = play.current;
      if (!s.playing) return;
      if (event.code === "ArrowLeft" || event.code === "KeyA") {
        s.aim = null;
        s.handsOff = performance.now() + 420;
        s.left = true;
        event.preventDefault();
      } else if (event.code === "ArrowRight" || event.code === "KeyD") {
        s.aim = null;
        s.handsOff = performance.now() + 420;
        s.right = true;
        event.preventDefault();
      } else if (event.code === "Space") {
        s.fire = true;
        s.fireTap = true;
        event.preventDefault();
      }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      const s = play.current;
      if (event.code === "ArrowLeft" || event.code === "KeyA") {
        s.left = false;
        s.handsOff = performance.now() + 180;
      } else if (event.code === "ArrowRight" || event.code === "KeyD") {
        s.right = false;
        s.handsOff = performance.now() + 180;
      } else if (event.code === "Space") s.fire = false;
    };
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)");
    const setPointer = () => {
      play.current.pointer = fine.matches ? "mouse" : "touch";
    };
    setPointer();
    fine.addEventListener("change", setPointer);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      frame = window.requestAnimationFrame(tick);
      const dt = Math.min(0.034, (now - last) / 1000);
      last = now;
      const s = play.current;
      const lime = getComputedStyle(document.documentElement).getPropertyValue("--lime").trim() || "#d01224";

      if (s.playing && !document.hidden) {
        const { w, h } = s;
        if (s.left) s.ship -= 1.25 * dt;
        else if (s.right) s.ship += 1.25 * dt;
        else if (s.aim != null && performance.now() > s.handsOff) s.ship += (s.aim - s.ship) * Math.min(1, dt * 12);
        s.ship = Math.min(0.94, Math.max(0.06, s.ship));

        s.cool -= dt;
        s.flash = Math.max(0, s.flash - dt);
        s.shield = Math.max(0, s.shield - dt);
        s.banner = Math.max(0, s.banner - dt);
        if ((s.fire || s.fireTap) && s.cool <= 0) {
          s.bullets.push({ x: s.ship * w, y: h - 58 });
          s.cool = 0.16;
          s.flash = 0.45;
          s.fireTap = false;
        }

        s.spawn -= dt;
        if (s.spawn <= 0) {
          const burst = s.level >= 3 && Math.random() < 0.4 ? 2 : 1;
          for (let n = 0; n < burst; n += 1) {
            const bonus = Math.random() < 0.2;
            s.rocks.push({
              x: 28 + Math.random() * (w - 56),
              y: -18 - n * 24,
              r: bonus ? 8 : 9 + Math.random() * 6 + Math.min(s.level, 6),
              vy: (bonus ? 46 : 26) + s.level * 11 + Math.random() * 22,
              phase: Math.random() * Math.PI * 2,
              kind: bonus ? 3 : Math.floor(Math.random() * 3),
              hit: false,
            });
          }
          s.spawn = Math.max(0.32, 1.15 - (s.level - 1) * 0.12);
        }

        for (const bullet of s.bullets) bullet.y -= 520 * dt;
        for (const rock of s.rocks) {
          rock.y += rock.vy * dt;
          rock.x += Math.sin(now / 420 + rock.phase) * 36 * dt;
          rock.x = Math.min(w - 16, Math.max(16, rock.x));
        }
        for (const pop of s.pops) {
          pop.y -= 28 * dt;
          pop.life -= dt;
        }

        let scored = false;
        let lost = false;
        for (const rock of s.rocks) {
          if (rock.hit) continue;
          for (const bullet of s.bullets) {
            const dx = bullet.x - rock.x;
            const dy = bullet.y - rock.y;
            if (dx * dx + dy * dy < (rock.r + 4) * (rock.r + 4)) {
              rock.hit = true;
              bullet.y = -999;
              s.booms.push({ x: rock.x, y: rock.y, life: 0.28 });
              const points = rock.kind === 3 ? 2 : 1;
              s.score += points;
              s.pops.push({ x: rock.x, y: rock.y, life: 0.7, text: points === 2 ? "+2" : "+1" });
              scored = true;
              break;
            }
          }
          if (!rock.hit && rock.y > h - 8) {
            rock.hit = true;
            if (s.shield <= 0) {
              s.lives -= 1;
              s.shield = 0.85;
              lost = true;
            }
          }
        }
        s.rocks = s.rocks.filter((rock) => !rock.hit && rock.y < h + 30);
        s.bullets = s.bullets.filter((bullet) => bullet.y > -20);
        s.booms.forEach((boom) => {
          boom.life -= dt;
        });
        s.booms = s.booms.filter((boom) => boom.life > 0);
        s.pops = s.pops.filter((pop) => pop.life > 0);

        if (scored) {
          const nextLevel = 1 + Math.floor(s.score / 6);
          if (nextLevel !== s.level) {
            s.level = nextLevel;
            s.banner = 1.5;
            setLevel(nextLevel);
          }
          setScore(s.score);
          if (s.score > s.best) {
            s.best = s.score;
            setBest(s.score);
            try {
              localStorage.setItem("arcade-best", String(s.score));
            } catch {
              /* ignore */
            }
          }
        }
        if (lost) {
          setLives(Math.max(0, s.lives));
          if (s.lives <= 0) {
            s.playing = false;
            s.left = false;
            s.right = false;
            s.fire = false;
            setStatus("over");
          }
        }
      }

      ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
      try {
        paint(ctx, s, lime, pixel.style.fontFamily);
      } catch {
        /* a draw error must not stop the game */
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      fine.removeEventListener("change", setPointer);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  function aim(event: React.PointerEvent<HTMLCanvasElement>) {
    const s = play.current;
    if (!s.playing || event.pointerType === "touch" || s.left || s.right || performance.now() < s.handsOff) return;
    const box = event.currentTarget.getBoundingClientRect();
    if (!box.width) return;
    play.current.aim = Math.min(0.94, Math.max(0.06, (event.clientX - box.left) / box.width));
  }

  function shootNow() {
    const s = play.current;
    if (!s.playing || s.cool > 0) return;
    s.bullets.push({ x: s.ship * s.w, y: s.h - 58 });
    s.cool = 0.16;
    s.flash = 0.45;
    s.fireTap = false;
  }

  function pressFire(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!play.current.playing || play.current.pointer === "touch") return;
    shootNow();
    play.current.fire = true;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* the shot already left */
    }
  }

  return (
    <section id="arcade" className={`${pixel.variable} scroll-mt-24 px-4 py-16 md:px-6 md:py-24`}>
      <div className="mx-auto max-w-6xl">
        <SectionTitle kicker={copy.kicker} title={copy.title} icon={<Crosshair className="size-7" />} />
        <p className="-mt-6 mb-8 max-w-xl text-sm leading-relaxed text-[var(--soft)] md:-mt-8">{copy.lead}</p>

        <div className="overflow-hidden rounded-[1.7rem] border border-[var(--line)] bg-[var(--surface)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--soft)]">
            <span>
              {copy.score} <strong className="text-[var(--ink)]">{score}</strong>
            </span>
            <span className="inline-flex items-center gap-2">
              {copy.level} <strong className="text-[var(--lime)]">{level}</strong>
              <span className="flex gap-1" aria-hidden>
                {Array.from({ length: 6 }, (_, index) => (
                  <span
                    key={index}
                    className={`h-1.5 w-2 rounded-full ${index < score % 6 ? "bg-[var(--lime)]" : "bg-[var(--line)]"}`}
                  />
                ))}
              </span>
            </span>
            <span className="arcade-mouse rounded-full border border-[var(--line)] px-2 py-0.5">{lang === "es" ? "Computador" : "Computer"}</span>
            <span className="arcade-touch rounded-full border border-[var(--line)] px-2 py-0.5">{lang === "es" ? "Celular" : "Phone"}</span>
            <span>
              {copy.lives} <strong className="text-[var(--lime)]">{"●".repeat(lives)}{"○".repeat(Math.max(0, 3 - lives))}</strong>
            </span>
            <span>
              {copy.best} <strong className="text-[var(--ink)]">{best}</strong>
            </span>
          </div>

          <div className="relative bg-[var(--chip)]">
            <canvas
              ref={canvasRef}
              className="arcade-screen block h-auto w-full cursor-crosshair touch-pan-y"
              aria-label={lang === "es" ? "Área de juego" : "Play area"}
              onClick={() => {
                if (play.current.pointer === "touch") return;
                shootNow();
              }}
              onPointerDown={pressFire}
              onPointerUp={() => {
                play.current.fire = false;
              }}
              onPointerCancel={() => {
                play.current.fire = false;
              }}
              onPointerMove={aim}
            />
            {status !== "play" ? (
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-6 py-5 text-center shadow-[0_18px_40px_-24px_rgba(22,22,22,0.35)]">
                  {status === "over" ? <p className="text-sm text-[var(--ink)]">{copy.over}</p> : null}
                  <button type="button" onClick={begin} className="btn-hero btn-hero-solid">
                    {status === "over" ? copy.again : copy.play}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <p className="arcade-mouse border-t border-[var(--line)] px-4 py-3 text-center font-mono text-[11px] leading-relaxed text-[var(--soft)]">{copy.mouse}</p>
          <div className="arcade-touch border-t border-[var(--line)] p-3">
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                aria-label={copy.left}
                className="inline-flex min-h-12 touch-none select-none items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--chip)] text-[var(--ink)]"
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture(event.pointerId);
                  hold("left", true);
                }}
                onPointerUp={() => hold("left", false)}
                onPointerCancel={() => hold("left", false)}
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label={copy.fire}
                className="inline-flex min-h-12 touch-none select-none items-center justify-center rounded-xl border border-[var(--lime)] bg-[var(--lime)] text-white"
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture(event.pointerId);
                  hold("fire", true);
                }}
                onPointerUp={() => hold("fire", false)}
                onPointerCancel={() => hold("fire", false)}
              >
                <Crosshair className="size-5" />
              </button>
              <button
                type="button"
                aria-label={copy.right}
                className="inline-flex min-h-12 touch-none select-none items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--chip)] text-[var(--ink)]"
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture(event.pointerId);
                  hold("right", true);
                }}
                onPointerUp={() => hold("right", false)}
                onPointerCancel={() => hold("right", false)}
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
            <p className="mt-2 text-center font-mono text-[11px] text-[var(--soft)]">{copy.touch}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
