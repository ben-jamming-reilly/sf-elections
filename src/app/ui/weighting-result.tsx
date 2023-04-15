import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { weightingLabelForValue } from "~/data/answers";

const IconClasses =
  "h-8 w-8 p-1 stroke-2 bg-surface-300 rounded-full flex-shrink-0";

export const WeightingResult = ({ value }: { value: number }) => {
  return (
    <p
      className={clsx(
        "text-center px-3 py-2 selection:text-white inline-flex items-center justify-center text-lg font-medium gap-2"
      )}
    >
      {value === 0 && <ChevronDoubleDownIcon className={IconClasses} />}
      {value === 1 && <ChevronDownIcon className={IconClasses} />}
      {value === 2 && <ChevronUpIcon className={IconClasses} />}
      {value === 3 && <ChevronDoubleUpIcon className={IconClasses} />}
      Ist mir {weightingLabelForValue(value)}
    </p>
  );
};
