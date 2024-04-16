"use client";

import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";
import { ShareIcon } from "@heroicons/react/24/outline";
import { Button } from "./button";

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
    <Button
      as="button"
      variant="secondary"
      roundness="small"
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
        )}
      >
        <ShareIcon className="h-4 w-4 stroke-2" />
        {children}
      </div>
    </Button>
  );
};
