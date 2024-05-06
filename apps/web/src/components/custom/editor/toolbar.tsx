import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import type { Editor } from "@tiptap/react";

export default function EditorToolbar({
  editor,
  newChangeOccured,
  setNewChangeOccured,
}: {
  editor: Editor;
  newChangeOccured: boolean;
  setNewChangeOccured: (value: boolean) => void;
}) {
  return (
    <div
      className={cn(
        "border flex items-center justify-between px-6 py-2 supports-backdrop-blur:bg-background/60 sticky left-0 top-20 z-50 w-full gap-2 overflow-x-auto rounded-t-lg border-b border-b-border bg-background/95 backdrop-blur",
      )}
    >
      <div className="flex gap-2 items-center">
        {/*
      <div className="flex gap-2 items-center"></div>
      <Separator orientation="vertical" className="h-8" />
      <div className="flex gap-2 items-center"></div>
      <Separator orientation="vertical" className="h-8" />
      */}
        <div className="flex gap-2 items-center">
          <ToggleGroup type="multiple">
            <ToggleGroupItem
              value="bold"
              aria-label="Toggle bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
            >
              <Icons.bold className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="italic"
              aria-label="Toggle italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
            >
              <Icons.italic className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="underline"
              aria-label="Toggle underline"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
            >
              <Icons.underline className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="strikethrough"
              aria-label="Toggle strikethrough"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
            >
              <Icons.strikethrough className="h-5 w-5" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <Separator orientation="vertical" className="h-8" />
        <div className="flex items-center gap-2">
          <ToggleGroup type="multiple">
            <ToggleGroupItem
              value="Heading 1"
              aria-label="Toggle Heading 1"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              disabled={
                !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              <Icons.heading1 className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Heading 2"
              aria-label="Toggle Heading 2"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              disabled={
                !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              <Icons.heading2 className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Heading 3"
              aria-label="Toggle Heading 3"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              disabled={
                !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              <Icons.heading3 className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Heading 4"
              aria-label="Toggle Heading 4"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 4 }).run()
              }
              disabled={
                !editor.can().chain().focus().toggleHeading({ level: 4 }).run()
              }
            >
              <Icons.heading4 className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Heading 5"
              aria-label="Toggle Heading 5"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 5 }).run()
              }
              disabled={
                !editor.can().chain().focus().toggleHeading({ level: 5 }).run()
              }
            >
              <Icons.heading5 className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Heading 6"
              aria-label="Toggle Heading 6"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 6 }).run()
              }
              disabled={
                !editor.can().chain().focus().toggleHeading({ level: 6 }).run()
              }
            >
              <Icons.heading6 className="h-5 w-5" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <Separator orientation="vertical" className="h-8" />
        <div className="flex items-center gap-2">
          <ToggleGroup type="multiple">
            <ToggleGroupItem
              value="Bulleted list"
              aria-label="Toggle Bulleted list"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              disabled={!editor.can().chain().focus().toggleBulletList().run()}
            >
              <Icons.bulletedList className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Bulleted list"
              aria-label="Toggle Bulleted list"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              disabled={!editor.can().chain().focus().toggleOrderedList().run()}
            >
              <Icons.orderedList className="h-5 w-5" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <Separator orientation="vertical" className="h-8" />
        <div className="flex items-center gap-2">
          <ToggleGroup type="multiple">
            <ToggleGroupItem
              value="Indent Left"
              aria-label="Toggle Indent Left"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
            >
              <Icons.leftAlign className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Indent Center"
              aria-label="Toggle Indent Center"
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
            >
              <Icons.centerAlign className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Indent Right"
              aria-label="Toggle Indent Right"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
            >
              <Icons.centerAlign className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Indent Justify"
              aria-label="Toggle Indent Justify"
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
            >
              <Icons.justifyAlign className="h-5 w-5" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <div className="flex items-center">
        <Button
          variant="ghost"
          className="px-3"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Icons.undo className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          className="px-3"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Icons.redo className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
