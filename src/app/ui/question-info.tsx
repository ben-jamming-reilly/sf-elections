import clsx from "clsx";

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
          "w-full appearance-none rounded-md py-2 text-left text-base",
        )}
      >
        <summary className="cursor-pointer text-[18px] leading-[21px] underline underline-offset-2">
          Zusätzliche Information:
        </summary>
        <p className="mt-3">
          {disclosure && (
            <>
              <strong>{disclosure}</strong> <br />
            </>
          )}
          {text}
        </p>
      </details>
    </>
  );
};
