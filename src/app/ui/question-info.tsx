import clsx from "clsx";
import { GlossaredTextServer } from "./glossared-text.server";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export const QuestionInfo = ({
  text,
  open,
  disclosure,
}: {
  text: string;
  open?: boolean;
  disclosure?: string | null;
}) => {
  return (
    <>
      <details
        open={open}
        className={clsx(
          "group w-full appearance-none rounded-md py-2 text-left text-base",
        )}
      >
        <summary className="flex cursor-pointer items-center gap-3 text-[18px] leading-[21px] underline underline-offset-4 outline-2 outline-offset-4 outline-black">
          Zusätzliche Information:{" "}
          <ChevronRightIcon className="w-6 transition-all group-open:rotate-90" />
        </summary>
        <p className="mt-3">
          {disclosure && (
            <>
              <strong>{disclosure}</strong> <br />
            </>
          )}
          {/* @ts-expect-error */}
          <GlossaredTextServer text={text} />
        </p>
      </details>
    </>
  );
};
