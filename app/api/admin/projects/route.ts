import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/app/lib/auth";
import {
  fetchProjectsFromGitHub,
  updateProjectsOnGitHub,
} from "@/app/lib/github";
import { getProjects, type Project } from "@/app/lib/projects";

const MAX_PROJECTS = 100;
const MAX_STRING_LIST = 30;
const MAX_STRING_ITEM = 120;

function isNonEmptyString(v: unknown, max: number): v is string {
  return (
    typeof v === "string" && v.trim().length > 0 && v.length <= max
  );
}

function isStringList(v: unknown): v is string[] {
  return (
    Array.isArray(v) &&
    v.length <= MAX_STRING_LIST &&
    v.every((s) => typeof s === "string" && s.length <= MAX_STRING_ITEM)
  );
}

function isHttpUrl(v: unknown): boolean {
  if (v === undefined || v === "") return true; // optional fields
  if (typeof v !== "string" || v.length > 2048) return false;
  try {
    const u = new URL(v);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

/** Validate a single project object; returns an error message or null. */
function validateProject(p: unknown): string | null {
  if (typeof p !== "object" || p === null) return "project must be an object";
  const r = p as Record<string, unknown>;
  if (
    typeof r.id !== "string" ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.id) ||
    r.id.length > 64
  ) {
    return "project id must be a URL-safe slug (max 64 chars)";
  }
  if (!isNonEmptyString(r.title, 200)) {
    return `project "${r.id}": title is required (max 200 chars)`;
  }
  if (!isNonEmptyString(r.shortTitle, 200)) {
    return `project "${r.id}": shortTitle is required (max 200 chars)`;
  }
  if (!isNonEmptyString(r.asciiLabel, 16)) {
    return `project "${r.id}": asciiLabel is required (max 16 chars)`;
  }
  if (!isNonEmptyString(r.description, 2000)) {
    return `project "${r.id}": description is required (max 2000 chars)`;
  }
  if (!isStringList(r.stack) || !isStringList(r.highlights)) {
    return `project "${r.id}": stack/highlights must be string arrays (max ${MAX_STRING_LIST} items, ${MAX_STRING_ITEM} chars each)`;
  }
  for (const f of ["githubLink", "liveLink", "testerLink"] as const) {
    if (!isHttpUrl(r[f])) {
      return `project "${r.id}": ${f} must be an http(s) URL`;
    }
  }
  return null;
}

/**
 * GET /api/admin/projects — Fetch current projects from GitHub.
 * Falls back to local file if GitHub is unreachable (e.g. file not pushed yet).
 */
export async function GET() {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { content, sha } = await fetchProjectsFromGitHub();
    const projects: Project[] = JSON.parse(content);
    return NextResponse.json(
      { projects, sha },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (ghErr: unknown) {
    // GitHub fetch failed — fall back to local file
    // This happens when the file hasn't been pushed yet
    console.warn(
      "[admin/projects] GitHub fetch failed, falling back to local file:",
      ghErr instanceof Error ? ghErr.message : ghErr
    );

    try {
      const projects = getProjects();
      return NextResponse.json(
        {
          projects,
          sha: null,
          warning:
            "Loaded from local file — push data/projects.json to GitHub to enable live editing",
        },
        { headers: { "Cache-Control": "no-store" } }
      );
    } catch (localErr: unknown) {
      const message =
        localErr instanceof Error ? localErr.message : "Unknown error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }
}

/**
 * PUT /api/admin/projects — Update projects on GitHub (creates a commit).
 * If SHA is null (local-only mode), fetches it from GitHub first or creates the file.
 */
export async function PUT(req: NextRequest) {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { projects, sha, message } = await req.json();

    // Validate projects shape and bounds
    if (!Array.isArray(projects)) {
      return NextResponse.json(
        { error: "projects must be an array" },
        { status: 400 }
      );
    }
    if (projects.length > MAX_PROJECTS) {
      return NextResponse.json(
        { error: `too many projects (max ${MAX_PROJECTS})` },
        { status: 400 }
      );
    }

    for (const p of projects) {
      const err = validateProject(p);
      if (err) {
        return NextResponse.json({ error: err }, { status: 400 });
      }
    }

    if (
      message !== undefined &&
      (typeof message !== "string" || message.length > 500)
    ) {
      return NextResponse.json(
        { error: "message must be a string under 500 chars" },
        { status: 400 }
      );
    }

    // If no SHA provided, try to fetch it from GitHub (or create the file)
    let currentSha = sha;
    if (!currentSha) {
      try {
        const { sha: remoteSha } = await fetchProjectsFromGitHub();
        currentSha = remoteSha;
      } catch {
        // File doesn't exist on GitHub yet — we'll create it (no sha needed)
        currentSha = undefined;
      }
    }

    const content = JSON.stringify(projects, null, 2) + "\n";
    const { commitUrl } = await updateProjectsOnGitHub(
      content,
      currentSha,
      message
    );

    return NextResponse.json(
      { success: true, commitUrl },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
