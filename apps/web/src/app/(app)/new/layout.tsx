import { PropsWithChildren } from "react";

export default function WriterLayout({ children }: PropsWithChildren) {
  return <div className="flex flex-col h-screen">{children}</div>;
}
