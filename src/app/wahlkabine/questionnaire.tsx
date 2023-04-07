"use client";

import { Question } from "@prisma/client";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePrevious } from "~/hooks/usePrevious";
import {
  AnsweredQuestion,
  useQuestionnaireStore,
} from "~/stores/questionnaire-store";
import { Loading } from "../ui/loading";
import {
  categoryHexForLabel,
  options,
  weightings,
  yesNoOptions,
} from "~/data/answers";
import Link from "next/link";

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

const isQuestionAnswered = (question: AnsweredQuestion) => {
  return (
    typeof question.option !== "undefined" &&
    question.option !== null &&
    typeof question.weighting !== "undefined" &&
    question.weighting !== null
  );
};

export const Questionnaire = ({
  questions,
  candidateHash,
  candidateSlug,
}: {
  questions: AnsweredQuestion[];
  candidateHash?: string;
  candidateSlug?: string;
}) => {
  const router = useRouter();
  const [hasHydrated, setHasHydrated] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [
    questionsWithAnswers,
    setQuestions,
    slug,
    isSaving,
    synced,
    setOption,
    setWeighting,
    setText,
    activeIndex,
    setActiveIndex,
    save,
    reset,
  ] = useQuestionnaireStore((s) => [
    s.questions,
    s.setQuestions,
    s.slug,
    s.isSaving,
    s.synced,
    s.setOption,
    s.setWeighting,
    s.setText,
    s.activeIndex,
    s.setActiveIndex,
    s.save,
    s.reset,
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
  // useEffect(() => {
  //   if (slug) {
  //     if (candidateHash) {
  //       reset();
  //     }
  //     router.push(candidateHash ? `/${slug}` : `/wahlkabine/${slug}`);
  //   }
  // }, [slug]);

  // Redirect to results page when done button is pressed and last question is persisted
  useEffect(() => {
    if (redirect && !isSaving && synced) {
      router.push(`/${candidateSlug}/${candidateHash}?cb=${Date.now()}`);
    }
  }, [isSaving, synced, redirect]);

  // Derived state
  const activeQuestion =
    questionsWithAnswers.length > 0 && questionsWithAnswers[activeIndex];

  const direction = prevIndex < activeIndex ? 1 : -1;

  const hasPrevious = activeIndex > 0;
  const hasNext = activeIndex !== questionsWithAnswers.length - 1;

  const allQuestionsAnswered = useMemo(() => {
    return questionsWithAnswers.every(isQuestionAnswered);
  }, [questionsWithAnswers]);

  // Handlers
  const handlePrev = () => {
    if (!hasPrevious) return;
    save(candidateHash);
    setActiveIndex(activeIndex - 1);
  };

  const handleNext = () => {
    save(candidateHash);
    if (hasNext) {
      setActiveIndex(activeIndex + 1);
    } else {
      setRedirect(true);
    }
  };

  const PrevAndNext = (
    <div className="flex flex-col gap-2 sm:flex-row justify-between items-center w-full">
      <span>
        <button
          onClick={handlePrev}
          disabled={!hasPrevious}
          className={clsx(
            "hover:underline underline-offset-2 text-center w-[120px] px-6 py-2   active:scale-95 bg-neutral-200 text-gray-800 disabled:bg-neutral-100 disabled:text-gray-800/20 disabled:cursor-not-allowed disabled:active:scale-100 text-lg rounded-md",
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
          onClick={handleNext}
          className={clsx(
            "hover:underline underline-offset-2 text-center w-[130px] px-6 py-2  active:scale-95 disabled:bg-neutral-100 disabled:text-gray-800/20 disabled:cursor-not-allowed disabled:hover:no-underline disabled:active:scale-100 text-lg rounded-md ",
            !hasNext ? "bg-brand text-white" : "bg-neutral-200 text-gray-800"
          )}
        >
          {hasNext ? "Weiter" : "Fertig"}
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
                          "bg-brand text-white border-brand",
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
              <div className="text-2xl mb-3 min-h-[5em]">
                <span className="text-lg font-semibold">
                  Frage {activeIndex + 1}:
                </span>
                <h1 className="hyphens-auto">{activeQuestion.title}</h1>
              </div>
            </motion.header>

            {PrevAndNext}

            {candidateHash && (
              <div className="flex flex-col gap-2">
                <button
                  disabled={
                    synced || !isQuestionAnswered(activeQuestion) || isSaving
                  }
                  className={clsx(
                    "border-brand disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-50 disabled:text-gray-400 disabled:hover:bg-red-50/50 disabled:hover:text-gray-400 px-2 py-2 rounded-md hover:text-white hover:bg-brand transition-all border bg-red-50/50"
                  )}
                  onClick={(e) => {
                    save(candidateHash);
                  }}
                >
                  {synced &&
                    isQuestionAnswered(activeQuestion) &&
                    "Gespeichert"}
                  {!synced && isSaving && "Speichern..."}
                  {!synced &&
                    !isSaving &&
                    isQuestionAnswered(activeQuestion) &&
                    "Speichern"}
                  {!isSaving &&
                    !isQuestionAnswered(activeQuestion) &&
                    "Frage noch nicht beantwortet"}
                </button>

                <button
                  className={
                    "text-sm hover:underline text-center underline-offset-2"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setRedirect(true);
                  }}
                >
                  Zur Übersicht
                </button>
              </div>
            )}

            <section className="flex flex-col gap-10 my-6 w-full">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl underline underline-offset-4">
                  Ich stimme:
                </h2>
                <ul
                  className={clsx(
                    "grid w-full border border-brand ",
                    activeQuestion.isYesNo
                      ? "md:grid-cols-2 md:grid-rows-1 grid-cols-1 grid-rows-2"
                      : "md:grid-cols-4 md:grid-rows-1 grid-cols-1 grid-rows-4"
                  )}
                >
                  {(activeQuestion.isYesNo ? yesNoOptions : options).map(
                    (option) => (
                      <li
                        className="relative border-b md:border-b-0 md:border-r border-brand last:border-0 bg-red-50/50"
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

                            setOption(activeQuestion.id, option.value);
                          }}
                          className={clsx(
                            "z-20 relative text-lg w-full text-center py-4 focus-visible:outline-brand outline-offset-2",
                            option.value === activeQuestion.option &&
                              " text-white",
                            typeof activeQuestion.option !== "undefined" &&
                              "transition-all"
                          )}
                        >
                          {option.label}
                        </button>
                      </li>
                    )
                  )}
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

                          setWeighting(activeQuestion.id, weighting.value);
                        }}
                        className={clsx(
                          "z-20 relative text-lg w-full focus-visible:outline-brand outline-offset-2 text-center py-4",
                          weighting.value === activeQuestion.weighting &&
                            " text-white",
                          typeof activeQuestion.weighting !== "undefined" &&
                            "transition-all"
                        )}
                      >
                        {weighting.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {candidateHash && (
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl underline underline-offset-4">
                    Zusätzliche Informationen (
                    <span className="tabular-nums">
                      {activeQuestion?.text?.length ?? "0"}/500
                    </span>{" "}
                    Zeichen):
                  </h2>
                  <textarea
                    autoFocus={false}
                    value={activeQuestion.text}
                    className="max-w-full w-full focus-visible:outline-brand outline-offset-2 min-h-[5em] p-2 border border-brand rounded-md"
                    onChange={(e) => {
                      setText(activeQuestion.id, e.target.value);
                    }}
                  />
                </div>
              )}
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
