"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePrevious } from "~/hooks/usePrevious";
import { Loading } from "../ui/loading";
import {
  categoryHexForLabel,
  getOptionsBasedOnType,
  weightings,
} from "~/data/answers";
import {
  VoterAnsweredQuestion,
  useVoterQuestionnaireStore,
} from "~/stores/questionnaire-store-voter";

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
  console.log(
    question.id,
    (question.option !== null && question.weighting !== null) ||
      question.skipped
  );
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
  const [hasHydrated, setHasHydrated] = useState(false);
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

  // Check if component has hydrated before showing UI
  // Prevents hydration mismatch error due to localstorage
  useEffect(() => {
    setHasHydrated(true);
  }, [hasHydrated]);

  // Hydrate store with questions from server
  useEffect(() => {
    setQuestions(questions);
  }, [questions]);

  // Scroll question into view
  useEffect(() => {
    console.log(questionRef?.current);
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
    <div className="flex flex-col gap-2 sm:flex-row justify-between items-center w-full">
      <span>
        <button
          onClick={handlePrev}
          disabled={!hasPrevious}
          className={clsx(
            "hover:underline underline-offset-2 text-center w-[130px] px-6 py-2   active:scale-95 bg-neutral-200 text-gray-800 disabled:bg-neutral-100 disabled:text-gray-800/20 disabled:cursor-not-allowed disabled:active:scale-100 text-lg rounded-md",
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
            "hover:underline underline-offset-2 text-center transition-all w-[130px] px-6 py-2  active:scale-95 disabled:bg-neutral-100 disabled:text-gray-800/20 disabled:cursor-not-allowed disabled:hover:no-underline disabled:active:scale-100 text-lg rounded-md ",
            !hasNext && allQuestionsAnswered
              ? "bg-brand text-white"
              : "bg-neutral-200 text-gray-800"
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
            className="flex flex-col gap-10 items-center"
            key={`question-${activeQuestion.id}`}
          >
            <div className="">
              <ul className="flex flex-row flex-wrap gap-1 md:gap-1 justify-center">
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
                        activeQuestion.id === question.id &&
                          "underline scale-[0.85]",
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
              className="w-full"
            >
              <span
                className={clsx(
                  "inline-block px-2 py-1 text-sm mb-2 h-[2em]",
                  activeQuestion.category && "text-white"
                )}
                style={{
                  backgroundColor: categoryHexForLabel(activeQuestion.category),
                }}
              >
                {activeQuestion.category}
              </span>
              <div className="text-2xl mb-3 min-h-[7em]">
                <span className="text-lg font-semibold">
                  Frage {activeIndex + 1}:
                </span>
                <h1 className="hyphens-auto">{activeQuestion.title}</h1>
              </div>
            </motion.header>

            {PrevAndNext}

            <section className="flex flex-col gap-10 my-6 w-full">
              <div className="flex justify-center items-center">
                <button
                  disabled={activeQuestion.skipped}
                  className={clsx(
                    "border-neutral-200 disabled:border-0 border px-4 rounded-md py-2 text-neutral-500 hover:border-gray-800 transition-all active:scale-95",
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
                <h2 className="text-xl underline underline-offset-4">
                  Ich stimme:
                </h2>
                <ul
                  className={clsx(
                    "grid w-full border border-brand ",
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
                        "relative border-brand last:border-0 bg-red-50/50",
                        (activeQuestion.type === "Range" ||
                          activeQuestion.type === "YesNo") &&
                          "md:border-r border-brand",
                        activeQuestion.type === "Wahlrecht" &&
                          "border-b border-brand"
                      )}
                      key={`option-${option.value}`}
                    >
                      {option.value === activeQuestion.option && (
                        <motion.span
                          layoutId="active-option"
                          // exit={{ opacity:  0 }}
                          className="absolute inset-0 bg-brand z-10"
                        />
                      )}
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
                          "z-20 relative text-lg w-full text-center py-4 focus-visible:outline-brand outline-offset-2",
                          option.value === activeQuestion.option &&
                            " text-white",
                          activeQuestion.option !== null && "transition-all"
                        )}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-xl underline underline-offset-4">
                  Das ist mir:
                </h2>
                <ul className="grid w-full border border-brand md:grid-cols-4 md:grid-rows-1 grid-cols-1 grid-rows-4">
                  {weightings.map((weighting) => (
                    <li
                      className="relative border-b md:border-b-0 md:border-r border-brand last:border-0 bg-red-50/50"
                      key={`weighting-${weighting.value}`}
                    >
                      {weighting.value === activeQuestion.weighting && (
                        <motion.span
                          layoutId="active-weighting"
                          // exit={{ opacity:  0 }}
                          className="absolute inset-0 bg-brand z-10"
                        />
                      )}
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
                          "z-20 relative text-lg w-full focus-visible:outline-brand outline-offset-2 text-center py-4",
                          weighting.value === activeQuestion.weighting &&
                            " text-white",
                          activeQuestion.weighting !== null && "transition-all"
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
          </motion.article>
        </AnimatePresence>
      ) : (
        <Loading />
      )}
    </>
  );
};
