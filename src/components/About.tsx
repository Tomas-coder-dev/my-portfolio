"use client";

import { useLanguage } from "@/context/LanguageContext";
import TiltCard from "@/components/TiltCard";
import { Award, GraduationCap, MapPin } from "lucide-react";

const PILLARS = [
  {
    title: { es: "Móvil en producción", en: "Mobile in production" },
    text: {
      es: "Flutter para Android e iOS, con publicaciones en Google Play y App Store.",
      en: "Flutter for Android and iOS, released on Google Play and the App Store.",
    },
  },
  {
    title: { es: "Backend y cloud", en: "Backend and cloud" },
    text: {
      es: "APIs REST, microservicios y despliegues en Google Cloud Run con Docker.",
      en: "REST APIs, microservices and deploys on Google Cloud Run with Docker.",
    },
  },
  {
    title: { es: "IA e identidad", en: "AI and identity" },
    text: {
      es: "Biometría, prueba de vida, OCR y visión computacional en flujos reales.",
      en: "Biometrics, liveness, OCR and computer vision in real product flows.",
    },
  },
];

export default function About() {
  const { lang } = useLanguage();

  const profile = {
    es: [
      "Desarrollador Full Stack con experiencia en el desarrollo y mantenimiento de aplicaciones web y móviles, APIs REST, microservicios e integraciones con inteligencia artificial. He participado en soluciones de biometría y verificación de identidad, reconocimiento óptico de caracteres (OCR), visión computacional y plataformas empresariales.",
      "Trabajo con tecnologías como Flutter, Vue.js, Angular, Node.js, TypeScript, Laravel y .NET, integrando servicios cloud, bases de datos y herramientas de control de versiones. Cuento con experiencia en despliegues en Google Cloud Run y publicación de aplicaciones en Google Play y App Store. Egresado de Diseño y Desarrollo de Software por TECSUP y estudiante de Ingeniería de Software en USIL.",
    ],
    en: [
      "Full Stack developer with experience building and maintaining web and mobile apps, REST APIs, microservices and AI integrations. I have worked on biometrics and identity verification, OCR, computer vision and enterprise platforms.",
      "I work with technologies such as Flutter, Vue.js, Angular, Node.js, TypeScript, Laravel and .NET, integrating cloud services, databases and version control. I have experience deploying on Google Cloud Run and publishing apps on Google Play and the App Store. Graduate of Software Design and Development at TECSUP and a Software Engineering student at USIL.",
    ],
  };

  const education = [
    {
      school: "Universidad San Ignacio de Loyola (USIL)",
      place: "Lima, Perú",
      degree: { es: "Ingeniería de Software", en: "Software Engineering" },
      date: { es: "2026 — Actualidad", en: "2026 — Present" },
    },
    {
      school: "TECSUP",
      place: "Lima, Perú",
      degree: {
        es: "Diseño y Desarrollo de Software — Egresado · Grado de bachiller",
        en: "Software Design and Development — Graduate · Bachelor's degree",
      },
      date: { es: "2023 — 2025", en: "2023 — 2025" },
    },
  ];

  const certs = [
    { es: "Scrum Fundamentals Certified — SCRUMstudy", en: "Scrum Fundamentals Certified — SCRUMstudy" },
    { es: "Fundamentos de Ciberseguridad — Cisco", en: "Cybersecurity Fundamentals — Cisco" },
    { es: "Participante — Hackathon Becas BCP 2025", en: "Participant — BCP Scholarship Hackathon 2025" },
    { es: "Equipo seleccionado — Hackathon TECSUP 2024", en: "Selected team — TECSUP Hackathon 2024" },
    { es: "Training Camp CPC — UTEC", en: "Training Camp CPC — UTEC" },
  ];

  return (
    <section id="about" className="scroll-mt-24 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--lime)]">
          {lang === "es" ? "01  —  Perfil" : "01  —  Profile"}
        </p>
        <h2 className="mt-4 max-w-4xl text-[clamp(2.8rem,6vw,5.4rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-[var(--ink)]">
          {lang === "es" ? "Biometría, OCR" : "Biometrics, OCR"}
          <span className="signal block text-[var(--lime)]">
            {lang === "es" ? "y apps publicadas." : "and shipped apps."}
          </span>
        </h2>

        <TiltCard className="mt-10">
        <div className="rounded-[1.8rem] border border-[var(--line)] bg-[var(--surface)]/90 p-6 shadow-[0_18px_40px_-28px_rgba(255,45,60,0.35)] md:p-10">
        <div className="max-w-3xl space-y-4 text-base leading-relaxed text-[var(--ink)] md:text-lg">
          {profile[lang].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <ul className="mt-10 grid gap-3 md:grid-cols-3">
          {PILLARS.map((item, index) => (
            <li key={item.title.es} className="rounded-2xl border border-[var(--line)] bg-[var(--chip)] px-4 py-4">
              <p className="font-mono text-[11px] text-[var(--lime)]">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 font-semibold text-[var(--ink)]">{item.title[lang]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--soft)]">{item.text[lang]}</p>
            </li>
          ))}
        </ul>
        </div>
        </TiltCard>

        <div className="mt-14 grid gap-5 border-t border-[var(--line)] pt-8 md:grid-cols-2">
          <TiltCard>
            <div className="glow-card h-full border border-[var(--line)] p-6 shadow-[0_18px_40px_-28px_rgba(255,45,60,0.35)]">
              <div className="relative z-[1]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl border border-[var(--lime)] bg-[var(--chip)] text-[var(--lime)] shadow-[0_0_24px_-8px_rgba(255,45,60,0.55)]">
                    <GraduationCap className="size-5" />
                  </span>
                  <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--lime)]">
                    {lang === "es" ? "Educación" : "Education"}
                  </h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {education.map((item) => (
                    <li
                      key={item.school}
                      className="rounded-2xl border border-[var(--line)] bg-[var(--chip)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <p className="font-semibold leading-snug text-[var(--ink)]">{item.school}</p>
                        <p className="shrink-0 rounded-full border border-[var(--lime)] px-2 py-0.5 font-mono text-[10px] text-[var(--lime)]">
                          {item.date[lang]}
                        </p>
                      </div>
                      <p className="mt-2 text-sm text-[var(--soft)]">{item.degree[lang]}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-[var(--soft)]">
                        <MapPin className="size-3 text-[var(--lime)]" />
                        {item.place}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TiltCard>
          <TiltCard>
            <div className="glow-card h-full border border-[var(--line)] p-6 shadow-[0_18px_40px_-28px_rgba(255,45,60,0.35)]">
              <div className="relative z-[1]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl border border-[var(--lime)] bg-[var(--chip)] text-[var(--lime)] shadow-[0_0_24px_-8px_rgba(255,45,60,0.55)]">
                    <Award className="size-5" />
                  </span>
                  <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--lime)]">
                    {lang === "es" ? "Certificaciones y actividades" : "Certifications and activities"}
                  </h3>
                </div>
                <ul className="mt-5 space-y-2">
                  {certs.map((cert) => (
                    <li
                      key={cert.es}
                      className="flex items-start gap-3 rounded-xl border border-[var(--line)] bg-[var(--chip)] px-3 py-2.5 text-sm text-[var(--ink)]"
                    >
                      <Award className="mt-0.5 size-3.5 shrink-0 text-[var(--lime)]" />
                      {cert[lang]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
