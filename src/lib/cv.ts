import { GITHUB } from "@/lib/utils";

export type CvJob = {
  company: string;
  role: string;
  date: string;
  location: string;
  description: string[];
};

export type CvData = {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  headline: string;
  summary: string;
  experience: CvJob[];
  projects: { name: string; description: string; tech: string }[];
  education: { school: string; degree: string; date: string; location: string }[];
  certifications: string[];
  skills: Record<string, string>;
  fileName: string;
};

export const cvSettings = {
  paperSize: "A4" as const,
  lineSpacing: 1.3,
  fontFamily: "Times New Roman, serif",
  fontSize: 11,
  paragraphSpacing: 12,
  marginTop: 40,
  marginBottom: 40,
  marginLeft: 50,
  marginRight: 50,
  themeColor: "#111111",
  pageBackground: "#ffffff",
};

const sharedExperienceEs: CvJob[] = [
  {
    company: "Belity — Plataforma de belleza a domicilio",
    role: "Desarrollador Full Stack Mobile",
    date: "Octubre 2026 — Actualidad",
    location: "Lima, Perú",
    description: [
      "Implementación de procesos de verificación de identidad mediante AWS Rekognition, incluyendo comparación facial y prueba de vida (Face Liveness).",
      "Integración de servicios de inteligencia artificial con Grok para la clasificación y evaluación de calidad de imágenes durante el registro de profesionales.",
      "Desarrollo de funcionalidades de OCR y validación documental para DNI, cédulas, pasaportes y documentos PDF mediante Google ML Kit.",
      "Desarrollo e integración de microservicios con Node.js, TypeScript y Express, desplegados en Google Cloud Run mediante Docker y conectados con Laravel.",
      "Mantenimiento y evolución de la aplicación móvil en Flutter, utilizando GetX y Firebase, y gestión de publicaciones en Google Play Console y App Store Connect.",
    ],
  },
  {
    company: "Firefly One",
    role: "Desarrollador Full Stack",
    date: "Julio 2026 — Septiembre 2026",
    location: "Lima, Perú",
    description: [
      "Desarrollo y modernización de sistemas empresariales para el sector asegurador mediante Vue.js y Laravel.",
      "Implementación y consumo de APIs REST, con énfasis en la integración entre frontend y backend, la seguridad y el rendimiento.",
      "Gestión de código mediante Git y GitHub, participando en Pull Requests y revisiones de código para mejorar la mantenibilidad.",
      "Seguimiento de tareas y coordinación con equipos multidisciplinarios mediante Jira y metodologías ágiles.",
    ],
  },
  {
    company: "Syncra Connect — CRM empresarial (Proyecto Unilene)",
    role: "Desarrollador Full Stack",
    date: "Febrero 2026 — Junio 2026",
    location: "Lima, Perú",
    description: [
      "Desarrollo y mantenimiento de funcionalidades para un CRM empresarial.",
      "Implementación y consumo de APIs REST con .NET y desarrollo de interfaces con Angular.",
      "Participación en el desarrollo de funcionalidades móviles utilizando Flutter.",
      "Creación y optimización de consultas y procedimientos almacenados en SQL Server.",
      "Corrección de incidencias, mantenimiento de funcionalidades existentes y control de versiones con Git.",
    ],
  },
  {
    company: "TECSUP",
    role: "Desarrollador Full Stack — Proyecto académico",
    date: "Mayo 2025 — Septiembre 2025",
    location: "Lima, Perú",
    description: [
      "Desarrollo de un sistema web para la gestión de inventario químico de un laboratorio académico.",
      "Implementación de operaciones CRUD, control de existencias y generación de reportes automatizados.",
      "Desarrollo del backend con Laravel y gestión de datos mediante SQLite.",
      "Documentación técnica y desarrollo iterativo bajo una metodología ágil.",
    ],
  },
  {
    company: "Cimark Comunicación Corporativa S.A.C.",
    role: "Desarrollador Full Stack",
    date: "Febrero 2024 — Enero 2025",
    location: "Lima, Perú",
    description: [
      "Desarrollo y mejora de interfaces web con enfoque en experiencia de usuario (UX/UI) y diseño adaptable.",
      "Implementación de mejoras visuales y funcionales a partir del análisis de plataformas del sector.",
      "Optimización de la navegación, estructura y usabilidad de sitios web.",
      "Colaboración con el equipo interno para alinear las soluciones de interfaz con los objetivos del negocio.",
    ],
  },
];

export const cvLabels = {
  es: {
    profile: "Perfil profesional",
    experience: "Experiencia profesional",
    projects: "Proyectos destacados",
    education: "Educación",
    certifications: "Certificaciones y actividades",
    skills: "Habilidades técnicas",
    tech: "Tecnologías",
    skillGroups: {
      frontend: "Frontend",
      backend: "Backend y APIs",
      mobile: "Desarrollo móvil",
      db: "Bases de datos",
      cloudAi: "Cloud, IA y procesamiento documental",
      tools: "Herramientas y colaboración",
      languages: "Idiomas",
    },
  },
  en: {
    profile: "Professional profile",
    experience: "Professional experience",
    projects: "Featured projects",
    education: "Education",
    certifications: "Certifications and activities",
    skills: "Technical skills",
    tech: "Technologies",
    skillGroups: {
      frontend: "Frontend",
      backend: "Backend and APIs",
      mobile: "Mobile development",
      db: "Databases",
      cloudAi: "Cloud, AI and document processing",
      tools: "Tools and collaboration",
      languages: "Languages",
    },
  },
} as const;

