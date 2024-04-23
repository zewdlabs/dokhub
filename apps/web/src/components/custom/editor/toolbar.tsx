import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Editor } from "@tiptap/react";

export default function EditorToolbar({ editor }: { editor: Editor }) {
  //TODO: Use toggle instead of button component
  return (
    <div className="flex flex-wrap items-center justify-between border-b-[1px] border-border px-4 md:px-6 py-4 md:py-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          className={cn(
            "px-2 py-2 h-fit w-fit",
            editor.isActive("bold") && "bg-accent text-accent-foreground",
          )}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <Icons.bold className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "px-2 py-2 h-fit w-fit",
            editor.isActive("italic") && "bg-accent text-accent-foreground",
          )}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        >
          <Icons.italic className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "px-2 py-2 h-fit w-fit",
            editor.isActive("strike") && "bg-accent text-accent-foreground",
          )}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        >
          <Icons.strikethrough className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex items-center">
        <Button
          variant="ghost"
          className={cn(
            "px-2 py-2 h-fit w-fit",
            editor.isActive("heading", { level: 1 }) &&
              "bg-accent text-accent-foreground",
          )}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Icons.heading1 className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "px-2 py-2 h-fit w-fit",
            editor.isActive("heading", { level: 2 }) &&
              "bg-accent text-accent-foreground",
          )}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Icons.heading2 className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "px-2 py-2 h-fit w-fit",
            editor.isActive("heading", { level: 3 }) &&
              "bg-accent text-accent-foreground",
          )}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Icons.heading3 className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "px-2 py-2 h-fit w-fit",
            editor.isActive("heading", { level: 4 }) &&
              "bg-accent text-accent-foreground",
          )}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
        >
          <Icons.heading4 className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "px-2 py-2 h-fit w-fit",
            editor.isActive("heading", { level: 5 }) &&
              "bg-accent text-accent-foreground",
          )}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
        >
          <Icons.heading5 className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "px-2 py-2 h-fit w-fit",
            editor.isActive("heading", { level: 6 }) &&
              "bg-accent text-accent-foreground",
          )}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
        >
          <Icons.heading6 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
