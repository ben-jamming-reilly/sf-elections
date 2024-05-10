import clsx from "clsx";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { GlossaredText } from "./glossared-text";
import { GlossarEntry } from "@prisma/client";

export const QuestionInfo = ({
  text,
  textSimpleLanguage,
  open,
  disclosure,
  glossarEntries,
}: {
  text: string;
  textSimpleLanguage?: string | null;
  open?: boolean;
  disclosure?: string | null;
  glossarEntries: GlossarEntry[];
}) => {
  return (
    <>
      <details
        open={open}
        className={clsx(
          "group w-full appearance-none rounded-md py-2 text-left text-base",
        )}
      >
        <summary className="flex items-center gap-3 text-[18px] leading-[21px] underline underline-offset-4 outline-2 outline-offset-4 outline-black">
          Mehr Infos:{" "}
          <ChevronRightIcon className="w-6 transition-all group-open:rotate-90" />
        </summary>
        <div className="flex flex-col gap-5">
          <p className="mt-3">
            {disclosure && (
              <>
                <strong>{disclosure}</strong> <br />
              </>
            )}
            <GlossaredText glossarEntries={glossarEntries} text={text} />
          </p>
          {textSimpleLanguage && (
            <>
              <hr />
              <p>
                <strong>Erklärung in einfacher Sprache:</strong> <br />
                <GlossaredText glossarEntries={glossarEntries} text={textSimpleLanguage} />
              </p>
            </>
          )}
        </div>
      </details>
    </>
  );
};
