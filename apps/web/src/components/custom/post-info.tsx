import { cn, genFallback } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AccountButton from "./account";
import { Post } from "./post-list";
import Link from "next/link";

export default function PostInfo({
  postDetails,
}: {
  postDetails: Post | undefined;
}) {
  if (!postDetails) return null;

  return (
    <div className="container max-w-screen-lg md:px-24 mx-auto w-full pt-12 flex flex-col gap-4">
      <h1
        className={cn(
          "text-foreground font-cal text-4xl md:text-6xl",
          "bg-gradient-to-tl from-[hsl(var(--muted))] from-0% to-[hsl(var(--foreground))] to-40% bg-clip-text text-transparent",
        )}
      >
        {postDetails.title}
      </h1>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-14 w-14">
            <AvatarImage
              src={postDetails.author.profileUrl ?? undefined}
              alt={postDetails.author.name}
              className="object-cover"
            />
            <AvatarFallback>
              {genFallback(postDetails.author.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col ml-4">
            <p className="font-medium text-lg">{postDetails.author.name}</p>
            <p className="text-muted-foreground text-sm">
              {postDetails.minToRead} min read &middot;{" "}
              {new Date(postDetails.publishedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {postDetails.replyToPostId && (
          <Link href={`/app/posts/${postDetails.replyToPostId}`}>
            Show previous post
          </Link>
        )}
      </div>
    </div>
  );
}
