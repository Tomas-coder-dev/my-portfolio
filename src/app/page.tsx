"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Datos de tu perfil
const profile = {
  name: "Fabricio Aylas",
  avatar: "https://avatars.githubusercontent.com/u/149453943?v=4",
  title: {
    en: "Software engineer",
    es: "Ingeniero de Software",
  },
  typing: {
    en: "in progress",
    es: "en proceso",
  },
};

export default function Home() {
  const { lang } = useLanguage();
  const typingText = profile.typing[lang];

  // Estados de animación
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");
  const [index, setIndex] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Cuando cambia el texto a tipear, resetea la animación SOLO UNA VEZ
  useEffect(() => {
    setTyped("");
    setPhase("typing");
    setIndex(0);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, [typingText]);

  // Animación de tipeo
  useEffect(() => {
    if (phase === "typing") {
      if (index < typingText.length) {
        timerRef.current = setTimeout(() => {
          setTyped(typingText.slice(0, index + 1));
          setIndex(index + 1);
        }, 110);
      } else {
        timerRef.current = setTimeout(() => setPhase("pause"), 700);
      }
    } else if (phase === "pause") {
      timerRef.current = setTimeout(() => setPhase("deleting"), 700);
    } else if (phase === "deleting") {
      if (index > 0) {
        timerRef.current = setTimeout(() => {
          setTyped(typingText.slice(0, index - 1));
          setIndex(index - 1);
        }, 110);
      } else {
        timerRef.current = setTimeout(() => setPhase("typing"), 110);
      }
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, index, typingText]);

  // Detecta modo claro/oscuro (solo para colores extra)
  const [isDark, setIsDark] = useState(() =>
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );
  useEffect(() => {
    const handler = () => {
      const currentDark = document.documentElement.classList.contains("dark");
      setIsDark(currentDark);
    };
    const observer = new MutationObserver(handler);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Colores y estilos
  const bgColor = isDark ? "bg-[#23293a]" : "bg-white";
  const nameColor = isDark ? "text-white" : "text-slate-900";
  const titleColor = isDark ? "text-[#8bb6ff]" : "text-[#2563eb]";
  const typeColor = isDark ? "text-[#00b6ff]" : "text-[#2563eb]";
  const avatarBorder = isDark ? "border-[#23293a]" : "border-slate-200";
  const avatarBg = isDark ? "bg-slate-800" : "bg-slate-200";
  const shadowClass = isDark ? "shadow-2xl" : "shadow-xl";

  return (
    <div className={`min-h-screen ${bgColor} flex items-center justify-center px-6 transition-colors duration-300`}>
      <div className="flex flex-col lg:flex-row gap-12 items-center justify-center w-full max-w-5xl py-12">
        {/* Imagen de perfil a la izquierda */}
        <div className="flex-1 flex justify-center lg:justify-end mb-8 lg:mb-0">
          <div className={`rounded-full border-8 ${avatarBorder} ${shadowClass} ${avatarBg} overflow-hidden w-[260px] h-[260px] md:w-[300px] md:h-[300px] flex items-center justify-center`}>
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={300}
              height={300}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
        {/* Info/texto a la derecha */}
        <div className="flex-1 flex flex-col items-center lg:items-start">
          <h1 className={`${nameColor} font-extrabold text-4xl md:text-6xl lg:text-7xl font-sans`}>
            {profile.name}
          </h1>
          <h2 className={`${titleColor} text-2xl md:text-3xl lg:text-4xl font-semibold mt-4 font-sans`}>
            {profile.title[lang]}
          </h2>
          <div className={`text-2xl md:text-3xl lg:text-4xl font-mono min-h-[40px] flex items-center mt-2 ${typeColor}`}>
            <span>{typed}</span>
            <span className="animate-blink">|</span>
          </div>
        </div>
      </div>
      {/* Animación del cursor que parpadea */}
      <style>{`
        .animate-blink {
          animation: blink-cursor 1s steps(2) infinite;
        }
        @keyframes blink-cursor {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}