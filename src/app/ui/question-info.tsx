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
          "py-2 w-full rounded-md text-base appearance-none text-left"
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
