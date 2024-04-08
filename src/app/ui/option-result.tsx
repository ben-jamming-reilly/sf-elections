import { YesNoResult } from "./yes-no-result";
import { QuestionType, QuestionTypes } from "../utils.index";

export const OptionResult = ({
  type,
  value,
}: {
  type: string;
  value: number;
}) => {
  return <>{type === QuestionTypes.YesNo && <YesNoResult value={value} />}</>;
};
