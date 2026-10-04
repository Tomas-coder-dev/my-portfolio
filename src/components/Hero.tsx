"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const profile = {
  name: "Fabricio Aylas",
  avatar: "https://avatars.githubusercontent.com/u/149453943?v=4",
  title: {
    en: "Software engineer & Full Stack Developer",
    es: "Ingeniero de Software y Desarrollador Full Stack",
  },
  typing: {
    en: "Building scalable web & mobile solutions.",
    es: "Construyendo soluciones web y móviles escalables.",
  },
};

export default function Hero() {
  const { lang } = useLanguage();
  const typingText = profile.typing[lang];

  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");
  const [index, setIndex] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTyped("");
    setPhase("typing");
    setIndex(0);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, [typingText]);

  useEffect(() => {
    if (phase === "typing") {
      if (index < typingText.length) {
        timerRef.current = setTimeout(() => {
          setTyped(typingText.slice(0, index + 1));
          setIndex(index + 1);
        }, 100);
      } else {
        timerRef.current = setTimeout(() => setPhase("pause"), 1500);
      }
    } else if (phase === "pause") {
      timerRef.current = setTimeout(() => setPhase("deleting"), 1500);
    } else if (phase === "deleting") {
      if (index > 0) {
        timerRef.current = setTimeout(() => {
          setTyped(typingText.slice(0, index - 1));
          setIndex(index - 1);
        }, 50);
      } else {
        timerRef.current = setTimeout(() => setPhase("typing"), 100);
      }
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, index, typingText]);

  return (
    <section id="hero" className="min-h-[90vh] flex items-center justify-center px-6 pt-16">
      <div className="flex flex-col lg:flex-row gap-12 items-center justify-center w-full max-w-5xl">
        <div className="flex-1 flex justify-center lg:justify-end mb-8 lg:mb-0">
          <div className="relative rounded-full border-4 border-blue-500/30 dark:border-blue-400/30 p-2 shadow-2xl shadow-blue-500/20">
            <div className="rounded-full overflow-hidden w-[260px] h-[260px] md:w-[320px] md:h-[320px] bg-slate-200 dark:bg-slate-800">
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={320}
                height={320}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-slate-900 dark:text-white font-extrabold text-5xl md:text-6xl lg:text-7xl font-sans tracking-tight">
            {profile.name}
          </h1>
          <h2 className="text-blue-600 dark:text-blue-400 text-2xl md:text-3xl lg:text-4xl font-bold mt-4">
            {profile.title[lang]}
          </h2>
          <div className="text-xl md:text-2xl font-mono min-h-[60px] mt-4 text-slate-600 dark:text-slate-300">
            <span>{typed}</span>
            <span className="animate-pulse inline-block ml-1 text-blue-500">|</span>
          </div>
          <div className="flex gap-4 mt-8">
            <a href="#projects" className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
              {lang === "es" ? "Ver Proyectos" : "View Projects"}
            </a>
            <a href="#contact" className="px-6 py-3 rounded-full border-2 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition font-semibold">
              {lang === "es" ? "Contáctame" : "Contact Me"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
