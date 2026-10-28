import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectCase from "@/components/ProjectCase";
import { getProject, PROJECTS } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: `${project.name} | Fabricio Aylas Moreno`, description: project.tag.es };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getProject(slug)) notFound();
  return <ProjectCase slug={slug} />;
}
