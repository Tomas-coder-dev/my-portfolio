"use client";

import { useLanguage } from "@/context/LanguageContext";
import SectionTitle from "@/components/SectionTitle";
import { ArrowUpRight, FolderGit2 } from "lucide-react";

const PROJECTS = [
  {
    slug: "ulenguage",
    name: "ULenguage",
    tag: { es: "Aplicación de traducción cultural quechua", en: "Quechua cultural translation app" },
    description: {
      es: "Aplicación móvil orientada a turistas en Cusco que facilita la traducción entre quechua, español e inglés. Incorpora reconocimiento de texto desde imágenes, traducción y asistencia con inteligencia artificial para contextualizar expresiones culturales.",
      en: "Mobile app for tourists in Cusco that translates between Quechua, Spanish and English. It reads text from images and uses AI to put cultural expressions in context.",
    },
    tech: ["Flutter", "Dart", "Node.js", "Express.js", "MongoDB", "JWT", "Google Vision API", "Gemini AI", "Google Translate API", "Tesseract.js", "Swagger"],
  },
  {
    slug: "savebot",
    name: "SaveBot",
    tag: { es: "Respaldo de imágenes mediante Telegram", en: "Image backup via Telegram" },
    description: {
      es: "Aplicación web integrada con un bot de Telegram para gestionar y distribuir imágenes a través de una interfaz web y servicios de mensajería.",
      en: "Web app integrated with a Telegram bot to manage and distribute images through a web interface and messaging services.",
    },
    tech: ["JavaScript", "Node.js", "Telegram Bot API", "APIs REST", "HTML", "CSS", "Git"],
    href: "https://save-bot-2-0.vercel.app/",
  },
  {
    slug: "postulafacil",
    name: "PostulaFácil",
    tag: { es: "Editor web de currículums", en: "Web résumé editor" },
    description: {
      es: "Aplicación web para crear, editar y exportar currículums, con vista previa en tiempo real y almacenamiento local de la información del usuario.",
      en: "Web app to create, edit and export résumés, with a live preview and local storage of the user's information.",
    },
    tech: ["Vue.js 3", "TypeScript", "Tailwind CSS", "JSON", "Generación de PDF"],
    href: "https://postulafacil-client.vercel.app/",
  },
];

export default function Projects() {
  const { lang } = useLanguage();

  return (
    <section id="projects" className="scroll-mt-24 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          kicker="02  //  proyectos"
          title={lang === "es" ? "Proyectos destacados" : "Selected projects"}
          icon={<FolderGit2 className="size-7" />}
        />

        <article className="grid overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[#141416] text-white lg:grid-cols-[0.9fr_1.1fr]">
          <div
            className="relative flex min-h-72 flex-col justify-between overflow-hidden p-8"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 78%, rgba(255,45,60,0.28), transparent 42%), linear-gradient(rgba(255,45,60,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,60,0.16) 1px, transparent 1px)",
              backgroundSize: "auto, 28px 28px, 28px 28px",
            }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff2d3c]">01 · {lang === "es" ? "Destacado" : "Featured"}</p>
            <p className="text-8xl font-semibold tracking-[-0.06em] text-white">UL</p>
          </div>
          <div className="bg-[var(--surface)] p-8 text-[var(--ink)] md:p-12">
            <h3 className="text-4xl font-semibold tracking-tight">{PROJECTS[0].name}</h3>
            <p className="mt-2 text-sm text-[var(--lime)]">{PROJECTS[0].tag[lang]}</p>
            <p className="mt-5 max-w-xl leading-relaxed text-[var(--soft)]">{PROJECTS[0].description[lang]}</p>
            <p className="mt-6 font-mono text-xs leading-relaxed text-[var(--soft)]">{PROJECTS[0].tech.join("  ·  ")}</p>
          </div>
        </article>

        <div className="mt-5 grid gap-5 lg:grid-cols-5">
          {PROJECTS.slice(1).map((project, index) => (
            <article
              key={project.slug}
              className={`flex flex-col justify-between rounded-[1.7rem] border border-[var(--line)] bg-[var(--surface)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--lime)] ${index === 0 ? "lg:col-span-3" : "lg:col-span-2"}`}
            >
              <div>
                <p className="font-mono text-[11px] text-[var(--lime)]">{String(index + 2).padStart(2, "0")}</p>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--ink)]">{project.name}</h3>
                <p className="mt-2 text-sm text-[var(--lime)]">{project.tag[lang]}</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--soft)]">{project.description[lang]}</p>
              </div>
              <div>
                <p className="mt-5 font-mono text-xs text-[var(--soft)]">{project.tech.join("  ·  ")}</p>
                {"href" in project && project.href ? (
                  <a href={project.href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-5 w-fit">
                    {lang === "es" ? "Abrir" : "Open"}
                    <ArrowUpRight className="size-4" />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
