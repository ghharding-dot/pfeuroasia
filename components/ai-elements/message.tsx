"use client";

import type { ComponentProps } from "react";
import { memo } from "react";
import { Streamdown } from "streamdown";

export type MessageResponseProps = ComponentProps<typeof Streamdown>;

// AI Elements-compatible MessageResponse. We intentionally keep only the core
// Streamdown renderer here: the Malaysia Adviser returns prose/bullets and does not
// need code, Mermaid, maths or other heavyweight plugins.
export const MessageResponse = memo(
  ({ className, ...props }: MessageResponseProps) => (
    <Streamdown
      className={["size-full", className].filter(Boolean).join(" ")}
      {...props}
    />
  ),
  (previous, next) =>
    previous.children === next.children && previous.isAnimating === next.isAnimating,
);

MessageResponse.displayName = "MessageResponse";
