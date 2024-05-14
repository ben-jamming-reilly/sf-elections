import clsx from "clsx";
import { weightingLabelForValue } from "~/data/answers";

export const WeightingResult = ({ value }: { value: number }) => {
  return (
    <div
      className={clsx(
        "relative z-20 flex w-[260px] max-w-full flex-shrink items-center justify-center rounded-[100px] border-2 border-black  bg-[#A8F5FF] px-1 py-3 text-center text-[1.125rem] leading-[1.375rem] text-black outline-offset-4 outline-black transition-colors focus-visible:outline-2 md:text-[1.375rem] md:leading-[1.625rem]",
      )}
    >
      <span aria-hidden="true">{weightingLabelForValue(value)}</span>
    </div>
  );
};
