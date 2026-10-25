"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ThemeSwitch from "@/components/ThemeSwitch";
import LangSwitch from "@/components/LangSwitch";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X } from "lucide-react";

const NAV = {
  es: [
    { label: "Perfil", href: "#about" },
    { label: "Proyectos", href: "#projects" },
    { label: "Experiencia", href: "#experience" },
    { label: "Habilidades", href: "#skills" },
  ],
  en: [
    { label: "Profile", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
  ],
} as const;

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const links = NAV[lang];

  useEffect(() => {
    const ids = ["hero", "about", "projects", "experience", "skills", "contact"];
    const nodes = ids.map((id) => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.15, 0.4] }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="relative z-50 border-b border-[var(--line)] bg-[var(--bg)]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <a href="#hero" className="glitch font-mono text-sm font-semibold tracking-tight text-[var(--ink)]">
          FA<span className="text-[var(--lime)]">/</span>dev
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label={lang === "es" ? "Secciones" : "Sections"}>
          {links.map((link) => {
            const id = link.href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`text-sm ${isActive ? "text-[var(--lime)]" : "text-[var(--soft)] hover:text-[var(--ink)]"}`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn btn-primary glitch hidden px-3 py-2 md:inline-flex">
            {lang === "es" ? "Contacto" : "Contact"}
          </a>
          <LangSwitch lang={lang} onToggle={() => setLang(lang === "es" ? "en" : "es")} />
          <ThemeSwitch />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)] md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? (lang === "es" ? "Cerrar menú" : "Close menu") : lang === "es" ? "Abrir menú" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col justify-end gap-5 bg-[var(--bg)] px-8 pb-16 pt-24 md:hidden"
            aria-label={lang === "es" ? "Secciones" : "Sections"}
          >
            {links.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="text-4xl font-semibold tracking-tight text-[var(--ink)]"
              >
                {link.label}
              </motion.a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary mt-4 w-fit">
              {lang === "es" ? "Contacto" : "Contact"}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
