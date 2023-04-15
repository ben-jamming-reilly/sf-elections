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
        "text-center px-3 py-2 inline-flex items-center justify-center gap-3 rounded-md text-lg font-bold",
        value === -2 && "bg-red-600/80 selection:bg-red-500",
        value === -1 && "bg-red-400/80 selection:bg-red-400",
        value === 1 && "bg-green-400/80 selection:bg-green-400",
        value === 2 && "bg-green-600/80 selection:bg-green-500"
      )}
    >
      {value === -2 && (
        <ArrowDownIcon className="h-7 w-7 p-1 stroke-2 border-2 border-white rounded-full" />
      )}
      {value === -1 && (
        <ArrowDownLeftIcon className="h-7 w-7 p-1 stroke-2 border-2 border-white rounded-full" />
      )}
      {value === 1 && (
        <ArrowUpLeftIcon className="h-7 w-7 p-1 stroke-2 border-2 border-white rounded-full" />
      )}
      {value === 2 && (
        <ArrowUpIcon className="h-7 w-7 p-1 stroke-2 border-2 border-white rounded-full" />
      )}
      Ich stimme {optionLabelForValue(value)}
    </p>
  );
};
