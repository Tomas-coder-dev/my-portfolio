"use client";

import { useEffect, useState } from "react";
import { Briefcase, GraduationCap, Languages, Layers, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import TiltPortrait from "@/components/TiltPortrait";
import TiltCard from "@/components/TiltCard";
import HeroActions from "@/components/HeroActions";

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
    status: {
      es: "// STATUS: Disponible para proyectos y oportunidades",
      en: "// STATUS: Open to projects and opportunities",
    },
    kicker: { es: "Belity · Lima · USIL", en: "Belity · Lima · USIL" },
    a: { es: "Fabricio", en: "Fabricio" },
    b: { es: "Aylas", en: "Aylas" },
    c: { es: "Full stack.", en: "Full stack." },
    who: { es: "Play Store, App Store y Cloud Run.", en: "Play Store, App Store and Cloud Run." },
    study: { es: "Ingeniería de Software · USIL", en: "Software Engineering · USIL" },
    stats: {
      es: [
        { value: "+2", title: "años", sub: "Experiencia profesional", detail: "Full stack en producción desde 2024" },
        { value: "3+", title: "destacados", sub: "De varios proyectos", detail: "ULenguage, SaveBot y PostulaFácil, entre otros" },
        { value: "TECSUP", title: "+ USIL", sub: "Formación", detail: "Diseño de software e ingeniería" },
        { value: "Inglés", title: "B2", sub: "Dominio de idioma", detail: "Español nativo · inglés B2" },
      ],
      en: [
        { value: "+2", title: "years", sub: "Professional experience", detail: "Full stack in production since 2024" },
        { value: "3+", title: "featured", sub: "From a larger set", detail: "ULenguage, SaveBot and PostulaFácil, among others" },
        { value: "TECSUP", title: "+ USIL", sub: "Education", detail: "Software design and engineering" },
        { value: "English", title: "B2", sub: "Language level", detail: "Native Spanish · English B2" },
      ],
    },
  };

  const statIcons = [Briefcase, Layers, GraduationCap, Languages];

  return (
    <section id="hero" className="scroll-mt-28 px-4 pb-16 pt-10 md:px-6 md:pb-20 md:pt-16">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] text-[var(--lime)]">{copy.status[lang]}</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--soft)]">
          <span className="text-[var(--lime)]">{copy.kicker[lang]}</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3" /> Lima, Perú
          </span>
        </div>

        <div className="relative mt-8 lg:mt-10">
          <div className="lg:pr-[22rem]">
            <h1 className="text-[clamp(3.2rem,7.4vw,6.8rem)] font-semibold leading-[0.86] tracking-[-0.055em] text-[var(--ink)]">
              <span className="block">{copy.a[lang]}</span>
              <span className="mt-1 flex flex-wrap items-end gap-x-6 gap-y-2">
                <span className="glitch-soft">{copy.b[lang]}</span>
                <span className="signal glitch-soft pb-[0.18em] text-[clamp(1.45rem,2.8vw,2.5rem)] leading-none tracking-[-0.04em] text-[var(--lime)]">
                  {copy.c[lang]}
                </span>
              </span>
            </h1>

            <div className="mt-8 max-w-md space-y-5">
              <p className="text-lg leading-relaxed text-[var(--ink)]">{copy.who[lang]}</p>
              <p className="font-mono text-sm leading-relaxed text-[var(--soft)]">
                {copy.study[lang]}
                <span className="mx-2 text-[var(--lime)]">/</span>
                {typed}
                <span className="ml-0.5 inline-block h-3 w-px translate-y-0.5 bg-[var(--lime)]" />
              </p>
              <HeroActions />
            </div>
          </div>
          <div className="mt-12 flex justify-center lg:absolute lg:right-0 lg:top-0 lg:mt-0">
            <TiltPortrait />
          </div>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.stats[lang].map((stat, index) => {
            const Icon = statIcons[index] ?? Briefcase;
            return (
              <li key={stat.sub}>
                <TiltCard className="h-full">
                  <div className="relative h-full overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_18px_40px_-24px_rgba(255,45,60,0.5)]">
                    <span className="pointer-events-none absolute -right-8 -top-10 size-28 rounded-full bg-[var(--lime)]/15 blur-2xl" />
                    <div className="relative flex items-center justify-between gap-3">
                      <span className="inline-flex size-9 items-center justify-center rounded-xl border border-[var(--lime)]/35 bg-[var(--lime)]/10 text-[var(--lime)] shadow-[0_0_18px_-6px_rgba(255,45,60,0.8)]">
                        <Icon className="size-4" />
                      </span>
                      <p className="text-right font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--lime)]">{stat.sub}</p>
                    </div>
                    <p className="relative mt-6 text-[2rem] font-semibold leading-none tracking-tight text-[var(--ink)]">
                      {stat.value}
                      <span className="ml-2 text-base font-medium text-[var(--lime)]">{stat.title}</span>
                    </p>
                    <p className="relative mt-3 text-sm leading-relaxed text-[var(--soft)]">{stat.detail}</p>
                  </div>
                </TiltCard>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
