import { auth } from "@/auth";
import { AppHeader } from "@/components/custom/app-header";
import { PropsWithChildren } from "react";

const workspaces: {
  slug: string;
}[] = [];

export default async function HomeLayout({
  children,
  params,
}: PropsWithChildren<{ params: { workspaceSlug: string } }>) {
  const { workspaceSlug } = params;

  const session = await auth();

  if (
    workspaces.length == 0 ||
    !workspaces.find((x) => x.slug == workspaceSlug)
  )
    console.log("Workspace not found");

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 conainer px-0">
        {children}
      </main>
    </div>
  );
}
