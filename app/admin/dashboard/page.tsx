"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/app/lib/projects";

type ProjectFormData = Omit<Project, "id"> & { id?: string };

const EMPTY_PROJECT: ProjectFormData = {
  title: "",
  shortTitle: "",
  asciiLabel: "",
  description: "",
  stack: [],
  highlights: [],
  githubLink: "",
  liveLink: "",
  testerLink: "",
};

export default function AdminDashboardPage() {
  const router = useRouter();

  // Source of truth from GitHub / local file
  const [savedProjects, setSavedProjects] = useState<Project[]>([]);
  const [sha, setSha] = useState<string | null>(null);

  // Working copy — edits happen here, only pushed on explicit save
  const [projects, setProjects] = useState<Project[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [warning, setWarning] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>(EMPTY_PROJECT);
  const [stackInput, setStackInput] = useState("");
  const [highlightInput, setHighlightInput] = useState("");

  // Delete confirmation
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  // Track unsaved changes
  const hasChanges =
    JSON.stringify(projects) !== JSON.stringify(savedProjects);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/projects");
      if (res.status === 401) {
        router.push("/admin");
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      const fetched = data.projects ?? [];
      setSavedProjects(fetched);
      setProjects(fetched);
      setSha(data.sha ?? null);
      if (data.warning) setWarning(data.warning);
      else setWarning("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasChanges]);

  const saveToGitHub = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projects,
          sha,
          message: "chore: update projects via admin panel",
        }),
      });

      if (res.status === 401) {
        router.push("/admin");
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      setSuccess("Saved & committed! Changes will deploy shortly.");
      // Refetch to get the new SHA and sync saved state
      await fetchProjects();

      setTimeout(() => setSuccess(""), 4000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const discardChanges = () => {
    setProjects([...savedProjects]);
    setSuccess("");
    setError("");
  };

  const openAddModal = () => {
    setEditIndex(null);
    setFormData(EMPTY_PROJECT);
    setStackInput("");
    setHighlightInput("");
    setModalOpen(true);
  };

  const openEditModal = (index: number) => {
    setEditIndex(index);
    const p = projects[index];
    setFormData({ ...p });
    setStackInput("");
    setHighlightInput("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditIndex(null);
    setFormData(EMPTY_PROJECT);
  };

  const handleSaveProject = () => {
    const id =
      formData.id ||
      formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const project: Project = {
      ...formData,
      id,
      stack: formData.stack ?? [],
      highlights: formData.highlights ?? [],
    };

    if (editIndex !== null) {
      const updated = [...projects];
      updated[editIndex] = project;
      setProjects(updated);
    } else {
      setProjects([...projects, project]);
    }

    closeModal();
  };

  const handleDelete = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
    setDeleteIndex(null);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    router.push("/admin");
  };

  const addStackItem = () => {
    const val = stackInput.trim();
    if (val && !formData.stack.includes(val)) {
      setFormData({ ...formData, stack: [...formData.stack, val] });
      setStackInput("");
    }
  };

  const removeStackItem = (item: string) => {
    setFormData({
      ...formData,
      stack: formData.stack.filter((s) => s !== item),
    });
  };

  const addHighlight = () => {
    const val = highlightInput.trim();
    if (val && !formData.highlights.includes(val)) {
      setFormData({
        ...formData,
        highlights: [...formData.highlights, val],
      });
      setHighlightInput("");
    }
  };

  const removeHighlight = (item: string) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((h) => h !== item),
    });
  };

  const moveProject = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= projects.length) return;
    const updated = [...projects];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setProjects(updated);
  };

  if (loading) {
    return (
      <div className="admin-dashboard-wrapper">
        <div className="admin-dashboard-loading">
          <span className="admin-login-spinner" />
          <span className="font-mono text-sm text-[var(--muted)]">
            Loading projects...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-wrapper">
      {/* Header */}
      <div className="admin-dashboard-header">
        <div>
          <span className="font-mono text-sm text-[var(--accent)]">[ADM]</span>
          <h1 className="text-2xl font-semibold text-[var(--foreground)] mt-1">
            Project Manager
          </h1>
          <p className="font-mono text-xs text-[var(--muted)] mt-1">
            {projects.length} project{projects.length !== 1 ? "s" : ""}
            {sha ? ` · SHA ${sha.slice(0, 7)}` : " · local mode"}
            {hasChanges && (
              <span className="text-[var(--accent-3)]"> · unsaved changes</span>
            )}
          </p>
        </div>
        <div className="admin-dashboard-actions">
          <button
            onClick={openAddModal}
            className="text-button"
          >
            + Add Project
          </button>
          <button onClick={handleLogout} className="text-button">
            Logout
          </button>
        </div>
      </div>

      {/* Unsaved Changes Bar */}
      {hasChanges && (
        <div className="admin-changes-bar">
          <span className="font-mono text-xs text-[var(--accent-3)]">
            You have unsaved changes
          </span>
          <div className="admin-changes-bar-actions">
            <button
              onClick={discardChanges}
              disabled={saving}
              className="text-button admin-btn--discard"
            >
              Discard
            </button>
            <button
              onClick={saveToGitHub}
              disabled={saving}
              className="text-button text-button--primary"
            >
              {saving ? (
                <span className="admin-login-spinner" />
              ) : (
                "Save & Commit"
              )}
            </button>
          </div>
        </div>
      )}

      {/* Status Messages */}
      {error && (
        <div className="admin-toast admin-toast--error">
          <span className="font-mono text-xs text-[var(--accent)]">ERR</span>
          <span>{error}</span>
          <button onClick={() => setError("")} className="admin-toast-close">
            ×
          </button>
        </div>
      )}
      {success && (
        <div className="admin-toast admin-toast--success">
          <span className="font-mono text-xs text-[var(--accent-2)]">OK</span>
          <span>{success}</span>
        </div>
      )}

      {warning && (
        <div className="admin-toast admin-toast--warning">
          <span className="font-mono text-xs text-[var(--accent-3)]">WARN</span>
          <span>{warning}</span>
        </div>
      )}

      {saving && (
        <div className="admin-saving-bar">
          <span className="admin-login-spinner" />
          <span className="font-mono text-xs text-[var(--muted)]">
            Committing to GitHub...
          </span>
        </div>
      )}

      {/* Project List */}
      <div className="admin-project-list">
        {projects.map((project, index) => (
          <div key={project.id} className="admin-project-row ascii-panel">
            <div className="admin-project-row-content">
              <div className="admin-project-row-info">
                <span className="font-mono text-sm text-[var(--accent)]">
                  {project.asciiLabel}
                </span>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-[var(--muted)]">
                  {project.shortTitle}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.stack.slice(0, 4).map((s) => (
                    <span key={s} className="text-chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="admin-project-row-actions">
                <button
                  onClick={() => moveProject(index, "up")}
                  disabled={index === 0}
                  className="admin-icon-btn"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveProject(index, "down")}
                  disabled={index === projects.length - 1}
                  className="admin-icon-btn"
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  onClick={() => openEditModal(index)}
                  className="admin-icon-btn admin-icon-btn--edit"
                  title="Edit"
                >
                  ✎
                </button>
                <button
                  onClick={() => setDeleteIndex(index)}
                  className="admin-icon-btn admin-icon-btn--delete"
                  title="Delete"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation */}
      {deleteIndex !== null && (
        <div className="admin-modal-overlay" onClick={() => setDeleteIndex(null)}>
          <div
            className="admin-confirm-modal ascii-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              Delete &quot;{projects[deleteIndex].title}&quot;?
            </h3>
            <p className="font-mono text-sm text-[var(--muted)] mt-2">
              This won&apos;t be committed until you save.
            </p>
            <div className="admin-confirm-actions">
              <button
                onClick={() => setDeleteIndex(null)}
                className="text-button"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteIndex)}
                className="text-button admin-btn--danger"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div
            className="admin-edit-modal ascii-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-edit-modal-header">
              <h3 className="text-xl font-semibold text-[var(--foreground)]">
                {editIndex !== null ? "Edit Project" : "New Project"}
              </h3>
              <button
                onClick={closeModal}
                className="font-mono text-xl text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                ×
              </button>
            </div>

            <div className="admin-edit-modal-body">
              <div className="admin-form-grid">
                <div>
                  <label htmlFor="proj-title" className="form-label">
                    Title *
                  </label>
                  <input
                    id="proj-title"
                    type="text"
                    className="text-input"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Project Name"
                  />
                </div>

                <div>
                  <label htmlFor="proj-short" className="form-label">
                    Short Title *
                  </label>
                  <input
                    id="proj-short"
                    type="text"
                    className="text-input"
                    value={formData.shortTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, shortTitle: e.target.value })
                    }
                    placeholder="Brief subtitle"
                  />
                </div>

                <div>
                  <label htmlFor="proj-label" className="form-label">
                    ASCII Label *
                  </label>
                  <input
                    id="proj-label"
                    type="text"
                    className="text-input"
                    value={formData.asciiLabel}
                    onChange={(e) =>
                      setFormData({ ...formData, asciiLabel: e.target.value })
                    }
                    placeholder="[XY]"
                  />
                </div>

                <div>
                  <label htmlFor="proj-id" className="form-label">
                    ID (auto-generated)
                  </label>
                  <input
                    id="proj-id"
                    type="text"
                    className="text-input"
                    value={
                      formData.id ||
                      formData.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "")
                    }
                    onChange={(e) =>
                      setFormData({ ...formData, id: e.target.value })
                    }
                    placeholder="auto-from-title"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="proj-desc" className="form-label">
                  Description *
                </label>
                <textarea
                  id="proj-desc"
                  className="text-input admin-textarea"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="What does this project do?"
                  rows={3}
                />
              </div>

              <div className="admin-form-grid mt-4">
                <div>
                  <label htmlFor="proj-github" className="form-label">
                    GitHub Link
                  </label>
                  <input
                    id="proj-github"
                    type="url"
                    className="text-input"
                    value={formData.githubLink || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, githubLink: e.target.value })
                    }
                    placeholder="https://github.com/..."
                  />
                </div>

                <div>
                  <label htmlFor="proj-live" className="form-label">
                    Live Link
                  </label>
                  <input
                    id="proj-live"
                    type="url"
                    className="text-input"
                    value={formData.liveLink || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, liveLink: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label htmlFor="proj-tester" className="form-label">
                    Tester Link
                  </label>
                  <input
                    id="proj-tester"
                    type="url"
                    className="text-input"
                    value={formData.testerLink || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, testerLink: e.target.value })
                    }
                    placeholder="https://groups.google.com/..."
                  />
                </div>
              </div>

              {/* Stack Tags */}
              <div className="mt-4">
                <label className="form-label">Stack</label>
                <div className="admin-tag-input-row">
                  <input
                    type="text"
                    className="text-input"
                    value={stackInput}
                    onChange={(e) => setStackInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addStackItem();
                      }
                    }}
                    placeholder="Add tech (Enter to add)"
                  />
                  <button
                    type="button"
                    onClick={addStackItem}
                    className="text-button"
                  >
                    +
                  </button>
                </div>
                <div className="admin-tag-list">
                  {formData.stack.map((item) => (
                    <span key={item} className="admin-tag">
                      {item}
                      <button
                        onClick={() => removeStackItem(item)}
                        className="admin-tag-remove"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-4">
                <label className="form-label">Highlights</label>
                <div className="admin-tag-input-row">
                  <input
                    type="text"
                    className="text-input"
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addHighlight();
                      }
                    }}
                    placeholder="Add highlight (Enter to add)"
                  />
                  <button
                    type="button"
                    onClick={addHighlight}
                    className="text-button"
                  >
                    +
                  </button>
                </div>
                <div className="admin-tag-list">
                  {formData.highlights.map((item) => (
                    <span key={item} className="admin-tag admin-tag--highlight">
                      {item}
                      <button
                        onClick={() => removeHighlight(item)}
                        className="admin-tag-remove"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="admin-edit-modal-footer">
              <button onClick={closeModal} className="text-button">
                Cancel
              </button>
              <button
                onClick={handleSaveProject}
                disabled={
                  !formData.title || !formData.shortTitle || !formData.description
                }
                className="text-button text-button--primary"
              >
                {editIndex !== null ? "Save Changes" : "Add Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
