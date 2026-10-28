"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import SectionTitle from "@/components/SectionTitle";
import TiltCard from "@/components/TiltCard";
import GlowSkillTag from "@/components/GlowSkillTag";
import { PROJECTS } from "@/lib/projects";
import { ArrowUpRight, FolderGit2 } from "lucide-react";

function TechTags({ tech }: { tech: string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {tech.map((t, i) => (
        <li key={t}>
          <GlowSkillTag label={t} float={i < 3} delay={i * 0.25} />
        </li>
      ))}
    </ul>
  );
}

const FILTERS = [
  { id: "all", es: "Todos", en: "All" },
  { id: "ia", es: "IA", en: "AI" },
  { id: "web", es: "Web", en: "Web" },
  { id: "api", es: "APIs", en: "APIs" },
] as const;

export default function Projects() {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const visible = filter === "all" ? PROJECTS : PROJECTS.filter((project) => project.group === filter);
  const featured = visible[0];
  const rest = visible.slice(1);

  return (
    <section id="projects" className="scroll-mt-24 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          kicker="02  //  destacados"
          title={lang === "es" ? "Proyectos destacados" : "Featured projects"}
          icon={<FolderGit2 className="size-7" />}
        />
        <p className="-mt-6 mb-6 max-w-xl text-sm leading-relaxed text-[var(--soft)] md:-mt-8">
          {lang === "es"
            ? "Hay más trabajo detrás. Estos tres son los que mejor muestran lo que hago."
            : "There is more work behind these. These three show the work best."}
        </p>

        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label={lang === "es" ? "Filtrar proyectos" : "Filter projects"}>
          {FILTERS.map((item) => {
            const selected = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(item.id)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${selected ? "border-[var(--lime)] bg-[var(--lime)] text-white" : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--lime)]"}`}
              >
                {item[lang]}
              </button>
            );
          })}
        </div>

        {featured ? (
        <TiltCard>
          <article className="grid overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[#141416] text-white shadow-[0_22px_50px_-32px_rgba(255,45,60,0.5)] lg:grid-cols-[0.9fr_1.1fr]">
            <div
              className="relative flex min-h-72 flex-col justify-between overflow-hidden border-b border-[var(--line)] p-8 lg:border-b-0 lg:border-r"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 18% 78%, rgba(255,45,60,0.28), transparent 42%), linear-gradient(rgba(255,45,60,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,60,0.16) 1px, transparent 1px)",
                backgroundSize: "auto, 28px 28px, 28px 28px",
              }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff2d3c]">
                {featured.category[lang]}
              </p>
              <p className="text-6xl font-semibold tracking-[-0.06em] text-white sm:text-8xl">{featured.mark}</p>
            </div>
            <div className="bg-[var(--surface)] p-8 text-[var(--ink)] md:p-12">
              <h3 className="text-4xl font-semibold tracking-tight">{featured.name}</h3>
              <p className="mt-2 text-sm text-[var(--lime)]">{featured.tag[lang]}</p>
              <p className="mt-5 max-w-xl leading-relaxed text-[var(--soft)]">{featured.description[lang]}</p>
              <div className="mt-5 rounded-xl border border-[var(--line)] border-l-4 border-l-[var(--lime)] bg-[var(--chip)] px-4 py-3 text-sm text-[var(--ink)]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--lime)]">{lang === "es" ? "Destacado" : "Highlight"}</span>
                <p className="mt-1">{featured.highlight[lang]}</p>
              </div>
              <TechTags tech={featured.tech} />
              <Link href={`/proyectos/${featured.slug}`} className="btn-hero btn-hero-outline mt-6 w-fit">
                {lang === "es" ? "Ver caso" : "View case"}
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </article>
        </TiltCard>
        ) : null}

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {rest.map((project) => (
            <TiltCard key={project.slug}>
              <article className="flex h-full flex-col justify-between rounded-[1.7rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_18px_40px_-28px_rgba(255,45,60,0.35)]">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="rounded-full border border-[var(--line)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--lime)]">
                      {project.category[lang]}
                    </p>
                    <Link
                      href={`/proyectos/${project.slug}`}
                      className="inline-flex size-9 items-center justify-center rounded-lg border border-[var(--line)] text-[var(--ink)] transition hover:border-[var(--lime)]"
                      aria-label={lang === "es" ? "Ver caso" : "View case"}
                    >
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--ink)]">{project.name}</h3>
                  <p className="mt-2 text-sm text-[var(--lime)]">{project.tag[lang]}</p>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--soft)]">{project.description[lang]}</p>
                  <div className="mt-4 rounded-xl border border-[var(--line)] border-l-4 border-l-[var(--lime)] bg-[var(--chip)] px-4 py-3 text-sm text-[var(--ink)]">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--lime)]">{lang === "es" ? "Destacado" : "Highlight"}</span>
                    <p className="mt-1">{project.highlight[lang]}</p>
                  </div>
                </div>
                <div>
                  <TechTags tech={project.tech} />
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link href={`/proyectos/${project.slug}`} className="btn-hero btn-hero-outline">
                      {lang === "es" ? "Ver caso" : "View case"}
                    </Link>
                    {project.href ? (
                      <a href={project.href} target="_blank" rel="noopener noreferrer" className="btn-hero btn-hero-outline">
                        {lang === "es" ? "Abrir" : "Open"}
                        <ArrowUpRight className="size-4" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
