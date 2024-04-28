import { auth } from "@/auth";

export const middleware = auth(async (req) => {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/auth")) {
    if (req.auth) {
      console.log("Already signed in, redirecting to /");
      return Response.redirect(new URL("/app", req.url));
    }
  }

  //TODO: if public route, allow access
  if (pathname === "/" || pathname === "/pricing" || pathname === "") {
    return;
  }

  if (!req.auth) {
    if (pathname.startsWith("/auth")) return;
    return Response.redirect(new URL("/auth/signin", req.url));
  }

  if (pathname.startsWith("/app") && !pathname.startsWith("/app/invite")) {
    const workspaceSlug = req.nextUrl.pathname.split("/")?.[2];
    const hasWorkspaceSlug = !!workspaceSlug && workspaceSlug.trim() !== "";

    const allowedWorkspaces = await (
      await fetch(
        process.env.BACKEND_URL + `/api/user/${req.auth.user.id}/orgs`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${req.auth.backendTokens.accessToken}`,
          },
        },
      )
    ).json();

    if (hasWorkspaceSlug) {
      console.log(">>> Workspace slug", workspaceSlug);
      const hasAccessToWorkspace = allowedWorkspaces.find(
        ({
          slug,
        }: {
          id: string;
          name: string;
          slug: string;
          location: string;
          institutionLicenseNumber: string | null;
        }) => workspace.slug === workspaceSlug,
      );
      if (hasAccessToWorkspace) {
        console.log(">>> Allowed! Attaching to cookie", workspaceSlug);
        req.cookies.set("workspace-slug", workspaceSlug);
      } else {
        console.log(">>> Not allowed, redirecting to /app", workspaceSlug);
        return Response.redirect(new URL("/app", req.url));
      }
    } else {
      console.log(">>> No workspace slug available");
      if (allowedWorkspaces.length > 0) {
        const firstWorkspace = allowedWorkspaces[0];
        const { id, slug } = firstWorkspace;
        console.log(">>> Redirecting to first related workspace", slug);

        //TODO: If the user is it's first time, redirect to onboarding
        const res = await fetch(
          `${process.env.BACKEND_URL!}/api/users/${id}/orgs`,
        );

        if (!res.ok) {
          return Response.redirect(new URL("/", req.url));
        }

        const orgs = await res.json();

        //NOTE: Not the right implementation
        if (!orgs.length) {
          console.log(`>>> Redirecting to onboarding`, slug);
          return Response.redirect(new URL(`/app/${slug}/onboarding`, req.url));
        }

        console.log(">>> Redirecting to workspace", slug);
        return Response.redirect(new URL(`/app/${slug}/monitors`, req.url));
      }
    }
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
