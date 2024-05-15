import { EditorHeader } from "@/components/custom/app-header";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;

  const res = await fetch(`${process.env.BACKEND_URL}/api/posts/${id}`);

  if (!res.ok) {
    return {
      title: "Not Found",
    };
  }

  const post = await res.json();

  return {
    title: post.title,
  };
}

export default function WriterLayout({
  children,
  params,
}: PropsWithChildren<{ params: { id: string } }>) {
  return (
    <>
      <EditorHeader id={params.id} />
      <main className="flex min-h-screen w-full flex-col items-center gap-8 p-4 md:p-8">
        {children}
      </main>
    </>
  );
}
