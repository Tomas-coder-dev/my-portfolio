"use client";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { EMAIL, GITHUB, LINKEDIN } from "@/lib/utils";

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="px-4 pb-8 pt-6 md:px-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#141416] px-6 py-10 text-[#f5f5f5] md:px-10 md:py-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#ff2d3c]">
          {lang === "es" ? "Siguiente paso" : "Next step"}
        </p>
        <a href={`mailto:${EMAIL}`} className="mt-4 block max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
          {lang === "es" ? "Cuéntame el producto." : "Tell me about the product."}
          <ArrowUpRight className="ml-2 inline size-8 md:size-12" />
        </a>
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
          <a href="#projects" className="hover:text-[#ff2d3c]">{lang === "es" ? "Proyectos" : "Projects"}</a>
          <a href="#experience" className="hover:text-[#ff2d3c]">{lang === "es" ? "Experiencia" : "Experience"}</a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="hover:text-[#ff2d3c]">GitHub</a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-[#ff2d3c]">LinkedIn</a>
        </div>
        <p className="mt-8 font-mono text-xs text-white/40">© {new Date().getFullYear()} Fabricio Aylas Moreno · Lima</p>
      </div>
    </footer>
  );
}
