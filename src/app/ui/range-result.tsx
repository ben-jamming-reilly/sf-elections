import {
  ArrowDownIcon,
  ArrowDownLeftIcon,
  ArrowUpIcon,
  ArrowUpLeftIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { optionLabelForValue } from "~/data/answers";

export const RangeResult = ({ value }: { value: number }) => {
  return (
    <p
      className={clsx(
        "border-2 text-center px-3 py-2 inline-flex items-center justify-center selection:text-white gap-3",
        value === -2 && "border-red-500 text-red-500 selection:bg-red-500",
        value === -1 && "border-red-400 text-red-400 selection:bg-red-400",
        value === 1 && "border-green-400 text-green-400 selection:bg-green-400",
        value === 2 && "border-green-500 text-green-500 selection:bg-green-500"
      )}
    >
      {value === -2 && (
        <ArrowDownIcon className="h-7 w-7 p-1 border-red-500 stroke-2 border-2 rounded-full" />
      )}
      {value === -1 && (
        <ArrowDownLeftIcon className="h-7 w-7 p-1 border-red-400 stroke-2 border-2 rounded-full" />
      )}
      {value === 1 && (
        <ArrowUpLeftIcon className="h-7 w-7 p-1 border-green-400 stroke-2 border-2 rounded-full" />
      )}
      {value === 2 && (
        <ArrowUpIcon className="h-7 w-7 p-1 border-green-500 stroke-2 border-2 rounded-full" />
      )}
      Ich stimme {optionLabelForValue(value)}
    </p>
  );
};
