"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "./editor/toolbar";
import { useMutation } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";

export default function Tiptap() {
  const [editorState, setEditorState] = useState(`<h1>Hi there</h1>`);

  const editor = useEditor({
    extensions: [StarterKit.configure()],
    autofocus: true,
    onUpdate: ({ editor }) => setEditorState(editor.getHTML()),
    content: editorState,
  });

  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify({
          editorState,
        }),
      });

      if (!response.ok) {
        throw new Error("An error occurred while saving the note");
      }

      return response.json();
    },
  });

  const debouncedEditorState = useDebounce(editorState, 500);
  useEffect(() => {
    if (debouncedEditorState === "") return;
    saveNote.mutate(undefined, {
      onSuccess: (data) => {
        console.log("success update!", data);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }, [debouncedEditorState]);

  return (
    <div className={cn("relative md:container")}>
      {editor && <EditorToolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}
