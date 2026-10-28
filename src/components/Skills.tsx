"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";
import SectionTitle from "@/components/SectionTitle";
import TiltCard from "@/components/TiltCard";
import GlowSkillTag from "@/components/GlowSkillTag";
import { Cloud, Code2, Database, LayoutTemplate, Search, Server, Smartphone, Wrench } from "lucide-react";

const CATEGORIES = [
  {
    name: { es: "Frontend", en: "Frontend" },
    icon: LayoutTemplate,
    skills: ["Vue.js", "Angular", "React", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS"],
  },
  {
    name: { es: "Backend y APIs", en: "Backend and APIs" },
    icon: Server,
    skills: ["Node.js", "Express.js", "PHP", "Laravel", "C#", ".NET", "APIs REST", "JWT", "Swagger"],
  },
  {
    name: { es: "Desarrollo móvil", en: "Mobile" },
    icon: Smartphone,
    skills: ["Flutter", "Dart", "GetX", "Firebase", "Kotlin"],
  },
  {
    name: { es: "Bases de datos", en: "Databases" },
    icon: Database,
    skills: ["SQL Server", "MySQL", "PostgreSQL", "MongoDB", "SQLite"],
  },
  {
    name: { es: "Cloud, IA y procesamiento documental", en: "Cloud, AI and document processing" },
    icon: Cloud,
    skills: ["Google Cloud Run", "Docker", "AWS Rekognition", "Google ML Kit", "Google Vision API", "Google Gemini AI", "Grok", "OCR", "Telegram Bot API"],
  },
  {
    name: { es: "Herramientas y colaboración", en: "Tools and collaboration" },
    icon: Wrench,
    skills: ["Git", "GitHub", "Linux", "Postman", "Jira"],
  },
];

export default function Skills() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES;
    return CATEGORIES.map((cat) => ({
      ...cat,
      skills: cat.skills.filter((skill) => skill.toLowerCase().includes(q)),
    })).filter((cat) => cat.skills.length > 0 || cat.name[lang].toLowerCase().includes(q));
  }, [query, lang]);

  return (
    <section id="skills" className="scroll-mt-24 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          kicker="04  //  stack"
          title={lang === "es" ? "Habilidades técnicas" : "Technical skills"}
          icon={<Code2 className="size-7" />}
        />

        <label className="relative mt-2 block max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--soft)]" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={lang === "es" ? "Buscar tecnología (React, Flutter, Laravel…)" : "Search technology (React, Flutter, Laravel…)"}
            className="w-full rounded-full border border-[var(--line)] bg-[var(--surface)] py-3 pl-11 pr-4 text-sm text-[var(--ink)] outline-none focus:border-[var(--lime)]"
          />
        </label>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((category, index) => {
            const CatIcon = category.icon;
            return (
              <motion.div
                key={category.name.en}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : index * 0.04 }}
                className={index === 0 || index === 4 ? "xl:col-span-2" : ""}
              >
                <TiltCard className="h-full">
                  <article className="glow-card h-full border border-[var(--line)] p-5 shadow-[0_18px_40px_-28px_rgba(255,45,60,0.35)]">
                    <div className="relative z-[1]">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-9 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--chip)] text-[var(--lime)]">
                        <CatIcon className="size-4" />
                      </span>
                      <div>
                        <p className="font-mono text-[11px] text-[var(--lime)]">{String(index + 1).padStart(2, "0")}</p>
                        <h3 className="text-lg font-semibold text-[var(--ink)]">{category.name[lang]}</h3>
                      </div>
                    </div>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <li key={skill}>
                          <GlowSkillTag label={skill} float={skillIndex < 4} delay={skillIndex * 0.2} />
                        </li>
                      ))}
                    </ul>
                    </div>
                  </article>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
