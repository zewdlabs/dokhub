"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { BubbleMenu as BubbleMenuConfig } from "@tiptap/extension-bubble-menu";
import EditorToolbar from "./editor/toolbar";
import { useMutation } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { buttonVariants } from "../ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Icons } from "@/components/icons";

export default function Tiptap({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) {
  const [newChangesMade, setNewChangesMade] = useState(false);
  const [editorState, setEditorState] = useState(content);
  const [titleState, setTitleState] = useState(title);

  // NOTE: I don't think we need this since we save the state automatically

  // useEffect(() => {
  //   if (!newChangesMade) return;
  //   function beforeUnload(e: BeforeUnloadEvent) {
  //     e.preventDefault();
  //   }
  //
  //   window.addEventListener("beforeunload", beforeUnload, { capture: true });
  //
  //   return () => {
  //     window.removeEventListener("beforeunload", beforeUnload);
  //   };
  // }, [newChangesMade]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      TextAlign.configure({
        defaultAlignment: "left",
        alignments: ["left", "center", "right", "justify"],
        types: ["heading", "paragraph"],
      }),
      Underline.configure(),
      BubbleMenuConfig.configure({
        tippyOptions: {
          duration: 200,
        },
      }),
      Image.configure(),
      Link.configure({
        protocols: ["http", "https", "mailto"],
        openOnClick: "whenNotEditable",
        HTMLAttributes: {
          class: cn(
            buttonVariants({ variant: "link", className: "px-0 py-0" }),
          ),
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      setNewChangesMade((state) => !state && true);
      setEditorState(editor.getHTML());
    },
    content: editorState,
    autofocus: true,
  });

  const saveNote = useMutation({
    mutationFn: async () => {
      console.log(
        "saving note for id",
        id,
        "id matches",
        id === "clvwfwrup0001102ke9cu02n9",
        "content changed",
        content !== editorState,
      );

      console.log("saving note", editorState);
      const response = await fetch(`http://localhost:4231/api/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleState,
          content: editorState,
        }),
      });

      if (!response.ok) {
        throw new Error("An error occurred while saving the note");
      }

      const data = await response.json();
      console.log("data after request", data);
      return data;
    },
  });

  const debouncedEditorState = useDebounce(editorState, 500);
  useEffect(() => {
    if (debouncedEditorState === "") return;
    saveNote.mutate(undefined, {
      onSuccess: (data) => {
        setNewChangesMade(false);
        console.log("success update!", data);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }, [debouncedEditorState]);

  return (
    <div className={cn("relative container")}>
      {editor && (
        <EditorToolbar
          editor={editor}
          newChangeOccured={newChangesMade}
          setNewChangeOccured={setNewChangesMade}
        />
      )}
      {editor && (
        <BubbleMenu editor={editor}>
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
          </ToggleGroup>
        </BubbleMenu>
      )}
      <EditorContent
        editor={editor}
        className="px-8 prose max-w-none md:px-24 py-12 min-h-[70vh] border border-t-0"
      />
    </div>
  );
}
