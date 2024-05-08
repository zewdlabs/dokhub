import { NextResponse } from "next/server";
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

    if (pathname.endsWith("/new")) {
      const newPageReq = await fetch(`${process.env.BACKEND_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "New Post",
          content: "<h1>Start with a title</h1>",
          authorId: "clvwebzk40001thm1nq9rjqul",
        }),
      });

      if (newPageReq.ok) {
        const newWriterPage = await newPageReq.json();
        return Response.redirect(new URL(`/new/${newWriterPage.id}`, req.url));
      } else {
        return Response.error();
      }
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
