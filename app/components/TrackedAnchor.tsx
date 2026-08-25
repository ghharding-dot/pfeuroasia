"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent } from "../lib/analytics";

type TrackedAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  eventParameters?: Record<string, string | number | boolean>;
  children: ReactNode;
};

export function TrackedAnchor({
  eventName,
  eventParameters,
  children,
  onClick,
  ...props
}: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventParameters);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
