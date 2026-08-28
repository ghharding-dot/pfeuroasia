"use client";

import { useEffect } from "react";

function targetsImage(event: Event) {
  return event.target instanceof Element && Boolean(event.target.closest("img"));
}

export function ImageProtection() {
  useEffect(() => {
    const preventImageAction = (event: Event) => {
      if (targetsImage(event)) event.preventDefault();
    };

    document.addEventListener("contextmenu", preventImageAction, true);
    document.addEventListener("dragstart", preventImageAction, true);

    return () => {
      document.removeEventListener("contextmenu", preventImageAction, true);
      document.removeEventListener("dragstart", preventImageAction, true);
    };
  }, []);

  return null;
}
