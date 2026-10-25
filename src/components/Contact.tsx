"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import SectionTitle from "@/components/SectionTitle";
import { EMAIL, GITHUB, LINKEDIN, PHONE } from "@/lib/utils";
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const profiles = [
    { user: "Tomas-coder-dev", href: GITHUB, label: "GitHub", icon: Github },
    { user: "fabricio-aylas", href: LINKEDIN, label: "LinkedIn", icon: Linkedin },
  ];

  return (
    <section id="contact" className="scroll-mt-24 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          kicker="05  //  contacto"
          title={lang === "es" ? "Contacto" : "Contact"}
          icon={<Mail className="size-7" />}
        />

        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
        <p className="max-w-xl text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)] md:text-5xl">
          {lang === "es" ? "La pantalla, la API y la publicación." : "The screen, the API and the release."}
        </p>
        <p className="mt-4 max-w-lg text-lg text-[var(--soft)]">
          {lang === "es"
            ? "Web o móvil. Lo armo yo, y lo dejo funcionando."
            : "Web or mobile. I build it, and I leave it running."}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${EMAIL}`} className="btn btn-primary glitch">
            {lang === "es" ? "Escribir correo" : "Send email"}
          </a>
          <button type="button" onClick={copyEmail} className="btn btn-secondary glitch">
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? (lang === "es" ? "Copiado" : "Copied") : lang === "es" ? "Copiar email" : "Copy email"}
          </button>
        </div>
        </div>

        <ul className="space-y-3">
          {profiles.map((profile) => {
            const Icon = profile.icon;
            return (
              <li key={profile.label} className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-4">
                <span className="font-mono text-sm text-[var(--ink)]">{profile.user}</span>
                <a href={profile.href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary px-3 py-2">
                  <Icon className="size-4" />
                  {profile.label}
                </a>
              </li>
            );
          })}
        </ul>
        </div>

        <p className="mt-8 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-[var(--soft)]">
          <a href={`mailto:${EMAIL}`} className="hover:text-[var(--lime)]">{EMAIL}</a>
          <a href="tel:+51912404450" className="hover:text-[var(--lime)]">{PHONE}</a>
          <span>Lima, Perú</span>
        </p>
      </div>
    </section>
  );
}
