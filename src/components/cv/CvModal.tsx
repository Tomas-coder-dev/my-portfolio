"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Download, Printer, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCvModal } from "@/context/CvContext";
import { getCv } from "@/lib/cv";
import ResumeDocument from "@/components/cv/ResumeDocument";

export default function CvModal() {
  const { open, setOpen } = useCvModal();
  const { lang } = useLanguage();
  const cv = getCv(lang);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  const downloadPdf = async () => {
    const page = document.getElementById("resume-preview-content");
    if (!page) return;
    setBusy(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf()
        .set({
          margin: 0,
          filename: `${cv.fileName.replace(/\s+/g, "_")}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(page)
        .save();
    } finally {
      setBusy(false);
    }
  };

  const printCv = () => {
    document.body.classList.add("cv-print-mode");
    window.print();
    window.setTimeout(() => document.body.classList.remove("cv-print-mode"), 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#0a0a0b]/95 p-3 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={lang === "es" ? "Vista previa del CV" : "CV preview"}
        >
          <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-5 py-4">
            <p className="text-sm font-medium text-[var(--ink)] md:text-base">
              {lang === "es" ? "Currículum Vitae" : "Curriculum Vitae"} — {cv.name}
            </p>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <button type="button" onClick={downloadPdf} disabled={busy} className="btn btn-primary glitch-soft px-3 py-2 text-xs md:text-sm">
                <Download className="size-4" />
                {lang === "es" ? "Descargar CV" : "Download CV"}
              </button>
              <button type="button" onClick={printCv} className="btn btn-secondary glitch-soft px-3 py-2 text-xs md:text-sm">
                <Printer className="size-4" />
                {lang === "es" ? "Imprimir / PDF" : "Print / PDF"}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)]"
                aria-label={lang === "es" ? "Cerrar" : "Close"}
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          <div className="mx-auto mt-4 w-full max-w-5xl flex-1 overflow-auto rounded-2xl border border-[var(--line)] bg-[#1a1a1f] p-3 md:p-6">
            <ResumeDocument cv={cv} lang={lang} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
