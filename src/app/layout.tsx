import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "@/styles/globals.css"
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

export const metadata: Metadata = {
  title: "Fabricio Aylas | Portafolio",
  description: "Portfolio personal de Fabricio Aylas",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300`}>
        <LanguageProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-64px)]">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  )
}