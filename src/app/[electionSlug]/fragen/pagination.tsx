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
  const activeIndex = questionsWithAnswers.findIndex(
    (question) => question.id === activeQuestion.id,
  );

  return (
    <aside
      aria-label={`Du bist bei Frage ${activeIndex + 1}. von ${questionsWithAnswers.length}`}
      className={clsx(
        "flex flex-row flex-wrap justify-center gap-x-2 gap-y-1 md:justify-end md:gap-x-1",
        className,
      )}
    >
      {questionsWithAnswers.map((question, index) => (
        <span
          key={`question-shortcut-${question.id}`}
          className={clsx(
            "inline-flex h-[2em] w-[2em] select-none items-center justify-center rounded-full border-2 transition-all",
            activeQuestion.id === question.id
              ? "border-black"
              : "border-transparent",
          )}
          // onClick={() => setActiveIndex(index)}
        >
          {index + 1}
        </span>
      ))}
    </aside>
  );
};

export { Pagination };
