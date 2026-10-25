"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";
import SectionTitle from "@/components/SectionTitle";
import { Code2 } from "lucide-react";

const CATEGORIES = [
  {
    name: { es: "Frontend", en: "Frontend" },
    skills: ["Vue.js", "Angular", "React", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS"],
  },
  {
    name: { es: "Backend y APIs", en: "Backend and APIs" },
    skills: ["Node.js", "Express.js", "PHP", "Laravel", "C#", ".NET", "APIs REST", "JWT", "Swagger"],
  },
  {
    name: { es: "Desarrollo móvil", en: "Mobile" },
    skills: ["Flutter", "Dart", "GetX", "Firebase", "Kotlin"],
  },
  {
    name: { es: "Bases de datos", en: "Databases" },
    skills: ["SQL Server", "MySQL", "PostgreSQL", "MongoDB", "SQLite"],
  },
  {
    name: { es: "Cloud, IA y procesamiento documental", en: "Cloud, AI and document processing" },
    skills: ["Google Cloud Run", "Docker", "AWS Rekognition", "Google ML Kit", "Google Vision API", "Google Gemini AI", "Grok", "OCR", "Telegram Bot API"],
  },
  {
    name: { es: "Herramientas y colaboración", en: "Tools and collaboration" },
    skills: ["Git", "GitHub", "Linux", "Postman", "Jira"],
  },
];

export default function Skills() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="scroll-mt-24 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          kicker="04  //  stack"
          title={lang === "es" ? "Habilidades técnicas" : "Technical skills"}
          icon={<Code2 className="size-7" />}
        />

        <div className="grid gap-3 md:grid-cols-6">
          {CATEGORIES.map((category, index) => (
            <motion.article
              key={category.name.en}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : index * 0.04 }}
              className={`rounded-[1.6rem] border border-[var(--line)] bg-[var(--surface)] p-5 ${
                index === 0 || index === 4 ? "md:col-span-4" : index === 1 || index === 5 ? "md:col-span-2" : "md:col-span-3"
              }`}
            >
              <p className="font-mono text-[11px] text-[var(--lime)]">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-xl font-semibold text-[var(--ink)]">{category.name[lang]}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="rounded-full border border-[var(--line)] px-2.5 py-1 font-mono text-[11px] text-[var(--soft)]">
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
