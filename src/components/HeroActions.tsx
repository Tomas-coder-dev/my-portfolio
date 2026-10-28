"use client";

import { ArrowUpRight, Download, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCvModal } from "@/context/CvContext";
import { WHATSAPP } from "@/lib/utils";
import { openWhatsApp } from "@/lib/celebrate";

export default function HeroActions() {
  const { lang } = useLanguage();
  const { setOpen } = useCvModal();

  const copy = {
    cv: lang === "es" ? "Ver CV" : "View CV",
    projects: lang === "es" ? "Proyectos" : "Projects",
    wsp: lang === "es" ? "WhatsApp" : "WhatsApp",
  };

  return (
    <div className="flex flex-wrap gap-4 pt-2">
      <button type="button" onClick={() => setOpen(true)} className="btn-hero btn-hero-solid glitch-soft group">
        <span className="btn-hero-shine" aria-hidden />
        <Download className="size-4 transition group-hover:-translate-y-0.5" />
        {copy.cv}
      </button>
      <a href="#projects" className="btn-hero btn-hero-outline glitch-soft group">
        <span className="btn-hero-shine" aria-hidden />
        {copy.projects}
        <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" onClick={(event) => openWhatsApp(event, WHATSAPP)} className="btn-hero btn-hero-wsp glitch-soft group">
        <span className="btn-hero-shine" aria-hidden />
        <MessageCircle className="size-4" />
        {copy.wsp}
      </a>
    </div>
  );
}
