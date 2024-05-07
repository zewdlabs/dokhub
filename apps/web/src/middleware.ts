import { NextResponse, type NextRequest } from "next/server";

export const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

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
      return NextResponse.redirect(
        new URL(`/new/${newWriterPage.id}`, req.url),
      );
    } else {
      return NextResponse.error();
    }
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
