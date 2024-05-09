import { auth } from "@/auth";
import { AppHeader, EditorHeader } from "@/components/custom/app-header";
import { useSession } from "next-auth/react";
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
      <EditorHeader id={session?.user?.id!} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:px-8 md:py-6">
        {children}
      </main>
    </div>
  );
}
