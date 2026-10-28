import type { Metadata } from "next"
import { Geist_Mono, Outfit, Syne } from "next/font/google"
import "@/styles/globals.css"
import CodeRain from "@/components/CodeRain"
import Navbar from "@/components/navbar/Navbar"
import SectionRail from "@/components/SectionRail"
import ScrollProgress from "@/components/ScrollProgress"
import CursorDot from "@/components/CursorDot"
import { LanguageProvider } from "@/context/LanguageContext"
import { CvProvider } from "@/context/CvContext"
import CvModal from "@/components/cv/CvModal"

const sans = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

const themeInit = `(function(){try{var t=localStorage.getItem("theme");var dark=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",dark)}catch(e){}})();`

export const metadata: Metadata = {
  title: "Fabricio Aylas Moreno | Desarrollador Full Stack",
  description:
    "Portafolio de Fabricio Aylas Moreno, desarrollador Full Stack en Lima. Apps móviles en producción, APIs, cloud e integraciones con IA.",
  openGraph: {
    title: "Fabricio Aylas Moreno | Desarrollador Full Stack",
    description:
      "Apps móviles en producción, APIs, cloud e integraciones con IA. Estudiante de Ingeniería de Software en USIL.",
    locale: "es_PE",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${display.variable} ${geistMono.variable} craft min-h-screen antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <ScrollProgress />
        <CursorDot />
        <CodeRain />
        <CvProvider>
          <LanguageProvider>
            <Navbar />
            <SectionRail />
            <main className="relative z-10 overflow-x-clip">{children}</main>
            <CvModal />
          </LanguageProvider>
        </CvProvider>
      </body>
    </html>
  )
}
