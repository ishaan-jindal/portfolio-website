import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects, type Project } from "@/app/lib/projects";

// CSP nonces require dynamic rendering so Next can inject them per-request
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.id }));
}

// ponytail: naive truncation; fine while descriptions are short prose
function truncate(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.lastIndexOf(" ", max);
  return `${text.slice(0, cut > 0 ? cut : max).trimEnd()}…`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjects().find((p) => p.id === slug);
  if (!project) return {};

  const description = truncate(project.description);
  return {
    title: project.title,
    description,
    alternates: {
      canonical: `/projects/${project.id}`,
    },
    openGraph: {
      title: project.title,
      description,
      url: `/projects/${project.id}`,
      images: ["/og.jpg"],
    },
  };
}

function ProjectLinks({ project }: { project: Project }) {
  const links = [
    project.liveLink && { href: project.liveLink, label: "Live" },
    project.githubLink && { href: project.githubLink, label: "GitHub" },
    project.testerLink && { href: project.testerLink, label: "Become a tester" },
  ].filter(Boolean) as { href: string; label: string }[];

  if (links.length === 0) return null;

  return (
    <ul className="mt-6 flex flex-wrap gap-3">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-button"
          >
            {link.label} <span aria-hidden="true">→</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjects().find((p) => p.id === slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.description,
    codeRepository: project.githubLink,
    programmingLanguage: project.stack.join(", "),
  };

  return (
    <div className="site-container flex-1 pt-[108px] pb-12">
      <p className="eyebrow">
        <Link
          href="/"
          className="transition-colors hover:text-[var(--accent)]"
        >
          Home
        </Link>{" "}
        <span aria-hidden="true">/</span> Projects
      </p>

      <h1 className="section-title mt-4">{project.title}</h1>
      <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--muted)]">
        {project.shortTitle} <span aria-hidden="true">·</span>{" "}
        {project.category}
      </p>

      <p className="mt-6 max-w-2xl text-sm leading-6 text-[var(--soft)]">
        {project.description}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li key={item} className="text-chip">
            {item}
          </li>
        ))}
      </ul>

      <ul className="mt-6 max-w-2xl space-y-2">
        {project.highlights.map((highlight) => (
          <li
            key={highlight}
            className="flex gap-3 text-sm leading-6 text-[var(--soft)]"
          >
            <span aria-hidden="true" className="text-[var(--accent)]">
              →
            </span>
            {highlight}
          </li>
        ))}
      </ul>

      <ProjectLinks project={project} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
