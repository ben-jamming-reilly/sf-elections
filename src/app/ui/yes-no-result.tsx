import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { optionLabelForYesNoValue } from "../../data/answers";
import clsx from "clsx";
export const YesNoResult = ({ value }: { value: number }) => {
  return (
    <p
      className={clsx(
        "text-center px-3 py-2 border-2 inline-flex items-center justify-center text-lg font-medium gap-3",
        value === 3 &&
          "border-green-500/80 text-green-500/80 selection:bg-green-500/80",
        value === -3 &&
          "border-red-500/80 text-red-500/80 selection:bg-red-500/80"
      )}
    >
      {value === 3 && (
        <HandThumbUpIcon className="h-8 w-8 p-1 border-green-500/80 stroke-[2] border-2 rounded-full" />
      )}
      {value === -3 && (
        <HandThumbDownIcon className="h-8 w-8 p-1 border-red-500/80 stroke-[2] border-2 rounded-full" />
      )}
      {optionLabelForYesNoValue(value)}
    </p>
  );
};
