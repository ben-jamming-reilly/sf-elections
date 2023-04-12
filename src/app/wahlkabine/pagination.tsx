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
                "bg-brand text-white border-brand",
              isQuestionAnswered(question) &&
                question.skipped &&
                "bg-neutral-200 text-neutral-500 border-neutral-200 hover:border-neutral-200",
              activeQuestion.id === question.id && "underline scale-[0.85]",
              !isQuestionAnswered(question) &&
                activeQuestion.id === question.id &&
                "border-brand bg-transparent hover:text-brand text-brand",
              activeQuestion.id !== question.id &&
                !isQuestionAnswered(question) &&
                "bg-red-50/50 hover:text-brand"
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
