"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Briefcase } from "lucide-react";

export default function Experience() {
  const { lang } = useLanguage();

  const data = {
    title: { es: "Experiencia Profesional", en: "Professional Experience" },
    jobs: [
      {
        company: "Belity",
        role: { es: "Desarrollador Full Stack Mobile", en: "Full Stack Mobile Developer" },
        date: { es: "Oct 2026 - Actualidad", en: "Oct 2026 - Present" },
        description: {
          es: [
            "Desarrollo y mantenimiento de la aplicación móvil Belity, plataforma de servicios de belleza a domicilio.",
            "Desarrollo de funcionalidades móviles escalables utilizando Flutter para Android e iOS.",
            "Implementación de nuevas funcionalidades y mantenimiento de integraciones bajo arquitectura de microservicios usando Laravel y Node.js.",
            "Gestión de versiones y publicación de actualizaciones en Google Play y App Store."
          ],
          en: [
            "Development and maintenance of the Belity mobile application, an at-home beauty services platform.",
            "Developed scalable mobile solutions using Flutter for Android and iOS.",
            "Implementation of new features and maintenance of integrations under a microservices architecture using Laravel and Node.js.",
            "Managed versioning and publishing updates on Google Play and the App Store."
          ]
        }
      },
      {
        company: "Firefly One",
        role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
        date: { es: "Jul 2026 - Sept 2026", en: "Jul 2026 - Sept 2026" },
        description: {
          es: [
            "Desarrollo y modernización de sistemas empresariales críticos para el sector asegurador.",
            "Construcción de soluciones Full Stack utilizando Vue.js y Laravel, optimizando el rendimiento de la aplicación y APIs REST.",
            "Implementación de flujos de trabajo colaborativos y revisión exhaustiva de código (Pull Requests) con Git y GitHub."
          ],
          en: [
            "Development and modernization of critical enterprise systems for the insurance sector.",
            "Built Full Stack solutions using Vue.js and Laravel, optimizing application performance and REST APIs.",
            "Implemented collaborative workflows and comprehensive code reviews (Pull Requests) with Git and GitHub."
          ]
        }
      },
      {
        company: "Syncra Connect — Proyecto Unilene",
        role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
        date: { es: "Feb 2026 - Jun 2026", en: "Feb 2026 - Jun 2026" },
        description: {
          es: [
            "Desarrollo y mantenimiento de funcionalidades para CRM empresarial.",
            "Implementación y consumo de APIs REST utilizando .NET y SQL Server.",
            "Desarrollo de interfaces y componentes frontend utilizando Angular.",
            "Participación en desarrollo de funcionalidades móviles utilizando Flutter."
          ],
          en: [
            "Development and maintenance of features for an enterprise CRM.",
            "Implementation and consumption of REST APIs using .NET and SQL Server.",
            "Developed frontend interfaces and components using Angular.",
            "Participated in the development of mobile features using Flutter."
          ]
        }
      }
    ]
  };

  return (
    <section id="experience" className="py-20 px-6 bg-slate-100 dark:bg-slate-900/50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3">
          <Briefcase className="text-blue-500 w-8 h-8" />
          {data.title[lang]}
        </h2>
        
        <div className="space-y-8">
          {data.jobs.map((job, i) => (
            <div key={i} className="relative pl-8 md:pl-0">
              <div className="md:grid md:grid-cols-4 md:gap-8 items-start relative">
                <div className="hidden md:block absolute top-0 bottom-0 left-[25%] border-l-2 border-slate-200 dark:border-slate-800"></div>
                <div className="hidden md:block absolute top-2 left-[calc(25%-5px)] w-[12px] h-[12px] rounded-full bg-blue-500 border-4 border-slate-100 dark:border-slate-900 z-10"></div>
                
                <div className="md:col-span-1 mb-4 md:mb-0 md:text-right md:pr-12 pt-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">{job.company}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mt-1">{job.role[lang]}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-mono mt-2">{job.date[lang]}</p>
                </div>
                
                <div className="md:col-span-3 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 hover:shadow-md transition-shadow">
                  <ul className="space-y-3">
                    {job.description[lang].map((desc, j) => (
                      <li key={j} className="text-slate-700 dark:text-slate-300 text-sm md:text-base flex items-start gap-3">
                        <span className="text-blue-500 font-bold mt-0.5">▹</span>
                        <span className="leading-relaxed">{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
