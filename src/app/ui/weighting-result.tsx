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
        "z-20 rounded-[100px] w-[260px] transition-colors border-black border-2  text-black relative text-[22px] leading-[26px]  max-w-full focus-visible:outline-2 outline-black outline-offset-4 text-center py-4 bg-[#A8F5FF]"
      )}
    >
      {weightingLabelForValue(value)}
    </p>
  );
};
