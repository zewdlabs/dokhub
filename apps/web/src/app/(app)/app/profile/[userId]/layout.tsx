import { PropsWithChildren } from "react";

export default function ProfileLayout({
  children,
  params,
}: PropsWithChildren<{ params: { userId: string } }>) {
  return <div>{children}</div>;
}
