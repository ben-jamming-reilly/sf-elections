"use client";

import clsx from "clsx";
import useMediaQuery from "~/hooks/useMediaQuery";

export const QuestionInfo = ({
  text,
  open,
}: {
  text: string;
  open?: boolean;
}) => {
  // TODO: change open bbased on breakpoint
  const isMobile = useMediaQuery("(max-width: 640px)");
  return (
    <>
      <details
        open={isMobile}
        className={clsx(
          "py-2 px-3 w-full bg-neutral-200 rounded-md dark:bg-surface-300 text-base appearance-none text-left"
        )}
      >
        <summary className="cursor-pointer">Zusätzliche Information</summary>
        <p className="mt-3 px-3">{text}</p>
      </details>
    </>
  );
};
