"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { BubbleMenu as BubbleMenuConfig } from "@tiptap/extension-bubble-menu";
import EditorToolbar from "./editor/toolbar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { buttonVariants } from "../ui/button";
import { useCompletion } from "ai/react";
import { useSession } from "next-auth/react";

export default function Tiptap({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) {
  const [editorState, setEditorState] = useState(content);

  const [titleState, setTitleState] = useState(title);

  const { complete, completion } = useCompletion({
    api: "/api/completion",
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Text.extend({
        addKeyboardShortcuts() {
          return {
            "Mod-Enter": () => {
              const prompt = this.editor.getText();
              complete(prompt);
              return true;
            },
          };
        },
      }),
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
      setEditorState(editor.getHTML());
    },
    content: editorState,
    autofocus: true,
  });

  const lastCompletion = useRef("");

  useEffect(() => {
    if (!completion || !editor) return;
    const diff = completion.slice(lastCompletion.current.length);
    lastCompletion.current = completion;
    editor.commands.insertContent(diff);
  }, [completion, editor]);

  const client = useQueryClient();

  const session = useSession();

  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await fetch(`http://localhost:4231/api/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.data?.tokens.accessToken}`,
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
      return data;
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["post", id] });
    },
  });

  const debouncedEditorState = useDebounce(editorState, 500);
  useEffect(() => {
    if (debouncedEditorState === "") return;
    saveNote.mutate(undefined, {
      onSettled: (data) => {
        setTitleState(data.title);
        setEditorState(data.content);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }, [debouncedEditorState]);

  return (
    <div className={cn("relative container px-0")}>
      {editor && <EditorToolbar editor={editor} complete={complete} />}
      <EditorContent
        editor={editor}
        className="px-8 prose max-w-none md:px-24 py-12 min-h-[70vh] border border-t-0"
      />
    </div>
  );
}

// {editor && (
//   <BubbleMenu editor={editor}>
//     <ToggleGroup type="multiple">
//       <ToggleGroupItem
//         value="bold"
//         aria-label="Toggle bold"
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         disabled={!editor.can().chain().focus().toggleBold().run()}
//       >
//         <Icons.bold className="h-5 w-5" />
//       </ToggleGroupItem>
//       <ToggleGroupItem
//         value="italic"
//         aria-label="Toggle italic"
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         disabled={!editor.can().chain().focus().toggleItalic().run()}
//       >
//         <Icons.italic className="h-5 w-5" />
//       </ToggleGroupItem>
//       <ToggleGroupItem
//         value="underline"
//         aria-label="Toggle underline"
//         onClick={() => editor.chain().focus().toggleUnderline().run()}
//         disabled={!editor.can().chain().focus().toggleStrike().run()}
//       >
//         <Icons.underline className="h-5 w-5" />
//       </ToggleGroupItem>
//     </ToggleGroup>
//     <Button
//       variant="link"
//       onClick={() => editor.chain().focus().toggleUnderline().run()}
//     ></Button>
//   </BubbleMenu>
// )}
