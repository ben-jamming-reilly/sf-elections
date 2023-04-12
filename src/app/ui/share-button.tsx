"use client";

import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";
import { ShareIcon } from "@heroicons/react/24/outline";

export const ShareButton = ({ children }: { children: ReactNode }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 750);

      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <button
      className="border-brand-purple text-brand-purple px-3 py-2 hover:bg-brand-purple hover:text-white relative border active:scale-95 transition-all items-center justify-center rounded-md focus-visible:outline-brand outline-offset-2 selection:text-white selection:bg-brand-purple selection:hover:bg-white selection:hover:bg-brand-purple"
      onClick={async (e) => {
        try {
          if (navigator.share) {
            await navigator.share({
              title: "SPÖ Vorstandswahl-Kabine",
              text: "Finde heraus welche:r Kandidat:in für die SPÖ Vorstandswahl 2023 am Besten zu dir passt.",
              url: window.location.href,
            });
            setCopied(true);
          } else {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
          }
        } catch (e) {
          console.error(e);
        }
      }}
    >
      <div
        className={clsx(
          "transition-opacity items-center flex justify-center gap-2",
          copied ? "invisible opacity-0" : "visible opacity-100"
        )}
      >
        <ShareIcon className="h-4 w-4 stroke-2" />
        {children}
      </div>

      <span
        className={clsx(
          "absolute z-10 top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 transition-opacity",
          copied ? "opacity-100" : "opacity-0"
        )}
      >
        ✊
      </span>
    </button>
  );
};
