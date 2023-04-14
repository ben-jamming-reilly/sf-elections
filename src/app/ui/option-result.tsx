import { QuestionType } from "@prisma/client";
import { YesNoResult } from "./yes-no-result";
import { RangeResult } from "./range-result";
import { WahlrechtResult } from "./wahrecht-result";

export const OptionResult = ({
  type,
  value,
}: {
  type: QuestionType;
  value: number;
}) => {
  return (
    <>
      {type === "YesNo" && <YesNoResult value={value} />}
      {type === "Range" && <RangeResult value={value} />}
      {type === "Wahlrecht" && <WahlrechtResult value={value} />}
    </>
  );
};
