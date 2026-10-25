"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function ThemeSwitch() {
  const { lang } = useLanguage();
  const [checked, setChecked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setChecked(document.documentElement.classList.contains("dark"));
    setReady(true);
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setChecked(next);
  };

  const label = checked
    ? lang === "es"
      ? "Activar modo claro"
      : "Switch to light mode"
    : lang === "es"
      ? "Activar modo oscuro"
      : "Switch to dark mode";

  if (!ready) {
    return <div className="h-[34px] w-[60px]" aria-hidden />;
  }

  return (
    <label className="pf-theme">
      <input type="checkbox" checked={checked} onChange={toggle} aria-label={label} />
      <div className="slider round">
        <div className="sun-moon">
          <svg className="moon-dot moon-dot-1" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" /></svg>
          <svg className="moon-dot moon-dot-2" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" /></svg>
          <svg className="moon-dot moon-dot-3" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" /></svg>
          <svg className="light-ray light-ray-1" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" /></svg>
          <svg className="light-ray light-ray-2" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" /></svg>
          <svg className="light-ray light-ray-3" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" /></svg>
          <svg className="cloud-dark cloud-1" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" /></svg>
          <svg className="cloud-dark cloud-2" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" /></svg>
          <svg className="cloud-dark cloud-3" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" /></svg>
          <svg className="cloud-light cloud-4" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" /></svg>
          <svg className="cloud-light cloud-5" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" /></svg>
          <svg className="cloud-light cloud-6" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" /></svg>
        </div>
        <div className="stars">
          <svg className="star star-1" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" /></svg>
          <svg className="star star-2" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" /></svg>
          <svg className="star star-3" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" /></svg>
          <svg className="star star-4" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" /></svg>
        </div>
      </div>
    </label>
  );
}
