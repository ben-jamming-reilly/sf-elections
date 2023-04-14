import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { optionLabelForValue, wahlrechtLabelForValue } from "~/data/answers";

export const WahlrechtResult = ({ value }: { value: number }) => {
  return (
    <p
      className={clsx(
        "border-2 text-center px-3 py-2  inline-flex items-center justify-center selection:text-white gap-2",
        value === -10 && "border-red-500 text-red-500 selection:bg-red-500",
        value === -9 &&
          "border-green-400 text-green-400 selection:bg-green-400",
        value === -8 &&
          "border-green-500 text-green-500 selection:bg-green-500",
        value === -7 && "border-green-600 text-green-600 selection:bg-green-600"
      )}
    >
      {value === -10 && (
        <HandThumbDownIcon className="h-7 w-7 p-1 border-red-500 stroke-2 border-2 rounded-full" />
      )}
      {value === -9 && (
        <span className="h-7 w-7 border-2 rounded-full border-green-400">
          10
        </span>
      )}
      {value === -8 && (
        <span className="h-7 w-7 border-2 rounded-full border-green-500">
          5
        </span>
      )}
      {value === -7 && (
        <HandThumbUpIcon className="h-7 w-7 p-1 border-green-600 stroke-2 border-2 rounded-full" />
      )}
      {wahlrechtLabelForValue(value)}
    </p>
  );
};
