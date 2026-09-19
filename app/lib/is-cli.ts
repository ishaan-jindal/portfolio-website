const TERMINAL_UA_PATTERN = /curl|wget|httpie|fetch|powershell/i;

/**
 * Detect terminal HTTP clients (curl, wget, httpie, …).
 * Single source of truth shared by proxy.ts and the /api/cli/* routes
 * so the rewrite and the handler can never disagree.
 */
export function isTerminalClient(
  userAgent: string | null | undefined
): boolean {
  return TERMINAL_UA_PATTERN.test(userAgent ?? "");
}
