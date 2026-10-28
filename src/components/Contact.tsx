"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import SectionTitle from "@/components/SectionTitle";
import TiltCard from "@/components/TiltCard";
import { EMAIL, GITHUB, LINKEDIN, PHONE, PHONE_E164 } from "@/lib/utils";
import { celebrate, openWhatsApp } from "@/lib/celebrate";
import { SiGithub, SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Check, Copy, Linkedin, Mail, MapPin, Send, Terminal } from "lucide-react";

const DRAFT = {
  es: "Hola Fabricio, vi tu portafolio. Me gustaría contarte sobre ",
  en: "Hi Fabricio, I saw your portfolio. I would like to tell you about ",
};

export default function Contact() {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState<"email" | "phone" | null>(null);
  const [note, setNote] = useState(DRAFT.es);

  useEffect(() => {
    setNote(DRAFT[lang]);
  }, [lang]);

  const message = () => note.trim() || DRAFT[lang];

  const whatsappUrl = () => `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(message())}`;

  const sendMail = (event: { preventDefault: () => void; clientX: number; clientY: number }) => {
    event.preventDefault();
    celebrate(event.clientX, event.clientY);
    const subject = lang === "es" ? "Vi tu portafolio — hablemos" : "I saw your portfolio — let's talk";
    window.setTimeout(() => {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message())}`;
    }, 220);
  };

  const copy = async (value: string, key: "email" | "phone") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      if (key === "email") window.location.href = `mailto:${EMAIL}`;
      else window.open(whatsappUrl(), "_blank", "noopener,noreferrer");
    }
  };

  const channels = [
    {
      id: "github",
      user: "Tomas-coder-dev",
      href: GITHUB,
      label: "GitHub",
      icon: <SiGithub size={18} color="currentColor" className="text-[var(--ink)]" />,
      external: true,
    },
    {
      id: "linkedin",
      user: "fabricio-aylas",
      href: LINKEDIN,
      label: "LinkedIn",
      icon: <Linkedin className="size-4 text-[#0A66C2]" />,
      external: true,
    },
    {
      id: "email",
      user: EMAIL,
      href: `mailto:${EMAIL}`,
      label: lang === "es" ? "Escribir correo" : "Send email",
      icon: <Mail className="size-4 text-[#a78bfa]" />,
      external: false,
    },
    {
      id: "phone",
      user: PHONE,
      href: `https://wa.me/${PHONE_E164}`,
      label: lang === "es" ? "Escribir por WhatsApp" : "Message on WhatsApp",
      icon: <SiWhatsapp size={18} color="#25D366" />,
      external: true,
    },
  ] as const;

  return (
    <section id="contact" className="scroll-mt-24 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          kicker="06  //  contacto"
          title={lang === "es" ? "Contacto" : "Contact"}
          icon={<Terminal className="size-7" />}
        />

        <p className="max-w-2xl text-[var(--soft)]">
          {lang === "es"
            ? "Escribe lo que quieras contar. Al enviar, WhatsApp o el correo se abren con el mensaje ya escrito."
            : "Write what you want to say. Send opens WhatsApp or email with the message already filled in."}
        </p>

        <TiltCard className="mt-8">
          <form
            className="glow-card border border-[var(--line)] bg-[var(--surface)] p-5 md:p-7"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="relative z-[1]">
              <label htmlFor="contact-note" className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--lime)]">
                {lang === "es" ? "Mensaje opcional" : "Optional message"}
              </label>
              <textarea
                id="contact-note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={4}
                className="mt-3 w-full resize-y rounded-2xl border border-[var(--line)] bg-[var(--chip)] px-4 py-3 text-sm leading-relaxed text-[var(--ink)] outline-none transition focus:border-[var(--lime)] focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--lime)_18%,transparent)]"
              />
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" onClick={(event) => openWhatsApp(event, whatsappUrl())} className="btn-hero btn-hero-wsp">
                  <SiWhatsapp size={16} color="currentColor" />
                  {lang === "es" ? "Enviar por WhatsApp" : "Send on WhatsApp"}
                </button>
                <button type="button" onClick={sendMail} className="btn-hero btn-hero-solid">
                  <Send className="size-4" />
                  {lang === "es" ? "Enviar correo" : "Send email"}
                </button>
              </div>
            </div>
          </form>
        </TiltCard>

        <TiltCard className="mt-5">
          <div className="terminal glow-card overflow-hidden border border-[var(--line)] bg-[var(--surface)] shadow-[0_18px_40px_-28px_rgba(22,22,22,0.28)]">
            <div className="relative z-[1]">
              <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                </div>
                <p className="min-w-0 flex-1 truncate px-2 text-center font-mono text-[10px] text-[var(--soft)] sm:text-[11px]">fabricio@lima: ~/links</p>
                <span className="rounded-full border border-[var(--lime)] px-2 py-0.5 font-mono text-[10px] text-[var(--lime)]">
                  {lang === "es" ? "DISPONIBLE" : "AVAILABLE"}
                </span>
              </div>

              <div className="border-b border-[var(--line)] px-4 py-3 font-mono text-sm">
                <span className="text-[var(--lime)]">fabricio@lima</span>
                <span className="text-[var(--soft)]"> : ~/links $ </span>
                <span className="text-[var(--ink)]">cat contact_channels.json</span>
                <span className="ml-1 inline-block h-4 w-px animate-pulse bg-[var(--lime)]" />
              </div>

              <ul className="space-y-2 p-4">
                {channels.map((channel) => {
                  const isCopy = channel.id === "email" || channel.id === "phone";
                  return (
                    <li
                      key={channel.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 shadow-[0_0_24px_-16px_rgba(255,45,60,0.4)]"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="text-[var(--lime)]">&gt;</span>
                        {channel.icon}
                        <span className="truncate font-mono text-sm text-[var(--ink)]">{channel.user}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={channel.href}
                          target={channel.external ? "_blank" : undefined}
                          rel={channel.external ? "noopener noreferrer" : undefined}
                          onClick={
                            channel.id === "phone"
                              ? (event) => openWhatsApp(event, whatsappUrl())
                              : channel.id === "email"
                                ? sendMail
                                : undefined
                          }
                          className="btn-nav btn-nav-outline h-8 min-w-0 px-3 text-xs"
                        >
                          {channel.label}
                        </a>
                        {isCopy ? (
                          <button
                            type="button"
                            onClick={() => copy(channel.id === "email" ? EMAIL : PHONE, channel.id)}
                            className="btn-hero btn-hero-outline px-3 py-2 text-xs"
                          >
                            {copied === channel.id ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                            {copied === channel.id ? (lang === "es" ? "Copiado" : "Copied") : lang === "es" ? "Copiar" : "Copy"}
                          </button>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[var(--line)] px-4 py-3 font-mono text-xs text-[var(--soft)]">
                <Mail className="size-3.5 text-[#a78bfa]" /> {EMAIL}
                <span>/</span>
                <SiWhatsapp size={14} color="#25D366" /> {PHONE}
                <span>/</span>
                <MapPin className="size-3.5 text-[var(--lime)]" /> Lima, Perú
              </p>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
