"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Code2, Server, Database, Smartphone, Wrench, Cloud } from "lucide-react";

export default function Skills() {
  const { lang } = useLanguage();

  const data = {
    title: { es: "Habilidades Técnicas", en: "Technical Skills" },
    categories: [
      {
        id: "frontend",
        name: { es: "Frontend", en: "Frontend" },
        icon: <Code2 className="w-6 h-6" />,
        skills: ["HTML", "CSS", "TailwindCSS", "JavaScript", "TypeScript", "React", "Angular", "Vue.js", "Next.js"]
      },
      {
        id: "backend",
        name: { es: "Backend", en: "Backend" },
        icon: <Server className="w-6 h-6" />,
        skills: ["Node.js", "Express.js", "PHP", "C#", ".NET", "Laravel", "REST APIs", "JWT", "Swagger"]
      },
      {
        id: "mobile",
        name: { es: "Móvil", en: "Mobile" },
        icon: <Smartphone className="w-6 h-6" />,
        skills: ["Flutter", "Dart", "Kotlin"]
      },
      {
        id: "db",
        name: { es: "Bases de Datos", en: "Databases" },
        icon: <Database className="w-6 h-6" />,
        skills: ["MySQL", "PostgreSQL", "SQL Server", "MongoDB", "SQLite"]
      },
      {
        id: "tools",
        name: { es: "Herramientas", en: "Tools" },
        icon: <Wrench className="w-6 h-6" />,
        skills: ["Linux", "Git", "GitHub", "Postman", "Cursor", "Jira"]
      },
      {
        id: "cloudAi",
        name: { es: "Cloud & AI", en: "Cloud & AI" },
        icon: <Cloud className="w-6 h-6" />,
        skills: ["Google Gemini AI", "Google Vision API", "OCR", "Telegram Bot API"]
      }
    ]
  };

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          {data.title[lang]}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.categories.map((cat) => (
            <div key={cat.id} className="p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-colors group">
              <div className="flex items-center gap-3 mb-6 text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-xl">{cat.name[lang]}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 text-sm font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
