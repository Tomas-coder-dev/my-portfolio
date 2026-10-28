"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const LINKS = {
  es: [
    { id: "hero", label: "Inicio" },
    { id: "about", label: "Perfil" },
    { id: "projects", label: "Proyectos" },
    { id: "experience", label: "Experiencia" },
    { id: "skills", label: "Habilidades" },
    { id: "arcade", label: "Juego" },
    { id: "contact", label: "Contacto" },
  ],
  en: [
    { id: "hero", label: "Home" },
    { id: "about", label: "Profile" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "arcade", label: "Game" },
    { id: "contact", label: "Contact" },
  ],
} as const;

export default function SectionRail() {
  const { lang } = useLanguage();
  const [active, setActive] = useState("hero");
  const links = LINKS[lang];

  useEffect(() => {
    const nodes = links
      .map((link) => document.getElementById(link.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.15, 0.4] }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [links]);

  return (
    <nav className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 min-[1400px]:block" aria-label={lang === "es" ? "Índice" : "Index"}>
      <ul className="flex flex-col gap-2">
        {links.map((link) => {
          const on = active === link.id;
          return (
            <li key={link.id}>
              <a
                href={`/#${link.id}`}
                className={`block rounded-full px-2 py-1 text-[11px] font-medium tracking-wide ${on ? "text-[var(--lime)]" : "text-[var(--soft)] hover:text-[var(--ink)]"}`}
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
