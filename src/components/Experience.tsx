"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";
import SectionTitle from "@/components/SectionTitle";
import TiltCard from "@/components/TiltCard";
import GlowSkillTag from "@/components/GlowSkillTag";
import { Briefcase } from "lucide-react";

type Copy = { es: string; en: string };

type Job = {
  company: string;
  product: Copy;
  role: Copy;
  date: Copy;
  place: Copy;
  current?: boolean;
  stack: string[];
  points: { es: string[]; en: string[] };
};

const JOBS: Job[] = [
  {
    company: "Belity",
    product: { es: "Plataforma de belleza a domicilio", en: "At-home beauty platform" },
    role: { es: "Desarrollador Full Stack Mobile", en: "Full Stack Mobile Developer" },
    date: { es: "Octubre 2026 — Actualidad", en: "October 2026 — Present" },
    place: { es: "Lima, Perú", en: "Lima, Peru" },
    current: true,
    stack: ["Flutter", "GetX", "Firebase", "Node.js", "TypeScript", "Laravel", "Docker", "Cloud Run", "AWS Rekognition", "ML Kit"],
    points: {
      es: [
        "Implementación de procesos de verificación de identidad mediante AWS Rekognition, incluyendo comparación facial y prueba de vida (Face Liveness).",
        "Integración de servicios de inteligencia artificial con Grok para la clasificación y evaluación de calidad de imágenes durante el registro de profesionales.",
        "Desarrollo de funcionalidades de OCR y validación documental para DNI, cédulas, pasaportes y documentos PDF mediante Google ML Kit.",
        "Desarrollo e integración de microservicios con Node.js, TypeScript y Express, desplegados en Google Cloud Run mediante Docker y conectados con Laravel.",
        "Mantenimiento y evolución de la aplicación móvil en Flutter, utilizando GetX y Firebase, y gestión de publicaciones en Google Play Console y App Store Connect.",
      ],
      en: [
        "Implemented identity verification with AWS Rekognition, including facial comparison and Face Liveness.",
        "Integrated Grok to classify images and assess their quality while professionals sign up.",
        "Built OCR and document validation for national IDs, passports and PDFs with Google ML Kit.",
        "Built and integrated microservices with Node.js, TypeScript and Express, deployed on Google Cloud Run with Docker and connected to Laravel.",
        "Maintained and evolved the Flutter app with GetX and Firebase, and managed releases on Google Play Console and App Store Connect.",
      ],
    },
  },
  {
    company: "Firefly One",
    product: { es: "Sistemas para el sector asegurador", en: "Insurance-sector systems" },
    role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
    date: { es: "Julio 2026 — Septiembre 2026", en: "July 2026 — September 2026" },
    place: { es: "Lima, Perú", en: "Lima, Peru" },
    stack: ["Vue.js", "Laravel", "REST", "GitHub", "Jira"],
    points: {
      es: [
        "Desarrollo y modernización de sistemas empresariales para el sector asegurador mediante Vue.js y Laravel.",
        "Implementación y consumo de APIs REST, con énfasis en la integración entre frontend y backend, la seguridad y el rendimiento.",
        "Gestión de código mediante Git y GitHub, participando en Pull Requests y revisiones de código para mejorar la mantenibilidad.",
        "Seguimiento de tareas y coordinación con equipos multidisciplinarios mediante Jira y metodologías ágiles.",
      ],
      en: [
        "Built and modernized enterprise systems for the insurance sector with Vue.js and Laravel.",
        "Implemented and consumed REST APIs, with emphasis on frontend-backend integration, security and performance.",
        "Managed code with Git and GitHub, taking part in pull requests and code reviews to improve maintainability.",
        "Tracked tasks and coordinated with cross-functional teams using Jira and agile methods.",
      ],
    },
  },
  {
    company: "Syncra Connect",
    product: { es: "CRM empresarial · Proyecto Unilene", en: "Enterprise CRM · Unilene project" },
    role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
    date: { es: "Febrero 2026 — Junio 2026", en: "February 2026 — June 2026" },
    place: { es: "Lima, Perú", en: "Lima, Peru" },
    stack: [".NET", "Angular", "Flutter", "SQL Server", "Git"],
    points: {
      es: [
        "Desarrollo y mantenimiento de funcionalidades para un CRM empresarial.",
        "Implementación y consumo de APIs REST con .NET y desarrollo de interfaces con Angular.",
        "Participación en el desarrollo de funcionalidades móviles utilizando Flutter.",
        "Creación y optimización de consultas y procedimientos almacenados en SQL Server.",
        "Corrección de incidencias, mantenimiento de funcionalidades existentes y control de versiones con Git.",
      ],
      en: [
        "Built and maintained features for an enterprise CRM.",
        "Implemented and consumed REST APIs with .NET and built interfaces with Angular.",
        "Took part in mobile features using Flutter.",
        "Created and optimized SQL Server queries and stored procedures.",
        "Fixed issues, maintained existing features and handled version control with Git.",
      ],
    },
  },
  {
    company: "TECSUP",
    product: { es: "Inventario químico de laboratorio", en: "Academic lab chemical inventory" },
    role: { es: "Desarrollador Full Stack — Proyecto académico", en: "Full Stack Developer — Academic project" },
    date: { es: "Mayo 2025 — Septiembre 2025", en: "May 2025 — September 2025" },
    place: { es: "Lima, Perú", en: "Lima, Peru" },
    stack: ["Laravel", "SQLite", "CRUD"],
    points: {
      es: [
        "Desarrollo de un sistema web para la gestión de inventario químico de un laboratorio académico.",
        "Implementación de operaciones CRUD, control de existencias y generación de reportes automatizados.",
        "Desarrollo del backend con Laravel y gestión de datos mediante SQLite.",
        "Documentación técnica y desarrollo iterativo bajo una metodología ágil.",
      ],
      en: [
        "Built a web system to manage the chemical inventory of an academic laboratory.",
        "Implemented CRUD operations, stock control and automated reports.",
        "Built the backend with Laravel and stored the data in SQLite.",
        "Wrote technical documentation and delivered the work iteratively under an agile method.",
      ],
    },
  },
  {
    company: "Cimark Comunicación Corporativa S.A.C.",
    product: { es: "Interfaces web y experiencia de usuario", en: "Web interfaces and user experience" },
    role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
    date: { es: "Febrero 2024 — Enero 2025", en: "February 2024 — January 2025" },
    place: { es: "Lima, Perú", en: "Lima, Peru" },
    stack: ["UX/UI", "Responsive", "Web"],
    points: {
      es: [
        "Desarrollo y mejora de interfaces web con enfoque en experiencia de usuario (UX/UI) y diseño adaptable.",
        "Implementación de mejoras visuales y funcionales a partir del análisis de plataformas del sector.",
        "Optimización de la navegación, estructura y usabilidad de sitios web.",
        "Colaboración con el equipo interno para alinear las soluciones de interfaz con los objetivos del negocio.",
      ],
      en: [
        "Built and improved web interfaces focused on user experience (UX/UI) and responsive design.",
        "Implemented visual and functional improvements based on analysis of platforms in the sector.",
        "Improved navigation, structure and usability of the websites.",
        "Worked with the internal team so the interface solutions matched business goals.",
      ],
    },
  },
];

