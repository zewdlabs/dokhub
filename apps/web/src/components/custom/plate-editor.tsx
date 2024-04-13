"use client";

import React, { useRef } from "react";
import { cn } from "@udecode/cn";
import { CommentsProvider } from "@udecode/plate-comments";
import { Plate } from "@udecode/plate-common";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { commentsUsers, myUserId } from "@/lib/plate/comments";
import { MENTIONABLES } from "@/lib/plate/mentionables";
import { ELEMENT_H1 } from "@udecode/plate-heading";
import { plugins } from "@/lib/plate/plugins";
import { CommentsPopover } from "@/components/plate-ui/comments-popover";
import { CursorOverlay } from "@/components/plate-ui/cursor-overlay";
import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { MentionCombobox } from "@/components/plate-ui/mention-combobox";
import { TooltipProvider } from "../plate-ui/tooltip";

export default function PlateEditor() {
  const containerRef = useRef(null);

  const initialValue = [
    {
      id: "1",
      type: ELEMENT_H1,
      children: [{ text: "Start with a title" }],
    },
  ];

  return (
    <TooltipProvider delayDuration={200}>
      <DndProvider backend={HTML5Backend}>
        <CommentsProvider users={commentsUsers} myUserId={myUserId}>
          <Plate plugins={plugins} initialValue={initialValue}>
            <div
              ref={containerRef}
              className={cn(
                "relative md:container",
                // Block selection
                "[&_.slate-start-area-left]:!w-16 [&_.slate-start-area-right]:!w-16 [&_.slate-start-area-top]:!h-6",
              )}
            >
              <FixedToolbar className="border">
                <FixedToolbarButtons />
              </FixedToolbar>

              <Editor
                className="px-8 md:px-24 py-12 min-h-[70vh] border border-t-0"
                autoFocus
                focusRing={false}
                variant="ghost"
                size="md"
              />

              <FloatingToolbar>
                <FloatingToolbarButtons />
              </FloatingToolbar>

              <MentionCombobox items={MENTIONABLES} />

              <CommentsPopover />

              <CursorOverlay containerRef={containerRef} />
            </div>
          </Plate>
        </CommentsProvider>
      </DndProvider>
    </TooltipProvider>
  );
}
