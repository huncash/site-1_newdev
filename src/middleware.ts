import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { SESSION_COOKIE } from "@/auth/session-constants";

function hostnameOf(host: string): string {
  return host.split(":")[0].toLowerCase();
}

function isBimHost(host: string): boolean {
  const hostname = hostnameOf(host);
  return hostname === "bim.vrgo.hu" || hostname === "bim.localhost";
}

function isLocalHost(host: string): boolean {
  const hostname = hostnameOf(host);
  return hostname === "localhost" || hostname === "127.0.0.1";
}

function withSiteHeaders(request: NextRequest, site: "bim" | "main", prefix: boolean) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-admin-pathname", request.nextUrl.pathname);
  if (site === "bim") {
    requestHeaders.set("x-vrgo-site", "bim");
    requestHeaders.set("x-bim-prefix", prefix ? "1" : "0");
  }
  return requestHeaders;
}

function bimRouting(request: NextRequest): NextResponse | null {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/admin")
  ) {
    return null;
  }

  if (isBimHost(host)) {
    if (pathname === "/bim" || pathname.startsWith("/bim/")) {
      const clean = pathname === "/bim" ? "/" : pathname.slice("/bim".length);
      return NextResponse.redirect(new URL(clean, request.url));
    }
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/bim" : `/bim${pathname}`;
    return NextResponse.rewrite(url, {
      request: { headers: withSiteHeaders(request, "bim", false) },
    });
  }

  if (pathname === "/bim" || pathname.startsWith("/bim/")) {
    if (!isLocalHost(host)) {
      const clean = pathname === "/bim" ? "/" : pathname.slice("/bim".length);
      return NextResponse.redirect(new URL(`https://bim.vrgo.hu${clean || "/"}`));
    }
    return NextResponse.next({
      request: { headers: withSiteHeaders(request, "bim", true) },
    });
  }

  return null;
}

export function middleware(request: NextRequest) {
  const routed = bimRouting(request);
  if (routed) return routed;

  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-admin-pathname", pathname);

  const isLogin =
    pathname === "/admin/login" || pathname.startsWith("/admin/login/");
  const isLoginApi = pathname.startsWith("/api/admin/login");

  if (pathname.startsWith("/api/admin")) {
    if (isLoginApi) {
      return NextResponse.next({ request: { headers: requestHeaders } });
    }
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (isLogin) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    const login = new URL("/admin/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|txt|xml)$).*)",
  ],
};
