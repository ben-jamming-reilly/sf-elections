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
        "text-center px-3 py-2 inline-flex items-center justify-center gap-3 rounded-md text-lg font-bold",
        value === -10 && "bg-red-500 selection:bg-red-500",
        value === -9 && "bg-green-400 selection:bg-green-400",
        value === -8 && "bg-green-500 selection:bg-green-500",
        value === -7 && "bg-green-600 selection:bg-green-600"
      )}
    >
      {value === -10 && (
        <HandThumbDownIcon className="h-7 w-7 p-1 stroke-2 border-2 border-white rounded-full" />
      )}
      {value === -9 && (
        <span className="h-7 w-7 border-2 border-white rounded-full text-base">
          10
        </span>
      )}
      {value === -8 && (
        <span className="h-7 w-7 border-2 border-white rounded-full text-base">
          5
        </span>
      )}
      {value === -7 && (
        <HandThumbUpIcon className="h-7 w-7 p-1 stroke-2 border-2 border-white rounded-full" />
      )}
      {wahlrechtLabelForValue(value)}
    </p>
  );
};
