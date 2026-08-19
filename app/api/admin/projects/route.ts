import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/app/lib/auth";
import {
  fetchProjectsFromGitHub,
  updateProjectsOnGitHub,
} from "@/app/lib/github";
import { getProjects, type Project } from "@/app/lib/projects";

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

    // Validate projects shape
    if (!Array.isArray(projects)) {
      return NextResponse.json(
        { error: "projects must be an array" },
        { status: 400 }
      );
    }

    for (const p of projects) {
      if (!p.id || !p.title || !p.description) {
        return NextResponse.json(
          { error: "Project missing required fields: id, title, description" },
          { status: 400 }
        );
      }
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
