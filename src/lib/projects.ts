export type Project = {
  slug: string;
  group: "ia" | "web" | "api";
  name: string;
  category: { es: string; en: string };
  tag: { es: string; en: string };
  description: { es: string; en: string };
  highlight: { es: string; en: string };
  problem: { es: string; en: string };
  work: { es: string[]; en: string[] };
  result: { es: string; en: string };
  tech: string[];
  href?: string;
  mark: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "ulenguage",
    group: "ia",
    name: "ULenguage",
    mark: "UL",
    category: { es: "IA & Mobile", en: "AI & Mobile" },
    tag: { es: "Aplicación de traducción cultural quechua", en: "Quechua cultural translation app" },
    description: {
      es: "Aplicación móvil orientada a turistas en Cusco que facilita la traducción entre quechua, español e inglés. Incorpora reconocimiento de texto desde imágenes, traducción y asistencia con inteligencia artificial para contextualizar expresiones culturales.",
      en: "Mobile app for tourists in Cusco that translates between Quechua, Spanish and English. It reads text from images and uses AI to put cultural expressions in context.",
    },
    highlight: {
      es: "OCR, Vision API y Gemini para traducción cultural en campo.",
      en: "OCR, Vision API and Gemini for cultural translation in the field.",
    },
    problem: {
      es: "Un turista en Cusco necesita pasar entre quechua, español e inglés, y muchas frases no se entienden si solo se traducen palabra por palabra. Además, el texto a veces está en un letrero o en una foto, no escrito a mano.",
      en: "A tourist in Cusco needs to move between Quechua, Spanish and English, and many phrases lose their meaning if they are only translated word for word. The text is often on a sign or in a photo, not typed.",
    },
    work: {
      es: [
        "App móvil en Flutter para llevar la traducción en el teléfono.",
        "Lectura de texto desde imágenes, con apoyo de visión y OCR.",
        "Asistencia con Gemini para poner la expresión en contexto cultural.",
        "API con Node.js y Express, datos en MongoDB y acceso con JWT.",
      ],
      en: [
        "Flutter mobile app so the translation lives on the phone.",
        "Text reading from images, with vision and OCR support.",
        "Gemini assistance to place the expression in cultural context.",
        "API with Node.js and Express, data in MongoDB and access with JWT.",
      ],
    },
    result: {
      es: "Quedó una app que traduce entre quechua, español e inglés, lee texto desde una imagen y usa IA para explicar la expresión en su contexto.",
      en: "The result is an app that translates between Quechua, Spanish and English, reads text from an image and uses AI to explain the expression in context.",
    },
    tech: ["Flutter", "Dart", "Node.js", "Express.js", "MongoDB", "JWT", "Google Vision API", "Gemini AI", "Swagger"],
  },
  {
    slug: "savebot",
    group: "api",
    name: "SaveBot",
    mark: "SB",
    category: { es: "APIs & Backend", en: "APIs & Backend" },
    tag: { es: "Respaldo de imágenes mediante Telegram", en: "Image backup via Telegram" },
    description: {
      es: "Aplicación web integrada con un bot de Telegram para gestionar y distribuir imágenes a través de una interfaz web y servicios de mensajería.",
      en: "Web app integrated with a Telegram bot to manage and distribute images through a web interface and messaging services.",
    },
    highlight: {
      es: "Bot en producción con flujo web + Telegram.",
      en: "Production bot with web + Telegram flow.",
    },
    problem: {
      es: "Hacía falta un flujo simple para guardar y repartir imágenes sin depender solo del chat: verlas, ordenarlas y enviarlas también desde una página.",
      en: "There needed to be a simple way to store and share images without living only inside the chat: see them, organize them and send them from a page as well.",
    },
    work: {
      es: [
        "Interfaz web para gestionar las imágenes.",
        "Bot de Telegram conectado a esa interfaz.",
        "APIs para el intercambio entre la web y la mensajería.",
      ],
      en: [
        "Web interface to manage the images.",
        "Telegram bot connected to that interface.",
        "APIs for the exchange between the site and the messaging service.",
      ],
    },
    result: {
      es: "El flujo está publicado: se gestionan y distribuyen imágenes desde la web y desde Telegram.",
      en: "The flow is live: images are managed and distributed from the site and from Telegram.",
    },
    tech: ["JavaScript", "Node.js", "Telegram Bot API", "APIs REST", "HTML", "CSS", "Git"],
    href: "https://save-bot-2-0.vercel.app/",
  },
  {
    slug: "postulafacil",
    group: "web",
    name: "PostulaFácil",
    mark: "PF",
    category: { es: "Web & Full Stack", en: "Web & Full Stack" },
    tag: { es: "Editor web de currículums", en: "Web résumé editor" },
    description: {
      es: "Aplicación web para crear, editar y exportar currículums, con vista previa en tiempo real y almacenamiento local de la información del usuario.",
      en: "Web app to create, edit and export résumés, with a live preview and local storage of the user's information.",
    },
    highlight: {
      es: "Preview en vivo y exportación PDF desde el navegador.",
      en: "Live preview and PDF export from the browser.",
    },
    problem: {
      es: "Armar un currículum y ver cómo queda al exportarlo suele exigir ir y volver entre un editor y un PDF. La información además tenía que quedar en el navegador de quien lo usa.",
      en: "Building a résumé and seeing the export usually means jumping between an editor and a PDF. The information also had to stay in the person's browser.",
    },
    work: {
      es: [
        "Editor web en Vue.js 3 y TypeScript.",
        "Vista previa en tiempo real del documento.",
        "Guardado local de los datos de quien lo usa.",
        "Exportación a PDF desde el navegador.",
      ],
      en: [
        "Web editor in Vue.js 3 and TypeScript.",
        "Live preview of the document.",
        "Local storage of the user's data.",
        "PDF export from the browser.",
      ],
    },
    result: {
      es: "Se puede crear, editar y exportar el currículum en la misma pantalla, con la vista previa actualizada al escribir.",
      en: "You can create, edit and export the résumé on the same screen, with the preview updating as you type.",
    },
    tech: ["Vue.js 3", "TypeScript", "Tailwind CSS", "JSON", "Generación de PDF"],
    href: "https://postulafacil-client.vercel.app/",
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