export default function Experience() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="scroll-mt-24 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          kicker="03  //  experiencia"
          title={lang === "es" ? "Experiencia" : "Experience"}
          icon={<Briefcase className="size-7" />}
        />

        <div className="relative">
          <div
            aria-hidden
            className="absolute bottom-4 left-[11px] top-2 w-px bg-gradient-to-b from-[var(--lime)] via-[var(--line)] to-transparent md:left-[31px]"
          />
          <ol className="m-0 grid list-none gap-8 p-0">
          {JOBS.map((job, index) => {
            const [start, end] = job.date[lang].split(" — ");
            return (
              <motion.li
                key={job.company}
                className="relative pl-9 md:pl-16"
                initial={reduce ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : index * 0.05 }}
              >
                <span
                  className={`timeline-dot absolute left-0 top-8 z-10 size-[14px] rounded-full border-2 border-[var(--bg)] md:left-6 ${job.current ? "bg-[var(--lime)]" : "bg-[var(--soft)]"}`}
                  aria-hidden
                />
                <TiltCard>
                  <article className="glow-card border border-[var(--line)] p-6 shadow-[0_18px_40px_-28px_rgba(255,45,60,0.35)] md:p-8">
                    <div className="relative z-[1]">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <p className="font-mono text-sm text-[var(--lime)]">{String(index + 1).padStart(2, "0")}</p>
                        <div>
                          <h3 className="text-2xl font-semibold tracking-tight text-[var(--ink)] md:text-3xl">{job.company}</h3>
                          <p className="mt-1 text-sm text-[var(--soft)]">{job.product[lang]}</p>
                        </div>
                      </div>
                      <p className="font-mono text-xs text-[var(--soft)] md:text-right">
                        <span className="block text-[var(--ink)]">{start}</span>
                        <span className={`mt-1 block ${job.current ? "text-[var(--lime)]" : ""}`}>{end ?? job.date[lang]}</span>
                      </p>
                    </div>
                    <p className="mt-4 text-sm text-[var(--ink)]">
                      {job.role[lang]}
                      <span className="text-[var(--soft)]"> · {job.place[lang]}</span>
                    </p>
                    <ul className="mt-4 space-y-2">
                      {job.points[lang].map((point) => (
                        <li key={point} className="text-sm leading-relaxed text-[var(--soft)]">
                          {point}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {job.stack.map((t) => (
                        <li key={t}>
                          <GlowSkillTag label={t} />
                        </li>
                      ))}
                    </ul>
                    </div>
                  </article>
                </TiltCard>
              </motion.li>
            );
          })}
        </ol>
        </div>
      </div>
    </section>
  );
}
