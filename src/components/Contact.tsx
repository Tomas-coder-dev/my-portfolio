"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

export default function Contact() {
  const { lang } = useLanguage();

  const data = {
    title: { es: "Contacto", en: "Contact Me" },
    subtitle: {
      es: "¿Interesado en trabajar juntos? Contáctame a través de cualquiera de estos canales.",
      en: "Interested in working together? Reach out to me via any of these channels."
    },
    info: {
      email: "aylasmorenof@gmail.com",
      phone: "+51 912 404 450",
      location: "Lima, Peru",
      linkedin: "https://www.linkedin.com/in/fabricio-aylas/",
      github: "https://github.com/aylasfabricio" // Assuming standard github link or placeholder
    }
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.title[lang]}</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-12 text-lg">
          {data.subtitle[lang]}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Email</h3>
            <a href={`mailto:${data.info.email}`} className="text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">
              {data.info.email}
            </a>
          </div>

          <div className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{lang === "es" ? "Teléfono" : "Phone"}</h3>
            <a href={`tel:${data.info.phone.replace(/ /g, "")}`} className="text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">
              {data.info.phone}
            </a>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <a href={data.info.linkedin} target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-300">
            <Linkedin className="w-6 h-6" />
          </a>
          <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
             <MapPin className="w-6 h-6" />
             <span className="ml-2 font-medium">{data.info.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
