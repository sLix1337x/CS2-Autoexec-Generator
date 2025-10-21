"use client";
import React from "react";
import { cn } from "@/lib/utils";

/**
 * DotBackground
 * A decorative dotted grid background adapted from Aceternity UI.
 * It renders behind page content without affecting layout sizing or interactions.
 */
export function DotBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      {/* Dotted grid */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#3a3a3a_1px,transparent_1px)]",
          "opacity-70"
        )}
      />
      {/* Optional radial fade towards the edges to soften the grid */}
      <div className="absolute inset-0 bg-[#1B1B1B] dark:bg-[#1B1B1B] [mask-image:radial-gradient(ellipse_at_center,transparent_35%,black)]" />
    </div>
  );
}

export default DotBackground;