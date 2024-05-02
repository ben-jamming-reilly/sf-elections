import { YesNoResult } from "./yes-no-result";
import { QuestionType, QuestionTypes } from "../utils.index";

export const OptionResult = ({
  className,
  type,
  hideIcon,
  value,
}: {
  className?: string;
  hideIcon?: boolean;
  type: string;
  value: number;
}) => {
  return (
    <>
      {type === QuestionTypes.YesNo && (
        <YesNoResult className={className} hideIcon={hideIcon} value={value} />
      )}
    </>
  );
};
