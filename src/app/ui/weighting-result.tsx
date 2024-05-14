import clsx from "clsx";
import { weightingLabelForValue } from "~/data/answers";

export const WeightingResult = ({ value }: { value: number }) => {
  return (
    <p
      className={clsx(
        "relative z-20 inline-flex w-[260px] max-w-full  items-center justify-center rounded-[100px] border-2 border-black bg-[#A8F5FF] px-1 py-2 text-center text-[1.125rem] leading-[1.375rem] text-black outline-offset-4 outline-black transition-colors focus-visible:outline-2 md:py-4 md:text-[1.375rem] md:leading-[26px]",
      )}
    >
      {weightingLabelForValue(value)}
    </p>
  );
};
