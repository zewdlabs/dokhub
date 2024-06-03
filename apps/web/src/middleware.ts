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
    if (
      pathname.startsWith("/auth") &&
      !pathname.startsWith("/auth/onboarding")
    ) {
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
          public: false,
          authorId: "clwwc1nst0000141z9muh78pp",
          // authorId: req.auth.user?.id,
        }),
      });

      if (newPageReq.ok) {
        const newWriterPage = await newPageReq.json();
        return Response.redirect(
          new URL(`/app/new/${newWriterPage.id}`, req.url),
        );
      } else {
        return Response.error();
      }
    }

    if (pathname.endsWith("/c")) {
      return Response.redirect(
        new URL(`/app/c/${req.auth.user!.id!}-${crypto.randomUUID()}`, req.url),
      );
    }
  } else {
    if (pathname.startsWith("/auth")) return;
    return Response.redirect(new URL("/auth/signin", req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
