import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "@/styles/globals.css"
import CodeRain from "@/components/CodeRain"
import Navbar from "@/components/navbar/Navbar"
import { LanguageProvider } from "@/context/LanguageContext"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

const themeInit = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"){document.documentElement.classList.add("dark")}}catch(e){}})();`

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
        className={`${geistSans.variable} ${geistMono.variable} craft min-h-screen antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <CodeRain />
        <LanguageProvider>
          <Navbar />
          <main className="relative z-10">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  )
}