const cvEs: CvData = {
  name: "Fabricio Aylas Moreno",
  email: "aylasmorenof@gmail.com",
  phone: "+51 912 404 450",
  location: "Lima, Perú",
  linkedin: "https://www.linkedin.com/in/fabricio-aylas/",
  github: GITHUB,
  headline: "Desarrollador Full Stack",
  summary:
    "Desarrollador Full Stack con experiencia en el desarrollo y mantenimiento de aplicaciones web y móviles, APIs REST, microservicios e integraciones con inteligencia artificial. He participado en soluciones de biometría y verificación de identidad, reconocimiento óptico de caracteres (OCR), visión computacional y plataformas empresariales.\n\nTrabajo con tecnologías como Flutter, Vue.js, Angular, Node.js, TypeScript, Laravel y .NET, integrando servicios cloud, bases de datos y herramientas de control de versiones. Cuento con experiencia en despliegues en Google Cloud Run y publicación de aplicaciones en Google Play y App Store. Egresado de Diseño y Desarrollo de Software por TECSUP y estudiante de Ingeniería de Software en USIL.",
  experience: sharedExperienceEs,
  projects: [
    {
      name: "ULenguage — Aplicación de traducción cultural quechua",
      description:
        "Aplicación móvil orientada a turistas en Cusco que facilita la traducción entre quechua, español e inglés. Incorpora reconocimiento de texto desde imágenes, traducción y asistencia con inteligencia artificial para contextualizar expresiones culturales.",
      tech: "Flutter, Dart, Node.js, Express.js, MongoDB, JWT, Google Vision API, Gemini AI, Google Translate API, Tesseract.js y Swagger",
    },
    {
      name: "SaveBot — Plataforma de respaldo de imágenes mediante Telegram",
      description:
        "Aplicación web integrada con un bot de Telegram para gestionar y distribuir imágenes a través de una interfaz web y servicios de mensajería.",
      tech: "JavaScript, Node.js, Telegram Bot API, APIs REST, HTML, CSS y Git",
    },
    {
      name: "PostulaFácil — Editor web de currículums",
      description:
        "Aplicación web para crear, editar y exportar currículums, con vista previa en tiempo real y almacenamiento local de la información del usuario.",
      tech: "Vue.js 3, TypeScript, Tailwind CSS, JSON y generación de PDF",
    },
  ],
  education: [
    {
      school: "Universidad San Ignacio de Loyola (USIL)",
      degree: "Ingeniería de Software",
      date: "2026 — Actualidad",
      location: "Lima, Perú",
    },
    {
      school: "TECSUP",
      degree: "Diseño y Desarrollo de Software — Egresado · Grado de bachiller",
      date: "2023 — 2025",
      location: "Lima, Perú",
    },
  ],
  certifications: [
    "Scrum Fundamentals Certified — SCRUMstudy",
    "Fundamentos de Ciberseguridad — Cisco",
    "Participante — Hackathon Becas BCP 2025",
    "Equipo seleccionado — Hackathon TECSUP 2024",
    "Training Camp CPC — UTEC",
  ],
  skills: {
    frontend: "Vue.js, Angular, React, Next.js, JavaScript, TypeScript, HTML5, CSS3, Bootstrap y Tailwind CSS",
    backend: "Node.js, Express.js, PHP, Laravel, C#, .NET, APIs REST, JWT y Swagger",
    mobile: "Flutter, Dart, GetX, Firebase y Kotlin",
    db: "SQL Server, MySQL, PostgreSQL, MongoDB y SQLite",
    cloudAi:
      "Google Cloud Run, Docker, AWS Rekognition, Google ML Kit, Google Vision API, Google Gemini AI, Grok, OCR y Telegram Bot API",
    tools: "Git, GitHub, Linux, Postman y Jira",
    languages: "Español (nativo), Inglés (B2)",
  },
  fileName: "CV_Fabricio_Aylas_Moreno",
};

