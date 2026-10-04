"use client";

import { useLanguage } from "@/context/LanguageContext";
import { User, GraduationCap, Award } from "lucide-react";

export default function About() {
  const { lang } = useLanguage();

  const data = {
    title: { es: "Sobre mí", en: "About Me" },
    summary: {
      es: "Egresado de Diseño y Desarrollo de Software (TECSUP) y estudiante de Ingeniería de Software (USIL). Desarrollador Full Stack con experiencia en desarrollo web y móvil, construcción de APIs REST, integración de bases de datos y servicios externos. Experiencia en desarrollo y mantenimiento de aplicaciones Android e iOS en producción, implementación de funcionalidades bajo arquitectura de microservicios, mejoras UI/UX y despliegue en tiendas de aplicaciones. Enfocado en construir soluciones escalables y mantenibles, optimizar procesos y mejorar la experiencia de usuario mediante buenas prácticas de desarrollo.",
      en: "Graduate in Software Design and Development (TECSUP) and Software Engineering student (USIL). Full Stack Developer with experience in web and mobile development, building REST APIs, database integration, and external services. Experienced in developing and maintaining production Android and iOS apps, implementing features using microservices architecture, UI/UX improvements, and app store deployment. Focused on building scalable and maintainable solutions, optimizing processes, and improving user experience through development best practices."
    },
    education: {
      title: { es: "Educación", en: "Education" },
      items: [
        {
          school: "Universidad San Ignacio de Loyola (USIL)",
          degree: { es: "Ingeniería de Software", en: "Software Engineering" },
          date: "2026 – Present"
        },
        {
          school: "TECSUP",
          degree: { es: "Diseño y Desarrollo de Software", en: "Software Design and Development" },
          date: "2023 – 2025"
        }
      ]
    },
    certifications: {
      title: { es: "Certificaciones", en: "Certifications" },
      items: [
        "Scrum Fundamentals Certified – SCRUMstudy",
        "Cybersecurity Fundamentals – Cisco",
        "Hackathon Becas BCP 2025 – Participant",
        "Hackathon TECSUP 2024 – Selected team"
      ]
    }
  };

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3">
          <User className="text-blue-500 w-8 h-8" />
          {data.title[lang]}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                {data.summary[lang]}
              </p>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="text-blue-500" />
                {data.education.title[lang]}
              </h3>
              <div className="space-y-4">
                {data.education.items.map((edu, i) => (
                  <div key={i} className="pl-4 border-l-2 border-blue-500">
                    <h4 className="font-semibold text-slate-900 dark:text-white">{edu.school}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{edu.degree[lang]}</p>
                    <span className="text-xs text-blue-500 font-mono mt-1 block">{edu.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="text-blue-500" />
                {data.certifications.title[lang]}
              </h3>
              <ul className="space-y-2">
                {data.certifications.items.map((cert, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="text-blue-500 mt-1">•</span>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
