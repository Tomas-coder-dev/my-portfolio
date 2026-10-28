"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import GlowSkillTag from "@/components/GlowSkillTag";
import Footer from "@/components/Footer";
import { getProject, PROJECTS } from "@/lib/projects";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function ProjectCase({ slug }: { slug: string }) {
  const { lang } = useLanguage();
  const project = getProject(slug);
  if (!project) return null;

  const labels = {
    es: { back: "Volver a proyectos", problem: "El problema", work: "Qué hice", result: "El resultado", open: "Abrir proyecto" },
    en: { back: "Back to projects", problem: "The problem", work: "What I did", result: "The result", open: "Open project" },
  }[lang];

  const others = PROJECTS.filter((item) => item.slug !== project.slug);

  return (
    <div>
      <article className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-[var(--soft)] hover:text-[var(--lime)]">
          <ArrowLeft className="size-4" />
          {labels.back}
        </Link>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--lime)]">{project.category[lang]}</p>
        <h1 className="mt-3 break-words text-[clamp(2.5rem,10vw,3.75rem)] font-semibold tracking-tight text-[var(--ink)]">{project.name}</h1>
        <p className="mt-3 text-lg text-[var(--soft)]">{project.tag[lang]}</p>

        <section className="mt-12">
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--lime)]">{labels.problem}</h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--ink)]">{project.problem[lang]}</p>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--lime)]">{labels.work}</h2>
          <ul className="mt-3 space-y-2">
            {project.work[lang].map((item) => (
              <li key={item} className="text-base leading-relaxed text-[var(--ink)]">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 rounded-2xl border border-[var(--line)] border-l-4 border-l-[var(--lime)] bg-[var(--surface)] px-5 py-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--lime)]">{labels.result}</h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--ink)]">{project.result[lang]}</p>
        </section>

        <ul className="mt-8 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <li key={item}>
              <GlowSkillTag label={item} />
            </li>
          ))}
        </ul>

        {project.href ? (
          <a href={project.href} target="_blank" rel="noopener noreferrer" className="btn-hero btn-hero-solid mt-8">
            {labels.open}
            <ArrowUpRight className="size-4" />
          </a>
        ) : null}

        <div className="mt-14 border-t border-[var(--line)] pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--soft)]">
            {lang === "es" ? "Otros casos" : "Other cases"}
          </p>
          <ul className="mt-3 flex flex-wrap gap-4">
            {others.map((item) => (
              <li key={item.slug}>
                <Link href={`/proyectos/${item.slug}`} className="text-sm font-semibold text-[var(--ink)] hover:text-[var(--lime)]">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </article>
      <Footer />
    </div>
  );
}
