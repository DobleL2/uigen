"use client";

import { Loader2 } from "lucide-react";
import type { ToolInvocation } from "ai";

function getLabel(toolName: string, args: Record<string, any>): string {
  const path: string = args?.path ?? "";

  if (toolName === "str_replace_editor") {
    switch (args?.command) {
      case "create":
        return `Creating ${path}`;
      case "str_replace":
        return `Editing ${path}`;
      case "insert":
        return `Editing ${path}`;
      case "view":
        return `Viewing ${path}`;
      case "undo_edit":
        return `Undoing edit to ${path}`;
    }
  }

  if (toolName === "file_manager") {
    switch (args?.command) {
      case "rename":
        return `Renaming ${path}`;
      case "delete":
        return `Deleting ${path}`;
    }
  }

  return toolName;
}

interface ToolCallBadgeProps {
  toolInvocation: ToolInvocation;
}

export function ToolCallBadge({ toolInvocation }: ToolCallBadgeProps) {
  const { toolName, args, state } = toolInvocation;
  const label = getLabel(toolName, args);
  const isDone = state === "result";

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200">
      {isDone ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500" data-testid="done-indicator" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" data-testid="loading-indicator" />
      )}
      <span className="text-neutral-700">{label}</span>
    </div>
  );
}
