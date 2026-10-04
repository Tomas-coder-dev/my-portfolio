"use client";

import { useLanguage } from "@/context/LanguageContext";
import { FolderGit2, ExternalLink } from "lucide-react";

export default function Projects() {
  const { lang } = useLanguage();

  const data = {
    title: { es: "Proyectos Destacados", en: "Featured Projects" },
    projects: [
      {
        name: "ULenguage — Traductor cultural inteligente",
        description: {
          es: "Aplicación móvil orientada a turistas en Cusco para traducción Quechua-Español-Inglés. Permite reconocimiento de texto mediante imágenes, traducciones automáticas y explicaciones culturales usando inteligencia artificial.",
          en: "Mobile application aimed at tourists in Cusco for Quechua-Spanish-English translation. Allows text recognition via images, automatic translations, and cultural explanations using artificial intelligence."
        },
        tech: ["Flutter", "Dart", "Node.js", "Express", "MongoDB", "Google Vision API", "Gemini AI"]
      },
      {
        name: "SaveBot — Respaldo multimedia vía Telegram",
        description: {
          es: "Aplicación web integrada con un bot de Telegram para automatizar el respaldo y envío de imágenes. Permite subir archivos desde una plataforma web y gestionar su distribución.",
          en: "Web application integrated with a Telegram bot to automate the backup and sending of images. Allows uploading files from a web platform and managing their distribution via Telegram Bot API."
        },
        tech: ["JavaScript", "Node.js", "Telegram Bot API", "REST APIs", "HTML", "CSS"]
      },
      {
        name: "PostulaFácil — Plataforma Inteligente para CV",
        description: {
          es: "Aplicación web para la creación, edición y gestión de currículums con un enfoque en privacidad, optimización con IA y personalización.",
          en: "Web application for creating, editing, and managing resumes with a focus on privacy, AI optimization, and customization."
        },
        tech: ["Vue.js 3", "TypeScript", "Composition API", "TailwindCSS", "PDF Export"]
      }
    ]
  };

  return (
    <section id="projects" className="py-20 px-6 bg-slate-100 dark:bg-slate-900/50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center justify-center gap-3">
          <FolderGit2 className="text-blue-500 w-8 h-8" />
          {data.title[lang]}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projects.map((project, i) => (
            <div key={i} className="flex flex-col h-full bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white leading-tight">
                    {project.name.split(" — ")[0]}
                  </h3>
                  <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-blue-500">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">
                  {project.name.split(" — ")[1]}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 flex-1">
                  {project.description[lang]}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech, j) => (
                    <span key={j} className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
