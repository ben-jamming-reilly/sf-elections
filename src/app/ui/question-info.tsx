import clsx from "clsx";

export const QuestionInfo = ({
  text,
  open,
}: {
  text: string;
  open?: boolean;
}) => {
  return (
    <>
      <details
        open={open}
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
