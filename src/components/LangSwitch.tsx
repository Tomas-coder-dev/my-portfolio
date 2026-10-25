"use client";

import type { Lang } from "@/context/LanguageContext";

type Props = {
  lang: Lang;
  onToggle: () => void;
};

export default function LangSwitch({ lang, onToggle }: Props) {
  const label =
    lang === "es"
      ? "Idioma español. Cambiar a inglés"
      : "English language. Switch to Spanish";

  return (
    <label className="pf-lang">
      <input
        className="cb"
        type="checkbox"
        checked={lang === "en"}
        onChange={onToggle}
        aria-label={label}
      />
      <span className="toggle" aria-hidden>
        <span className="left">ES</span>
        <span className="right">EN</span>
      </span>
    </label>
  );
}
