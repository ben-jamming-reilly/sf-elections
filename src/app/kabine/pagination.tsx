import clsx from "clsx";
import { VoterAnsweredQuestion } from "~/stores/questionnaire-store-voter";

const isQuestionAnswered = (question: VoterAnsweredQuestion) => {
  return (
    (question.option !== null && question.weighting !== null) ||
    question.skipped
  );
};

const Pagination = ({
  questionsWithAnswers,
  activeQuestion,
  setActiveIndex,
  className,
}: {
  questionsWithAnswers: VoterAnsweredQuestion[];
  activeQuestion: VoterAnsweredQuestion;
  setActiveIndex: (index: number) => void;
  className?: string;
}) => {
  return (
    <ul
      className={clsx(
        "flex flex-row flex-wrap gap-x-2 gap-y-1 md:gap-x-1 justify-center md:justify-end",
        className
      )}
    >
      {questionsWithAnswers.map((question, index) => (
        <li key={`question-shortcut-${question.id}`}>
          <span
            className={clsx(
              "inline-flex justify-center select-none items-center w-[2em] h-[2em] transition-all rounded-full border-2",
              activeQuestion.id === question.id
                ? "border-black"
                : "border-transparent"
            )}
            // onClick={() => setActiveIndex(index)}
          >
            {index + 1}
          </span>
        </li>
      ))}
    </ul>
  );
};

export { Pagination };
