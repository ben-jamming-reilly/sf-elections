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
  className: string;
}) => {
  return (
    <ul
      className={clsx(
        "flex flex-row flex-wrap gap-1 md:gap-1 justify-center",
        className
      )}
    >
      {questionsWithAnswers.map((question, index) => (
        <li key={`question-shortcut-${question.id}`}>
          <button
            className={clsx(
              "inline-flex justify-center items-center w-[2em] h-[2em] transition-all underline-offset-2 hover:border-brand hover:underline border",
              isQuestionAnswered(question) &&
                !question.skipped &&
                "bg-primary-100 hover:bg-primary-200 border-primary-100",
              isQuestionAnswered(question) &&
                question.skipped &&
                "bg-surface-400 border-surface-600 hover:border-primary-100",
              activeQuestion.id === question.id && "underline scale-[0.875]",
              !isQuestionAnswered(question) &&
                activeQuestion.id === question.id &&
                "border-primary-100",
              !isQuestionAnswered(question) &&
                activeQuestion.id !== question.id &&
                "border-surface-400"
            )}
            onClick={() => setActiveIndex(index)}
          >
            {index + 1}
          </button>
        </li>
      ))}
    </ul>
  );
};

export { Pagination };
