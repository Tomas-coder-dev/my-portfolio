import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const panel =
  "surface rounded-2xl border border-zinc-200 bg-white shadow-[0_18px_50px_-32px_rgba(0,0,0,0.45)] dark:border-white/10 dark:bg-[#141414] dark:shadow-[0_18px_50px_-32px_rgba(0,0,0,0.9)]"

export const LINKEDIN = "https://www.linkedin.com/in/fabricio-aylas/"
export const GITHUB = "https://github.com/Tomas-coder-dev"
export const EMAIL = "aylasmorenof@gmail.com"
export const PHONE = "+51 912 404 450"
export const PHONE_E164 = "51912404450"
export const WHATSAPP = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent("Hola Fabricio, vi tu portafolio y me gustaría contactarte.")}`
