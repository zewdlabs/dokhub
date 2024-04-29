import { auth } from "@/auth";

export const middleware = auth(async (req) => {
  const pathname = req.nextUrl.pathname;

  if (
    pathname === "/" ||
    pathname === "/pricing" ||
    pathname.startsWith("/app/invite") ||
    pathname.startsWith("/blog")
  ) {
    return;
  }

  if (req.auth) {
    if (pathname.startsWith("/auth")) {
      return Response.redirect(new URL("/app", req.url));
    }

    // TODO: This should resolve to a personal workspace or a team workspace
    if (pathname.startsWith("/app")) {
      console.log(">>> Redirecting to / from /app");
      return Response.redirect(new URL("/", req.url));
    }
  } else {
    if (pathname.startsWith("/auth")) return;
    return Response.redirect(new URL("/auth/signin", req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
