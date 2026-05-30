import { afterEach, test, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolCallBadge } from "../ToolCallBadge";
import type { ToolInvocation } from "ai";

afterEach(() => cleanup());

function makeInvocation(
  toolName: string,
  args: Record<string, any>,
  state: "call" | "result" = "result"
): ToolInvocation {
  return state === "result"
    ? { toolCallId: "id", toolName, args, state: "result", result: "ok" }
    : { toolCallId: "id", toolName, args, state: "call" };
}

test("str_replace_editor create", () => {
  render(<ToolCallBadge toolInvocation={makeInvocation("str_replace_editor", { command: "create", path: "/App.jsx" })} />);
  expect(screen.getByText("Creating /App.jsx")).toBeDefined();
});

test("str_replace_editor str_replace", () => {
  render(<ToolCallBadge toolInvocation={makeInvocation("str_replace_editor", { command: "str_replace", path: "/components/Card.jsx" })} />);
  expect(screen.getByText("Editing /components/Card.jsx")).toBeDefined();
});

test("str_replace_editor insert", () => {
  render(<ToolCallBadge toolInvocation={makeInvocation("str_replace_editor", { command: "insert", path: "/App.jsx" })} />);
  expect(screen.getByText("Editing /App.jsx")).toBeDefined();
});

test("str_replace_editor view", () => {
  render(<ToolCallBadge toolInvocation={makeInvocation("str_replace_editor", { command: "view", path: "/App.jsx" })} />);
  expect(screen.getByText("Viewing /App.jsx")).toBeDefined();
});

test("str_replace_editor undo_edit", () => {
  render(<ToolCallBadge toolInvocation={makeInvocation("str_replace_editor", { command: "undo_edit", path: "/App.jsx" })} />);
  expect(screen.getByText("Undoing edit to /App.jsx")).toBeDefined();
});

test("file_manager rename", () => {
  render(<ToolCallBadge toolInvocation={makeInvocation("file_manager", { command: "rename", path: "/old.jsx" })} />);
  expect(screen.getByText("Renaming /old.jsx")).toBeDefined();
});

test("file_manager delete", () => {
  render(<ToolCallBadge toolInvocation={makeInvocation("file_manager", { command: "delete", path: "/old.jsx" })} />);
  expect(screen.getByText("Deleting /old.jsx")).toBeDefined();
});

test("unknown tool falls back to tool name", () => {
  render(<ToolCallBadge toolInvocation={makeInvocation("some_other_tool", {})} />);
  expect(screen.getByText("some_other_tool")).toBeDefined();
});

test("result state shows green dot, no spinner", () => {
  render(<ToolCallBadge toolInvocation={makeInvocation("str_replace_editor", { command: "create", path: "/App.jsx" }, "result")} />);
  expect(screen.getByTestId("done-indicator")).toBeDefined();
  expect(screen.queryByTestId("loading-indicator")).toBeNull();
});

test("call state shows spinner, no green dot", () => {
  render(<ToolCallBadge toolInvocation={makeInvocation("str_replace_editor", { command: "create", path: "/App.jsx" }, "call")} />);
  expect(screen.getByTestId("loading-indicator")).toBeDefined();
  expect(screen.queryByTestId("done-indicator")).toBeNull();
});
