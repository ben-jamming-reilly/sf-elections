"use client";

import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";
import { ShareIcon } from "@heroicons/react/24/outline";
import { Button } from "./button";
import { AnimatePresence, motion } from "framer-motion";

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
      className="relative"
      onClick={async (e) => {
        try {
          const blob = await fetch("/shareable-wide.png").then((r) => r.blob());
          const data: ShareData = {
            title,
            text,
            url: window.location.href,
            files: [
              new File([blob], "shareable-wide.png", {
                type: "image/png",
              }),
            ],
          };

          if (navigator.canShare && navigator.canShare(data)) {
            await navigator.share(data);
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
        <ShareIcon aria-hidden="true" className="h-4 w-4 stroke-2" />
        {children}
      </div>
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{
              opacity: 0,
              y: 10,
              x: "-50%",
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: "-50%",
            }}
            exit={{
              opacity: 0,
              y: 10,
              x: "-50%",
            }}
            className="absolute left-1/2 top-[calc(100%+10px)] w-fit rounded-sm bg-black px-2 py-1 text-white"
          >
            Link&nbsp;kopiert
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
};
