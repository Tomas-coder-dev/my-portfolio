"use client";

import type { CSSProperties } from "react";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { cvLabels, cvSettings, type CvData } from "@/lib/cv";
import "@/components/cv/resume.css";

function linkLabel(value: string) {
  const raw = value.trim();
  if (!raw) return "";
  try {
    const url = new URL(raw.includes("://") ? raw : `https://${raw}`);
    const host = url.hostname.replace(/^www\./, "");
    return `${host}${url.pathname.replace(/\/$/, "")}`;
  } catch {
    return raw;
  }
}

export default function ResumeDocument({
  cv,
  lang,
  exportId = "resume-preview-content",
}: {
  cv: CvData;
  lang: "es" | "en";
  exportId?: string;
}) {
  const labels = cvLabels[lang];
  const settings = cvSettings;
  const skillEntries = Object.entries(cv.skills).filter(([key, val]) => key !== "other" && val);

  const pageStyle = {
    ["--line-spacing" as string]: settings.lineSpacing,
    ["--paragraph-spacing" as string]: `${settings.paragraphSpacing}px`,
    ["--margin-top" as string]: `${settings.marginTop}px`,
    ["--margin-bottom" as string]: `${settings.marginBottom}px`,
    ["--margin-left" as string]: `${settings.marginLeft}px`,
    ["--margin-right" as string]: `${settings.marginRight}px`,
    ["--theme-color" as string]: settings.themeColor,
    ["--page-background" as string]: settings.pageBackground,
    fontFamily: settings.fontFamily,
    fontSize: `${settings.fontSize}pt`,
    minHeight: settings.paperSize === "A4" ? "297mm" : "279mm",
    width: settings.paperSize === "A4" ? "210mm" : "216mm",
  } as CSSProperties;

  return (
    <div className="resume-preview-root flex w-full justify-center">
      <div className="resume-page-wrap">
        <div id={exportId} className="resume-page" style={pageStyle}>
          <header className="resume-header text-center">
            <h1 className="resume-name">{cv.name}</h1>
            {cv.headline ? <p className="resume-headline">{cv.headline}</p> : null}
            <div className="contact-info">
              {cv.location ? (
                <span className="contact-item">
                  <MapPin size={11} /> {cv.location}
                </span>
              ) : null}
              {cv.phone ? (
                <span className="contact-item">
                  <Phone size={11} /> {cv.phone}
                </span>
              ) : null}
              {cv.email ? (
                <span className="contact-item">
                  <Mail size={11} /> {cv.email}
                </span>
              ) : null}
              {cv.linkedin ? (
                <span className="contact-item">
                  <Linkedin size={11} /> {linkLabel(cv.linkedin)}
                </span>
              ) : null}
              {cv.github ? (
                <span className="contact-item">
                  <Github size={11} /> {linkLabel(cv.github)}
                </span>
              ) : null}
            </div>
          </header>

          {cv.summary ? (
            <section className="section-block">
              <h2 className="section-title">{labels.profile}</h2>
              <p className="profile-text">{cv.summary}</p>
            </section>
          ) : null}

          {cv.experience.length ? (
            <section className="section-block">
              <h2 className="section-title">{labels.experience}</h2>
              {cv.experience.map((job) => (
                <div key={`${job.company}-${job.date}`} className="entry">
                  <div className="entry-row font-bold">
                    <span className="entry-main">{job.company}</span>
                    {job.location ? <span className="entry-aside">{job.location}</span> : null}
                  </div>
                  <div className="entry-row italic">
                    <span className="entry-main">{job.role}</span>
                    {job.date ? <span className="entry-aside">{job.date}</span> : null}
                  </div>
                  <ul className="entry-list ml-5 list-disc">
                    {job.description.map((point) => (
                      <li key={point} className="text-justify">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ) : null}

          {cv.projects.length ? (
            <section className="section-block">
              <h2 className="section-title">{labels.projects}</h2>
              {cv.projects.map((proj) => (
                <div key={proj.name} className="entry">
                  <div className="entry-title font-bold">{proj.name}</div>
                  <p className="entry-body text-justify">{proj.description}</p>
                  {proj.tech ? (
                    <p className="entry-meta">
                      <strong>{labels.tech}:</strong> {proj.tech}
                    </p>
                  ) : null}
                </div>
              ))}
            </section>
          ) : null}

          {cv.education.length ? (
            <section className="section-block">
              <h2 className="section-title">{labels.education}</h2>
              {cv.education.map((edu) => (
                <div key={edu.school} className="entry">
                  <div className="entry-row font-bold">
                    <span className="entry-main">{edu.school}</span>
                    {edu.location ? <span className="entry-aside">{edu.location}</span> : null}
                  </div>
                  <div className="entry-row italic">
                    <span className="entry-main">{edu.degree}</span>
                    {edu.date ? <span className="entry-aside">{edu.date}</span> : null}
                  </div>
                </div>
              ))}
            </section>
          ) : null}

          {cv.certifications.length ? (
            <section className="section-block">
              <h2 className="section-title">{labels.certifications}</h2>
              <ul className="ml-5 list-disc">
                {cv.certifications.map((cert) => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {skillEntries.length ? (
            <section className="section-block">
              <h2 className="section-title">{labels.skills}</h2>
              {skillEntries.map(([key, val]) => (
                <p key={key} className="mb-1">
                  <strong>{labels.skillGroups[key as keyof typeof labels.skillGroups] ?? key}:</strong> {val}
                </p>
              ))}
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
