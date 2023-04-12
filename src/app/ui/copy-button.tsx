"use client";

import { ReactNode } from "react";

export const CopyCurrentUrl = () => {
  return (
    <button
      className="bg-brand-purple text-white px-3 py-2 rounded-md active:scale-90 transition-all active:bg-brand/80 hover:bg-brand/90"
      onClick={(e) => {
        navigator.clipboard.writeText(window.location.href);
      }}
    >
      Ergebnis Seite Teilen
    </button>
  );
};
