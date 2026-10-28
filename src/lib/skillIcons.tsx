import type { ComponentType, SVGProps } from "react";
import {
  SiAngular,
  SiBootstrap,
  SiCss,
  SiDart,
  SiDocker,
  SiDotnet,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiGithub,
  SiGit,
  SiGooglegemini,
  SiGooglecloud,
  SiHtml5,
  SiJavascript,
  SiJira,
  SiKotlin,
  SiLaravel,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiSharp,
  SiSqlite,
  SiSwagger,
  SiTailwindcss,
  SiTelegram,
  SiTypescript,
  SiVuedotjs,
  SiWhatsapp,
} from "@icons-pack/react-simple-icons";

type Icon = ComponentType<{ size?: number; color?: string; className?: string } & SVGProps<SVGSVGElement>>;

const MAP: Record<string, Icon> = {
  "Vue.js": SiVuedotjs,
  "Vue.js 3": SiVuedotjs,
  Angular: SiAngular,
  React: SiReact,
  "Next.js": SiNextdotjs,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  HTML5: SiHtml5,
  HTML: SiHtml5,
  CSS3: SiCss,
  CSS: SiCss,
  Bootstrap: SiBootstrap,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  PHP: SiPhp,
  Laravel: SiLaravel,
  "C#": SiSharp,
  ".NET": SiDotnet,
  Flutter: SiFlutter,
  Dart: SiDart,
  Firebase: SiFirebase,
  Kotlin: SiKotlin,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  SQLite: SiSqlite,
  Docker: SiDocker,
  "Google Cloud Run": SiGooglecloud,
  "Google Gemini AI": SiGooglegemini,
  "Gemini AI": SiGooglegemini,
  Git: SiGit,
  GitHub: SiGithub,
  Linux: SiLinux,
  Postman: SiPostman,
  Jira: SiJira,
  Swagger: SiSwagger,
  "Telegram Bot API": SiTelegram,
  WhatsApp: SiWhatsapp,
};

/** Brand hex (Simple Icons defaults) for glow borders */
const BRAND_HEX: Record<string, string> = {
  "Vue.js": "#41B883",
  "Vue.js 3": "#41B883",
  Angular: "#DD0031",
  React: "#61DAFB",
  "Next.js": "#ffffff",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  HTML5: "#E34F26",
  CSS3: "#1572B6",
  CSS: "#1572B6",
  Bootstrap: "#7952B3",
  "Tailwind CSS": "#06B6D4",
  "Node.js": "#339933",
  "Express.js": "#000000",
  PHP: "#777BB4",
  Laravel: "#FF2D20",
  "C#": "#239120",
  ".NET": "#512BD4",
  Flutter: "#02569B",
  Dart: "#0175C2",
  Firebase: "#DD2C00",
  Kotlin: "#7F52FF",
  MongoDB: "#47A248",
  MySQL: "#4479A1",
  PostgreSQL: "#4169E1",
  SQLite: "#003B57",
  Docker: "#2496ED",
  "Google Cloud Run": "#4285F4",
  "Google Gemini AI": "#8E75B2",
  "Gemini AI": "#8E75B2",
  Git: "#F05032",
  GitHub: "#181717",
  Linux: "#FCC624",
  Postman: "#FF6C37",
  Jira: "#0052CC",
  Swagger: "#85EA2D",
  "Telegram Bot API": "#26A5E4",
  WhatsApp: "#25D366",
};

export function normalizeSkillName(raw: string): string {
  const aliases: Record<string, string> = {
    "APIs REST": "Swagger",
    "Google Vision API": "Google Cloud Run",
    "Google Translate API": "Google Gemini AI",
    "Google ML Kit": "Google Gemini AI",
    OCR: "Google Gemini AI",
    Grok: "Google Gemini AI",
    JWT: "Swagger",
    JSON: "JavaScript",
    "Generación de PDF": "JavaScript",
    GetX: "Flutter",
    REST: "Swagger",
    "Cloud Run": "Google Cloud Run",
    "ML Kit": "Google Gemini AI",
    CRUD: "JavaScript",
    "UX/UI": "HTML5",
    Responsive: "CSS3",
    Web: "HTML5",
  };
  return aliases[raw] ?? raw;
}

const INK_BRANDS = new Set(["Next.js", "Express.js", "GitHub"]);

export function getSkillBrandColor(name: string): string {
  const key = normalizeSkillName(name);
  if (INK_BRANDS.has(key) || INK_BRANDS.has(name)) return "var(--ink)";
  return BRAND_HEX[key] ?? BRAND_HEX[name] ?? "#ff2d3c";
}

export function SkillIcon({ name, size = 14, colored = true }: { name: string; size?: number; colored?: boolean }) {
  const key = normalizeSkillName(name);
  const Icon = MAP[key] ?? MAP[name];
  if (!Icon) {
    return (
      <span
        className="inline-flex size-3.5 shrink-0 items-center justify-center rounded-full bg-[var(--line)] text-[8px] font-bold text-[var(--soft)]"
        aria-hidden
      >
        {name.charAt(0)}
      </span>
    );
  }
  const color = colored ? getSkillBrandColor(name) : undefined;
  return <Icon size={size} color={color} className="shrink-0" />;
}
