"use client"

import { useEffect, useState } from "react"
import ThemeSwitch from "@/components/ThemeSwitch"
import { useLanguage } from "@/context/LanguageContext"
import Link from "next/link"
import Image from "next/image"

type Lang = "es" | "en";

const NAV_LINKS: Record<Lang, { label: string; href: string }[]> = {
  es: [
    { label: "Sobre mí", href: "#about" },
    { label: "Habilidades", href: "#skills" },
    { label: "Proyectos", href: "#projects" },
    { label: "Contacto", href: "#contact" },
  ],
  en: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ]
}

export default function Navbar() {
  const { lang, setLang } = useLanguage()
  const [isDark, setIsDark] = useState<boolean>(false)

  useEffect(() => {
    const handler = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    handler()
    const observer = new MutationObserver(handler)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="w-full border-b bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 gap-4 md:gap-0">
        {/* Logo dinámico por tema */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={isDark ? "/LogoB.png" : "/LogoN.png"}
            alt="Logo Fabricio Aylas"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
            priority
          />
        </Link>
        {/* Links con glitch effect SOLO en hover */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-8 items-center">
          {NAV_LINKS[lang].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="glitch font-mono font-semibold 
                text-slate-800 dark:text-slate-200 
                transition"
            >
              {link.label}
            </a>
          ))}
        </div>
        {/* Acciones: idioma y tema */}
        <div className="flex gap-2 items-center">
          <button
            className="glitch border px-3 py-1 rounded-full text-xs font-medium 
              hover:bg-slate-100 dark:hover:bg-slate-800 
              transition"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            aria-label="Cambiar idioma"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  )
}