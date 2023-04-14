import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { weightingLabelForValue } from "~/data/answers";

export const WeightingResult = ({ value }: { value: number }) => {
  return (
    <p
      className={clsx(
        "border-2 text-center px-3 py-2 selection:text-white  inline-flex items-center justify-center text-lg font-medium gap-2",
        value === 0 &&
          "border-neutral-300 text-neutral-300 selection:bg-neutral-300",
        value === 1 &&
          "border-neutral-400 text-neutral-400 selection:bg-neutral-400",
        value === 2 &&
          "border-neutral-500 text-neutral-500 selection:bg-neutral-500",
        value === 3 &&
          "border-neutral-600 text-neutral-600 selection:bg-neutral-600"
      )}
    >
      {value === 0 && (
        <ChevronDoubleLeftIcon className="h-6 w-6 p-1 border-neutral-300 stroke-2 border-2 rounded-full" />
      )}
      {value === 1 && (
        <ChevronLeftIcon className="h-6 w-6 p-1 border-neutral-400 stroke-2 border-2 rounded-full" />
      )}
      {value === 2 && (
        <ChevronRightIcon className="h-6 w-6 p-1 border-neutral-500 stroke-2 border-2 rounded-full" />
      )}
      {value === 3 && (
        <ChevronDoubleRightIcon className="h-6 w-6 p-1 border-neutral-600 stroke-2 border-2 rounded-full" />
      )}
      Ist mir {weightingLabelForValue(value)}
    </p>
  );
};