const cvEn: CvData = {
  ...cvEs,
  location: "Lima, Peru",
  headline: "Full Stack Developer",
  summary:
    "Full Stack developer with experience building and maintaining web and mobile applications, REST APIs, microservices, and artificial intelligence integrations. I have contributed to biometrics and identity verification, optical character recognition (OCR), computer vision, and enterprise platforms.\n\nI work with Flutter, Vue.js, Angular, Node.js, TypeScript, Laravel, and .NET, integrating cloud services, databases, and version control. I deploy on Google Cloud Run and publish applications on Google Play and the App Store. Software Design and Development graduate from TECSUP, and a Software Engineering student at USIL.",
  experience: [
    {
      company: "Belity — At-home beauty platform",
      role: "Full Stack Mobile Developer",
      date: "October 2026 — Present",
      location: "Lima, Peru",
      description: [
        "Implemented identity verification with AWS Rekognition, including facial comparison and Face Liveness.",
        "Integrated Grok to classify images and assess their quality while professionals sign up.",
        "Built OCR and document validation for national IDs, passports, and PDFs with Google ML Kit.",
        "Built and integrated microservices with Node.js, TypeScript, and Express, deployed on Google Cloud Run with Docker and connected to Laravel.",
        "Maintained and evolved the Flutter app with GetX and Firebase, and managed releases on Google Play Console and App Store Connect.",
      ],
    },
    {
      company: "Firefly One",
      role: "Full Stack Developer",
      date: "July 2026 — September 2026",
      location: "Lima, Peru",
      description: [
        "Built and modernized enterprise systems for the insurance sector with Vue.js and Laravel.",
        "Implemented and consumed REST APIs, with emphasis on frontend-backend integration, security, and performance.",
        "Managed code with Git and GitHub, taking part in pull requests and code reviews to improve maintainability.",
        "Tracked tasks and coordinated with cross-functional teams using Jira and agile methods.",
      ],
    },
    {
      company: "Syncra Connect — Enterprise CRM (Unilene Project)",
      role: "Full Stack Developer",
      date: "February 2026 — June 2026",
      location: "Lima, Peru",
      description: [
        "Built and maintained features for an enterprise CRM.",
        "Implemented and consumed REST APIs with .NET and built interfaces with Angular.",
        "Took part in mobile features using Flutter.",
        "Created and optimized SQL Server queries and stored procedures.",
        "Fixed issues, maintained existing features, and handled version control with Git.",
      ],
    },
    {
      company: "TECSUP",
      role: "Full Stack Developer — Academic project",
      date: "May 2025 — September 2025",
      location: "Lima, Peru",
      description: [
        "Built a web system to manage the chemical inventory of an academic laboratory.",
        "Implemented CRUD operations, stock control, and automated reports.",
        "Built the backend with Laravel and stored the data in SQLite.",
        "Wrote technical documentation and delivered the work iteratively under an agile method.",
      ],
    },
    {
      company: "Cimark Comunicación Corporativa S.A.C.",
      role: "Full Stack Developer",
      date: "February 2024 — January 2025",
      location: "Lima, Peru",
      description: [
        "Built and improved web interfaces focused on user experience (UX/UI) and responsive design.",
        "Implemented visual and functional improvements based on analysis of platforms in the sector.",
        "Improved navigation, structure, and usability of the websites.",
        "Worked with the internal team so the interface solutions matched business goals.",
      ],
    },
  ],
  projects: [
    {
      name: "ULenguage — Quechua cultural translation app",
      description:
        "Mobile app for tourists in Cusco that translates between Quechua, Spanish, and English. It recognizes text from images, translates it, and uses artificial intelligence to explain cultural expressions.",
      tech: cvEs.projects[0].tech,
    },
    {
      name: "SaveBot — Image backup platform via Telegram",
      description:
        "Web application integrated with a Telegram bot to manage and distribute images through a web interface and messaging services.",
      tech: cvEs.projects[1].tech,
    },
    {
      name: "PostulaFácil — Web resume editor",
      description:
        "Web application to create, edit, and export resumes, with a live preview and local storage of the user's information.",
      tech: cvEs.projects[2].tech,
    },
  ],
  education: [
    {
      school: "Universidad San Ignacio de Loyola (USIL)",
      degree: "Software Engineering",
      date: "2026 — Present",
      location: "Lima, Peru",
    },
    {
      school: "TECSUP",
      degree: "Software Design and Development — Graduate · Bachelor's degree",
      date: "2023 — 2025",
      location: "Lima, Peru",
    },
  ],
  certifications: [
    "Scrum Fundamentals Certified — SCRUMstudy",
    "Cybersecurity Fundamentals — Cisco",
    "Participant — BCP Scholarship Hackathon 2025",
    "Selected team — TECSUP Hackathon 2024",
    "Training Camp CPC — UTEC",
  ],
  skills: {
    frontend: "Vue.js, Angular, React, Next.js, JavaScript, TypeScript, HTML5, CSS3, Bootstrap, and Tailwind CSS",
    backend: "Node.js, Express.js, PHP, Laravel, C#, .NET, REST APIs, JWT, and Swagger",
    mobile: "Flutter, Dart, GetX, Firebase, and Kotlin",
    db: "SQL Server, MySQL, PostgreSQL, MongoDB, and SQLite",
    cloudAi:
      "Google Cloud Run, Docker, AWS Rekognition, Google ML Kit, Google Vision API, Google Gemini AI, Grok, OCR, and Telegram Bot API",
    tools: "Git, GitHub, Linux, Postman, and Jira",
    languages: "Spanish (Native), English (B2)",
  },
  fileName: "CV_Fabricio_Aylas_Moreno_EN",
};

export function getCv(lang: "es" | "en"): CvData {
  return lang === "en" ? cvEn : cvEs;
}
