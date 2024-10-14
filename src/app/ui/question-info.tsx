import clsx from "clsx";
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
      <div
        // open={open}
        className={clsx(
          "group w-full appearance-none rounded-md py-2 text-left text-base",
        )}
      >
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
                <strong>Explanation in Simple Language:</strong> <br />
                <GlossaredText
                  glossarEntries={glossarEntries}
                  text={textSimpleLanguage}
                />
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};
