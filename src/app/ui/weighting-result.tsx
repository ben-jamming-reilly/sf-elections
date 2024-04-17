import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { weightingLabelForValue } from "~/data/answers";

export const WeightingResult = ({ value }: { value: number }) => {
  return (
    <p
      className={clsx(
        "relative z-20 w-[260px] max-w-full rounded-[100px] border-2  border-black bg-[#A8F5FF] py-4 text-center  text-[22px] leading-[26px] text-black outline-offset-4 outline-black transition-colors focus-visible:outline-2",
      )}
    >
      {weightingLabelForValue(value)}
    </p>
  );
};
