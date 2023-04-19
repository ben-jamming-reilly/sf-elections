"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePrevious } from "~/hooks/usePrevious";
import { Loading } from "../ui/loading";
import { Pagination } from "./pagination";
import {
  categoryHexForLabel,
  getOptionsBasedOnType,
  weightings,
} from "~/data/answers";
import {
  VoterAnsweredQuestion,
  useVoterQuestionnaireStore,
} from "~/stores/questionnaire-store-voter";
import { QuestionCategoryLabel } from "../ui/question-category-label";
import { useHasHydrated } from "~/hooks/useHasHydrated";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    };
  },
};

const isQuestionAnswered = (question: VoterAnsweredQuestion) => {
  return (
    (question.option !== null && question.weighting !== null) ||
    question.skipped
  );
};

export const VoterQuestionnaire = ({
  questions,
}: {
  questions: VoterAnsweredQuestion[];
}) => {
  const router = useRouter();
  const hasHydrated = useHasHydrated();
  const [
    questionsWithAnswers,
    setQuestions,
    setOption,
    setWeighting,
    skip,
    activeIndex,
    setActiveIndex,
    save,
    slug,
    isSaving,
  ] = useVoterQuestionnaireStore((s) => [
    s.questions,
    s.setQuestions,
    s.setOption,
    s.setWeighting,
    s.skip,
    s.activeIndex,
    s.setActiveIndex,
    s.save,
    s.slug,
    s.isSaving,
  ]);
  const prevIndex = usePrevious(activeIndex);
  const questionRef = useRef<HTMLDivElement>(null);

  // Hydrate store with questions from server
  useEffect(() => {
    setQuestions(questions);
  }, [questions]);

  // Scroll question into view
  useEffect(() => {
    questionRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeIndex]);

  // Redirect once hash is set
  // Re-add when candidates are done
  useEffect(() => {
    if (slug) {
      router.push(`/wahlkabine/${slug}`);
    }
  }, [slug]);

  // Derived state
  const allQuestionsAnswered = useMemo(() => {
    return questionsWithAnswers.every(isQuestionAnswered);
  }, [questionsWithAnswers]);

  const activeQuestion =
    questionsWithAnswers.length > 0 && questionsWithAnswers[activeIndex];

  const direction = prevIndex < activeIndex ? 1 : -1;

  const hasPrevious = activeIndex > 0;
  const hasNext = activeIndex !== questionsWithAnswers.length - 1;

  // Handlers
  const handlePrev = () => {
    if (!hasPrevious) return;
    setActiveIndex(activeIndex - 1);
  };

  const handleNext = () => {
    if (hasNext) {
      setActiveIndex(activeIndex + 1);
    } else if (allQuestionsAnswered) {
      save();
    }
  };

  const PrevAndNext = (
    <div className="flex flex-row gap-2 justify-between items-center w-full">
      <span>
        <button
          onClick={handlePrev}
          disabled={!hasPrevious}
          className={clsx(
            "hover:underline notouch:hover:active:scale-95 dark:hover:bg-brand dark:disabled:text-gray-400 dark:bg-surface-200 dark:disabled:bg-surface-300 disabled:active:!scale-100 disabled:cursor-not-allowed disabled:hover:no-underline underline-offset-2 text-center transition-all xs:w-[130px] px-3 xs:px-6 py-2 active:scale-95 text-lg border border-gray-800 hover:border-brand dark:border-none hover:bg-brand hover:text-white disabled:hover:border-gray-800 disabled:hover:bg-surface-300 rounded-md",
            !hasPrevious && "invisible"
          )}
        >
          Zurück
        </button>
      </span>
      <span className="text-lg">
        {activeIndex + 1} / {questionsWithAnswers.length}
      </span>
      <span>
        <button
          disabled={
            hasNext
              ? !activeQuestion || !isQuestionAnswered(activeQuestion)
              : !allQuestionsAnswered
          }
          onClick={handleNext}
          className={clsx(
            "hover:underline notouch:hover:active:scale-95 dark:hover:bg-brand dark:disabled:text-gray-400 dark:bg-surface-200 dark:disabled:bg-surface-300 disabled:active:!scale-100 disabled:cursor-not-allowed disabled:hover:border-gray-800 disabled:hover:no-underline underline-offset-2 text-center transition-all xs:w-[130px] px-3 xs:px-6 py-2 active:scale-95 text-lg border border-gray-800 hover:border-brand dark:border-none hover:bg-brand hover:text-white disabled:hover:bg-surface-300 rounded-md",
            !hasNext && allQuestionsAnswered ? "!bg-brand" : ""
          )}
        >
          {hasNext ? "Weiter" : isSaving ? "..." : "Fertig"}
        </button>
      </span>
    </div>
  );

  return (
    <>
      {hasHydrated && activeQuestion ? (
        <AnimatePresence mode="wait" custom={direction}>
          <motion.article
            className="flex flex-col gap-5 md:gap-10 items-center max-w-[800px] mx-auto"
            key={`question-${activeQuestion.id}`}
          >
            <div className="">
              <Pagination
                activeQuestion={activeQuestion}
                questionsWithAnswers={questionsWithAnswers}
                setActiveIndex={setActiveIndex}
                className="hidden md:flex"
              />
            </div>

            <motion.header
              layout
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { duration: 0.2 },
                opacity: { duration: 0.2 },
              }}
              ref={questionRef}
              className="w-full scroll-mt-28 md:scroll-mt-10"
            >
              <QuestionCategoryLabel category={activeQuestion.category} />
              <div className="text-2xl md:mb-3 md:min-h-[5em]">
                <span className="text-lg font-semibold">
                  Frage {activeIndex + 1}:
                </span>
                <h1 className="hyphens-auto font-brand">
                  {activeQuestion.title}
                </h1>
              </div>
            </motion.header>

            {/* <div className="hidden md:block">{PrevAndNext}</div> */}

            <section className="flex flex-col gap-5 md:gap-10 max-md:my-3 my-6 w-full">
              <div className="flex justify-center items-center">
                <button
                  disabled={activeQuestion.skipped}
                  className={clsx(
                    "px-4 py-2 notouch:hover:active:scale-95 dark:disabled:text-gray-400 dark:disabled:bg-surface-300 disabled:active:!scale-100 disabled:cursor-not-allowed disabled:hover:no-underline rounded-md dark:bg-surface-200 dark:border-none border-gray-800 text-gray-800 border dark:text-white text-brand transition-all",
                    activeQuestion.skipped && "border-gray-800 text-gray-800"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    skip(activeQuestion.id);
                    if (hasNext) {
                      handleNext();
                    }
                  }}
                >
                  {activeQuestion.skipped
                    ? "Wurde übersprungen"
                    : "Überspringen"}
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-brand underline underline-offset-4">
                  Ich stimme:
                </h2>
                <ul
                  className={clsx(
                    "grid w-full",
                    activeQuestion.type === "YesNo" &&
                      "md:grid-cols-2 md:grid-rows-1 grid-cols-1 grid-rows-2",
                    activeQuestion.type === "Range" &&
                      "md:grid-cols-4 md:grid-rows-1 grid-cols-1 grid-rows-4",
                    activeQuestion.type === "Wahlrecht" &&
                      "grid-cols-1 grid-rows-4"
                  )}
                >
                  {getOptionsBasedOnType(activeQuestion.type).map((option) => (
                    <li
                      className={clsx(
                        "relative",
                        (activeQuestion.type === "Range" ||
                          activeQuestion.type === "YesNo") &&
                          "mb-2 md:mb-0 md:mr-2 last:mr-0",
                        activeQuestion.type === "Wahlrecht" && "mb-2"
                      )}
                      key={`option-${option.value}`}
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();

                          setOption(
                            activeQuestion.id,
                            activeQuestion.option === option.value
                              ? null
                              : option.value
                          );
                        }}
                        className={clsx(
                          "z-10 rounded-md transition-all notouch:hover:active:scale-95 dark:bg-surface-200 dark:border-none border-gray-800 border dark:text-white text-gray-800 relative text-lg w-full text-center py-4 focus-visible:bg-brand",
                          option.value === activeQuestion.option &&
                            " text-white !bg-brand !border-brand hover:opacity-90"
                        )}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-brand underline underline-offset-4">
                  Das ist mir:
                </h2>
                <ul className="grid w-full md:grid-cols-4 md:grid-rows-1 grid-cols-1 grid-rows-4">
                  {weightings.map((weighting) => (
                    <li
                      className="relative mb-2 md:mb-0 md:mr-2 last:mb-0 last:mr-0"
                      key={`weighting-${weighting.value}`}
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();

                          setWeighting(
                            activeQuestion.id,
                            activeQuestion.weighting === weighting.value
                              ? null
                              : weighting.value
                          );
                        }}
                        className={clsx(
                          "z-20 rounded-md dark:bg-surface-200 dark:border-none border-gray-800 border dark:text-white text-gray-800 relative text-lg w-full focus-visible:outline-brand outline-offset-2 text-center py-4",
                          weighting.value === activeQuestion.weighting &&
                            " text-white !bg-brand !border-brand hover:opacity-90"
                        )}
                      >
                        {weighting.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {PrevAndNext}

            <Pagination
              activeQuestion={activeQuestion}
              questionsWithAnswers={questionsWithAnswers}
              setActiveIndex={setActiveIndex}
              className="visible md:hidden mt-5"
            />
          </motion.article>
        </AnimatePresence>
      ) : (
        <Loading />
      )}
    </>
  );
};
