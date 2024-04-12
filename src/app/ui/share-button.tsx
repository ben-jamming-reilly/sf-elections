"use client";

import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";
import { ShareIcon } from "@heroicons/react/24/outline";

export const ShareButton = ({
  children,
  title,
  text,
}: {
  children: ReactNode;
  title: string;
  text?: string;
}) => {
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
      className="relative items-center justify-center rounded-md border border-brand px-3 py-2 text-brand outline-offset-2 transition-all selection:bg-brand selection:text-white focus-visible:outline-brand  active:scale-95 notouch:hover:bg-brand notouch:hover:text-white "
      onClick={async (e) => {
        try {
          if (navigator.share) {
            await navigator.share({
              title,
              text,
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
          "flex items-center justify-center gap-2 transition-opacity",
          copied ? "invisible opacity-0" : "visible opacity-100",
        )}
      >
        <ShareIcon className="h-4 w-4 stroke-2" />
        {children}
      </div>

      <span
        className={clsx(
          "absolute left-1/2 top-1/2 z-10 -translate-x-1/2  -translate-y-1/2 transition-opacity",
          copied ? "opacity-100" : "opacity-0",
        )}
      >
        ✊
      </span>
    </button>
  );
};
