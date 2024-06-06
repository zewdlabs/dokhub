import { auth } from "@/auth";
import { Post } from "./components/custom/post-list";
import { Organization } from "./app/(app)/admin/organizations/[organizationId]/layout";
import { User } from "next-auth";

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
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Untitled",
          content: "<h1>Start with a title</h1>",
          public: false,
          authorId: req.auth.user.id,
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
        new URL(`/app/c/${crypto.randomUUID()}`, req.url),
      );
    }

    if (pathname.endsWith("/admin/posts")) {
      const blog = (await (
        await fetch("http://localhost:4231/api/posts", {
          headers: {
            Authorization: `Bearer ${req.auth.tokens.accessToken}`,
          },
        })
      ).json()) as Post[];

      return Response.redirect(new URL(`/admin/posts/${blog[0].id}`, req.url));
    }

    if (pathname.endsWith("/admin/organizations")) {
      const orgs = (await (
        await fetch("http://localhost:4231/api/organization", {
          headers: {
            Authorization: `Bearer ${req.auth.tokens.accessToken}`,
          },
        })
      ).json()) as Organization[];

      return Response.redirect(
        new URL(`/admin/organizations/${orgs[0].id}`, req.url),
      );
    }

    if (pathname.endsWith("/admin/users")) {
      const res = await fetch("http://localhost:4231/api/user/verified", {
        headers: {
          Authorization: `Bearer ${req.auth.tokens.accessToken}`,
        },
      });

      if (!res.ok) {
        console.error(res.statusText);
        return Response.error();
      }

      const users = (await res.json()) as User[];

      return Response.redirect(new URL(`/admin/users/${users[0].id}`, req.url));
    }
  } else {
    if (pathname.startsWith("/auth")) return;
    return Response.redirect(new URL("/auth/signin", req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
