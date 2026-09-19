import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { isTerminalClient } from "./app/lib/is-cli";

// Routes that have CLI equivalents
const CLI_ROUTES: Record<string, string> = {
  "/": "/api/cli",
  "/about": "/api/cli/about",
  "/projects": "/api/cli/projects",
  "/contact": "/api/cli/contact",
};

// Browser-friendly redirects (section anchors on the SPA)
const BROWSER_REDIRECTS: Record<string, string> = {
  "/about": "/#about",
  "/projects": "/#projects",
  "/contact": "/#contact",
};

// Known routes that should NOT be redirected
const KNOWN_ROUTES = new Set([
  "/",
  "/resume",
  "/admin",
  "/admin/dashboard",
  "/manifest.webmanifest",
]);

// Fail closed: no JWT_SECRET → admin dashboard access is denied
const JWT_SECRET = process.env.JWT_SECRET
  ? new TextEncoder().encode(process.env.JWT_SECRET)
  : null;

function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${
      process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""
    }`,
    `style-src 'self' 'nonce-${nonce}' 'unsafe-inline'`,
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

function withSecurityHeaders(response: NextResponse, csp: string) {
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export async function proxy(req: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = buildCsp(nonce);
  // CSP must be present on the REQUEST headers — Next.js reads it during
  // rendering to extract the nonce and attach it to inline scripts/styles.
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const ua = req.headers.get("user-agent") ?? "";
  const isCLI = isTerminalClient(ua);
  const pathname = req.nextUrl.pathname;

  // CLI clients → rewrite to API routes
  if (isCLI) {
    const apiRoute = CLI_ROUTES[pathname];
    if (apiRoute) {
      const url = req.nextUrl.clone();
      url.pathname = apiRoute;
      return withSecurityHeaders(
        NextResponse.rewrite(url, { request: { headers: requestHeaders } }),
        csp
      );
    }
  }

  // Admin dashboard — require JWT authentication
  if (pathname === "/admin/dashboard") {
    const token = req.cookies.get("admin_token")?.value;
    if (!token || !JWT_SECRET) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }

    try {
      await jwtVerify(token, JWT_SECRET);
    } catch {
      const url = req.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }

    return withSecurityHeaders(
      NextResponse.next({ request: { headers: requestHeaders } }),
      csp
    );
  }

  // Admin login page — pass through
  if (pathname === "/admin") {
    return withSecurityHeaders(
      NextResponse.next({ request: { headers: requestHeaders } }),
      csp
    );
  }

  // Browser clients → redirect known section paths to /#section
  const redirect = BROWSER_REDIRECTS[pathname];
  if (redirect) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.hash = redirect.replace("/", "");
    return NextResponse.redirect(url, 308);
  }

  // Unknown paths → redirect to home (browsers and CLI alike)
  if (!KNOWN_ROUTES.has(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url, 308);
  }

  return withSecurityHeaders(
    NextResponse.next({ request: { headers: requestHeaders } }),
    csp
  );
}

export const config = {
  // Match everything except Next internals, API routes, and static files
  matcher: [
    "/((?!_next|api|favicon\\.ico|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico|pdf|css|js|woff2?|ttf)).*)",
  ],
};