"use client";

import type { MouseEvent, ReactNode } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { EMAIL, GITHUB, LINKEDIN, WHATSAPP } from "@/lib/utils";
import { openWhatsApp } from "@/lib/celebrate";
import { SiGithub, SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Linkedin } from "lucide-react";

function SocialButton({
  href,
  label,
  children,
  glow,
  onClick,
}: {
  href: string;
  label: string;
  children: ReactNode;
  glow?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-11 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] transition hover:-translate-y-1 hover:border-[var(--lime)]"
      style={{
        boxShadow: glow ? `0 0 20px -8px ${glow}` : undefined,
      }}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const { lang } = useLanguage();

  const subtitle =
    lang === "es"
      ? "Desarrollador Full Stack · Ing. de Software (USIL) · Egresado TECSUP"
      : "Full Stack Developer · Software Engineering (USIL) · TECSUP Graduate";

  return (
    <footer className="border-t border-[var(--line)] px-4 pb-10 pt-8 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-tight text-[var(--ink)] md:text-xl">FABRICIO AYLAS MORENO</p>
          <p className="mt-1 max-w-md text-sm text-[var(--soft)]">{subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <SocialButton href={GITHUB} label="GitHub" glow="rgba(255,45,60,0.35)">
            <SiGithub size={20} color="currentColor" />
          </SocialButton>
          <SocialButton href={LINKEDIN} label="LinkedIn" glow="rgba(10,102,194,0.45)">
            <Linkedin className="size-5 text-[#0A66C2]" />
          </SocialButton>
          <SocialButton href={`mailto:${EMAIL}`} label="Email" glow="rgba(167,139,250,0.4)">
            <Mail className="size-5 text-[#c4b5fd]" />
          </SocialButton>
          <SocialButton href={WHATSAPP} label="WhatsApp" glow="rgba(37,211,102,0.45)" onClick={(event) => openWhatsApp(event, WHATSAPP)}>
            <SiWhatsapp size={20} color="#25D366" />
          </SocialButton>
          <a
            href="#hero"
            className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)] transition hover:-translate-y-1 hover:border-[var(--lime)] hover:text-[var(--lime)]"
            aria-label={lang === "es" ? "Volver arriba" : "Back to top"}
          >
            <ArrowUp className="size-5" />
          </a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl font-mono text-xs text-[var(--soft)]">
        © {new Date().getFullYear()} Fabricio Aylas Moreno · Lima, Perú
      </p>
    </footer>
  );
}
