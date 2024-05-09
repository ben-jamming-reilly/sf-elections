import { YesNoResult } from "./yes-no-result";
import { QuestionType, QuestionTypes } from "../utils.index";

export const OptionResult = ({
  className,
  type,
  hideIcon,
  hideLabel,
  value,
}: {
  className?: string;
  hideIcon?: boolean;
  hideLabel?: boolean;
  type: string;
  value: number;
}) => {
  return (
    <>
      {type === QuestionTypes.YesNo && (
        <YesNoResult
          className={className}
          hideLabel={hideLabel}
          hideIcon={hideIcon}
          value={value}
        />
      )}
    </>
  );
};
