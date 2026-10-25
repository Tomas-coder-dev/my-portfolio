"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import TiltPortrait from "@/components/TiltPortrait";

const PHRASES = {
  es: ["Biometría y OCR.", "Flutter en Android e iOS.", "APIs y cloud."],
  en: ["Biometrics and OCR.", "Flutter on Android and iOS.", "APIs and cloud."],
};

export default function Hero() {
  const { lang } = useLanguage();
  const lines = PHRASES[lang];
  const [phrase, setPhrase] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

  useEffect(() => {
    setPhrase(0);
    setTyped("");
    setPhase("typing");
  }, [lang]);

  const full = lines[phrase] ?? "";

  useEffect(() => {
    let timer = 0;
    if (phase === "typing") {
      if (typed.length < full.length) timer = window.setTimeout(() => setTyped(full.slice(0, typed.length + 1)), 42);
      else timer = window.setTimeout(() => setPhase("pause"), 1200);
    } else if (phase === "pause") {
      timer = window.setTimeout(() => setPhase("deleting"), 500);
    } else if (typed.length > 0) {
      timer = window.setTimeout(() => setTyped(full.slice(0, typed.length - 1)), 18);
    } else {
      setPhrase((index) => (index + 1) % lines.length);
      setPhase("typing");
    }
    return () => window.clearTimeout(timer);
  }, [phase, typed, full, lines.length]);

  const copy = {
    kicker: { es: "Belity · Lima · USIL", en: "Belity · Lima · USIL" },
    a: { es: "Fabricio", en: "Fabricio" },
    b: { es: "Aylas", en: "Aylas" },
    c: { es: "Full stack.", en: "Full stack." },
    who: { es: "Play Store, App Store y Cloud Run.", en: "Play Store, App Store and Cloud Run." },
    study: { es: "Ingeniería de Software · USIL", en: "Software Engineering · USIL" },
    projects: { es: "Ver proyectos", en: "View projects" },
    contact: { es: "Contactar", en: "Contact" },
  };

  return (
    <section id="hero" className="scroll-mt-24 px-4 pb-8 pt-8 md:px-6 md:pt-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--soft)]">
          <span className="text-[var(--lime)]">{copy.kicker[lang]}</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3" /> Lima, Perú
          </span>
        </div>

        <h1 className="mt-8 text-[clamp(3.4rem,11vw,8.4rem)] font-semibold leading-[0.82] tracking-[-0.055em] text-[var(--ink)]">
          <span className="block">{copy.a[lang]}</span>
          <span className="flex flex-wrap items-end gap-x-5 gap-y-1">
            <span>{copy.b[lang]}</span>
            <span className="signal pb-[0.14em] text-[clamp(1.45rem,2.8vw,2.5rem)] leading-none tracking-[-0.04em] text-[var(--lime)]">
              {copy.c[lang]}
            </span>
          </span>
        </h1>

        <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1fr_280px]">
          <div>
            <p className="max-w-md text-lg text-[var(--ink)]">{copy.who[lang]}</p>
            <p className="mt-1 font-mono text-sm text-[var(--soft)]">
              {copy.study[lang]}
              <span className="mx-2 text-[var(--lime)]">/</span>
              {typed}
              <span className="ml-0.5 inline-block h-3 w-px translate-y-0.5 bg-[var(--lime)]" />
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="btn btn-primary glitch">
                {copy.projects[lang]}
                <ArrowUpRight className="size-4" />
              </a>
              <a href="#contact" className="btn btn-secondary glitch">
                {copy.contact[lang]}
              </a>
            </div>
          </div>
          <TiltPortrait />
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-4">
          {[
            ["01", lang === "es" ? "Móvil" : "Mobile", "Flutter y Dart"],
            ["02", "Frontend", "Vue, Angular, TypeScript"],
            ["03", "Backend", "Node, Laravel, .NET"],
            ["04", lang === "es" ? "Estudios" : "Studies", "USIL"],
          ].map(([index, label, value]) => (
            <li key={index} className="bg-[var(--surface)] px-4 py-4">
              <p className="font-mono text-[10px] text-[var(--lime)]">{index}</p>
              <p className="mt-2 text-sm font-medium text-[var(--ink)]">{label}</p>
              <p className="mt-1 text-xs text-[var(--soft)]">{value}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
