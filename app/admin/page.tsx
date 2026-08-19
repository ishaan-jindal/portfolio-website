"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Authentication failed");
        return;
      }

      router.push("/admin/dashboard");
    } catch {
      setError("Network error — try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card ascii-panel">
        <div className="admin-login-header">
          <span className="font-mono text-sm text-[var(--accent)]">[SYS]</span>
          <h1 className="admin-login-title">Admin Access</h1>
          <p className="admin-login-subtitle">
            Authenticated session required
          </p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div>
            <label htmlFor="admin-password" className="form-label">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-input"
              placeholder="Enter admin password"
              autoComplete="current-password"
              autoFocus
              required
            />
          </div>

          {error && (
            <div className="admin-login-error">
              <span className="font-mono text-xs text-[var(--accent)]">ERR</span>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="text-button text-button--primary w-full"
          >
            {loading ? (
              <span className="admin-login-spinner" />
            ) : (
              "Authenticate"
            )}
          </button>
        </form>

        <p className="admin-login-footer">
          <Link href="/" className="admin-login-back-link">
            ← back to site
          </Link>
        </p>
      </div>
    </div>
  );
}
