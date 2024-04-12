"use client";

import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePrevious } from "~/hooks/usePrevious";
import { Loading } from "../ui/loading";
import { Pagination } from "./pagination";
import { getOptionsBasedOnType, weightings } from "~/data/answers";
import {
  VoterAnsweredQuestion,
  useVoterQuestionnaireStore,
} from "~/stores/questionnaire-store-voter";
import { QuestionCategoryLabel } from "../ui/question-category-label";
import { useHasHydrated } from "~/hooks/useHasHydrated";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { ThumbDownIcon, ThumbSideIcon, ThumbUpIcon } from "../ui/yes-no-result";

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
  const {
    questionsWithAnswers,
    setQuestions,
    setOption,
    setWeighting,
    activeIndex,
    setActiveIndex,
    save,
    slug,
    isSaving,
    setDataForStats,
    hasAcceptedTos,
    acceptTos,
    dataForStatsAnswered,
  } = useVoterQuestionnaireStore((s) => ({
    questionsWithAnswers: s.questions,
    setQuestions: s.setQuestions,
    setOption: s.setOption,
    setWeighting: s.setWeighting,
    skip: s.skip,
    activeIndex: s.activeIndex,
    setActiveIndex: s.setActiveIndex,
    save: s.save,
    slug: s.slug,
    isSaving: s.isSaving,
    dataForStats: s.dataForStats,
    setDataForStats: s.setDataForStats,
    hasAcceptedTos: s.hasAcceptedTos,
    acceptTos: s.acceptTos,
    dataForStatsAnswered: s.dataForStatsAnswered,
  }));
  const prevIndex = usePrevious(activeIndex);
  const questionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const firstWeightingRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  // Derived state
  const allQuestionsAnswered = useMemo(() => {
    return questionsWithAnswers.every(isQuestionAnswered);
  }, [questionsWithAnswers]);

  const activeQuestion =
    questionsWithAnswers.length > 0 && questionsWithAnswers[activeIndex];

  const direction = prevIndex < activeIndex ? 1 : -1;

  const hasPrevious = activeIndex > 0;
  const hasNext = activeIndex !== questionsWithAnswers.length - 1;

  // Hydrate store with questions from server
  useEffect(() => {
    setQuestions(questions);
  }, [questions, setQuestions]);

  // Scroll question into view
  useLayoutEffect(() => {
    if (!navigator.userAgent.match(/Android/i)) {
      questionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeIndex]);

  useLayoutEffect(() => {}, [activeIndex]);

  // Redirect once hash is set
  // Re-add when candidates are done
  useEffect(() => {
    if (slug) {
      router.push(`/kabine/${slug}`, {
        forceOptimisticNavigation: true,
      });
    }
  }, [router, slug]);

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

  if (!hasHydrated) {
    return (
      <div className="h-[500px] w-full">
        <Loading />
      </div>
    );
  }

  if (hasHydrated && !hasAcceptedTos) {
    return (
      <div className="mx-auto flex max-w-[800px] flex-col items-center gap-5 md:gap-10">
        <h1 className="my-5 w-full border-b-2 border-black pb-4 text-center text-4xl">
          EU-Wahl-Infos 2024 Information
        </h1>
        <p className="mx-auto max-w-[50ch] text-lg">
          <ul className="mb-3 ml-4 list-disc">
            <li>Diese Wahl-Infos dienen der demokratischen Meinungsbildung.</li>
            <li>
              Wir erfassen <strong>keine</strong> personenbezogenen Daten.
            </li>
            <li>
              Niemand wird deine politischen Ansichten bzw. dein Ergebnis zu
              sehen bekommen.
            </li>
            <li>Niemand wird deine Eingabe mit dir verknüpfen können.</li>
            <li>Du bist anonym.</li>
          </ul>
          Für mehr Informationen kannst du die{" "}
          <Link
            className="text-brand  underline-offset-2 notouch:hover:underline"
            href="https://andererseits.org/datenschutz/"
          >
            Datenschutzerklärung hier lesen
          </Link>
          .
          <br />
          <br />
          <button
            onClick={() => {
              acceptTos();
            }}
            className="inline-flex  items-center justify-center gap-2 rounded-md border   border-brand px-3 py-2 transition-all active:scale-95 notouch:hover:bg-brand notouch:hover:text-white"
          >
            Ich habe die Information gelesen und verstanden.
          </button>
        </p>
      </div>
    );
  }

  if (hasHydrated && !dataForStatsAnswered()) {
    return (
      <form
        className="mx-auto flex max-w-[800px] flex-col items-center gap-5 md:gap-10"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const data = Object.fromEntries(formData);

          const EMPTY_ANSWER = "no_answer";

          setDataForStats({
            age: data.age === "" ? null : parseInt(data.age as string),
            gender:
              data.gender === EMPTY_ANSWER ? null : (data.gender as string),
            state: data.state === EMPTY_ANSWER ? null : (data.state as string),
          });
        }}
      >
        <h1 className="my-5 w-full border-b-2 border-black text-center  text-4xl">
          Anonyme Informationen für die Statistik
        </h1>
        <div className="mx-auto grid w-full grid-cols-1 gap-10 md:grid-cols-2">
          <label htmlFor="age" className="flex flex-1 flex-col gap-1">
            <span className="text-lg underline underline-offset-2">Alter:</span>
            <input
              min={6}
              max={120}
              step={1}
              type="number"
              name="age"
              placeholder="Dein Alter"
              className="appearance-none border-2 border-brand  px-3  py-2  text-lg outline-brand"
            />
          </label>
          <label htmlFor="gender" className="flex flex-1 flex-col gap-1">
            <span className="text-lg underline underline-offset-2">
              Geschlecht:
            </span>
            <select
              name="gender"
              className="appearance-none border-2 border-brand  px-3  py-[10px]  text-lg outline-brand"
            >
              <option value="no_answer">Bitte auswählen</option>
              <option value="w">Weiblich</option>
              <option value="x">Diverse</option>
              <option value="m">Männlich</option>
            </select>
          </label>
          <label htmlFor="state" className="flex flex-1 flex-col gap-1">
            <span className="text-lg underline underline-offset-2">
              Bundesland:
            </span>
            <select
              name="state"
              className="appearance-none border-2 border-brand  px-3 py-[10px]  text-lg outline-brand"
            >
              <option value="no_answer">Bitte auswählen</option>
              <option value="Burgenland">Burgenland</option>
              <option value="Kärnten">Kärnten</option>
              <option value="Niederösterreich">Niederösterreich</option>
              <option value="Oberösterreich">Oberösterreich</option>
              <option value="Salzburg">Salzburg</option>
              <option value="Steiermark">Steiermark</option>
              <option value="Tirol">Tirol</option>
              <option value="Vorarlberg">Vorarlberg</option>
              <option value="Wien">Wien</option>
            </select>
          </label>
        </div>

        <button
          type="submit"
          className="inline-flex  items-center justify-center gap-2 rounded-md border  border-brand  px-3 py-2  outline-brand transition-all focus-visible:bg-brand focus-visible:text-white active:scale-95 notouch:hover:bg-brand notouch:hover:text-white"
        >
          Weiter
        </button>
      </form>
    );
  }

  if (hasHydrated && (isSaving || slug)) {
    return (
      <div className="fixed inset-0 mx-auto flex h-screen max-w-[800px] flex-col items-center justify-center">
        <p className="md:text-xl">Ergebnis wird geladen...</p>
      </div>
    );
  }

  return (
    <>
      {activeQuestion ? (
        <AnimatePresence mode="wait" custom={direction}>
          <motion.article
            className="mx-auto flex w-[900px] max-w-full flex-col items-center gap-5 md:gap-10"
            key={`question-${activeQuestion.id}`}
          >
            <header
              ref={questionRef}
              className="w-full scroll-mt-28 md:scroll-mt-10"
            >
              <div className="mb-3 flex flex-col justify-between gap-5 md:flex-row">
                <motion.div
                  layout
                  custom={direction}
                  variants={variants}
                  initial={shouldReduceMotion ? "center" : "enter"}
                  animate="center"
                  exit={shouldReduceMotion ? "center" : "exit"}
                  transition={{
                    x: { duration: 0.2 },
                    opacity: { duration: 0.2 },
                  }}
                  className="order-2 w-fit md:order-1"
                >
                  <QuestionCategoryLabel category={activeQuestion.category} />
                </motion.div>
                <div className="order-1 md:order-2">
                  <Pagination
                    activeQuestion={activeQuestion}
                    questionsWithAnswers={questionsWithAnswers}
                    setActiveIndex={setActiveIndex}
                  />
                </div>
              </div>
              <motion.div
                layout
                custom={direction}
                variants={variants}
                initial={shouldReduceMotion ? "center" : "enter"}
                animate="center"
                exit={shouldReduceMotion ? "center" : "exit"}
                transition={{
                  x: { duration: 0.2 },
                  opacity: { duration: 0.2 },
                }}
                className="text-[28px] leading-[34px] md:mb-3 md:min-h-[4em] md:text-3xl xl:text-4xl"
              >
                <span className="text-[18px] font-semibold leading-[21px]">
                  Frage {activeIndex + 1}:
                </span>
                <h1 className="hyphens-auto font-sans">
                  {activeQuestion.title}
                </h1>
              </motion.div>
            </header>

            <section className="max-md:my-3 my-6 flex w-full flex-col gap-5 md:gap-10">
              <div className="flex flex-col gap-2">
                <h2 className="font-sans text-lg">Ich stimme:</h2>
                <ul
                  className={clsx(
                    "grid w-full",
                    activeQuestion.type === "YesNo" &&
                      "grid-cols-1 grid-rows-2 md:grid-cols-3 md:grid-rows-1",
                    activeQuestion.type === "Range" &&
                      "grid-cols-1 grid-rows-4 md:grid-cols-4 md:grid-rows-1",
                  )}
                >
                  {getOptionsBasedOnType(activeQuestion.type).map((option) => (
                    <li
                      className={clsx(
                        "relative",
                        (activeQuestion.type === "Range" ||
                          activeQuestion.type === "YesNo") &&
                          "mb-2 last:mr-0 md:mb-0 md:mr-2",
                      )}
                      key={`${activeQuestion.id}-option-${option.value}`}
                    >
                      <button
                        onClick={(e) => {
                          setOption(activeQuestion.id, option.value);

                          if (document.activeElement === e.currentTarget) {
                            firstWeightingRef.current?.focus();
                          }
                        }}
                        data-active={option.value === activeQuestion.option}
                        className={clsx(
                          "-200 group relative z-10 flex h-full w-full items-center justify-center gap-3 rounded-[100px] border-2 border-black py-3 text-center text-[22px] leading-[26px] text-black outline-offset-4 outline-black transition-all focus-visible:outline-2",
                          option.value === 3 && "bg-[#99EB8B]",
                          option.value === 0 && "bg-[#FBFF95]",
                          option.value === -3 && "bg-[#FFA06E]",
                        )}
                      >
                        {option.label}
                        {option.label === "Ja" && (
                          <ThumbUpIcon className="h-auto w-10 p-1 text-transparent transition-all group-hover:text-black group-data-[active=true]:text-black" />
                        )}
                        {option.label === "Ich weiß es nicht" && (
                          <ThumbSideIcon className="h-auto w-10 p-1 text-transparent transition-all group-hover:text-black group-data-[active=true]:text-black" />
                        )}
                        {option.label === "Nein" && (
                          <ThumbDownIcon className="h-auto w-10 p-1 text-transparent transition-all group-hover:text-black group-data-[active=true]:text-black" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-lg">Das ist mir:</h2>
                <ul className="grid w-full grid-cols-1 grid-rows-4 md:grid-cols-4 md:grid-rows-1">
                  {weightings.map((weighting, index) => (
                    <li
                      className="relative mb-2 last:mb-0 last:mr-0 md:mb-0 md:mr-2"
                      key={`${activeQuestion.id}-weighting-${weighting.value}`}
                    >
                      <button
                        ref={index === 0 ? firstWeightingRef : undefined}
                        onClick={(e) => {
                          setWeighting(activeQuestion.id, weighting.value);

                          if (document.activeElement === e.currentTarget) {
                            window.setTimeout(() => {
                              console.log(nextButtonRef.current?.disabled);
                              nextButtonRef.current?.focus();
                            }, 0);
                          }
                        }}
                        className={clsx(
                          "relative z-20 w-full rounded-[100px] border-2  border-black py-4 text-center text-lg text-black outline-offset-4 outline-black transition-colors focus-visible:outline-2",
                          weighting.value === activeQuestion.weighting &&
                            "bg-[#A8F5FF]",
                        )}
                      >
                        {weighting.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <div className="flex w-full flex-col items-center justify-between gap-2 xs:flex-row">
              <NavigationButton
                label={"Zurück"}
                disabled={!hasPrevious}
                onClick={handlePrev}
                type="prev"
                className={clsx(!hasPrevious && "invisible")}
              />
              <span className="text-lg">
                {activeIndex + 1} / {questionsWithAnswers.length}
              </span>
              <NavigationButton
                buttonRef={nextButtonRef}
                label={hasNext ? "Weiter" : isSaving ? "..." : "Fertig"}
                disabled={
                  hasNext
                    ? !activeQuestion || !isQuestionAnswered(activeQuestion)
                    : !allQuestionsAnswered
                }
                onClick={handleNext}
                type="next"
              />
            </div>

            <Pagination
              activeQuestion={activeQuestion}
              questionsWithAnswers={questionsWithAnswers}
              setActiveIndex={setActiveIndex}
              className="visible mt-5 md:hidden"
            />
          </motion.article>
        </AnimatePresence>
      ) : null}
    </>
  );
};

const NavigationButton = ({
  label,
  disabled,
  onClick,
  className,
  type,
  buttonRef,
}: {
  disabled?: boolean;
  onClick: () => void;
  label: ReactNode;
  className?: string;
  type: "prev" | "next";
  buttonRef?: React.Ref<HTMLButtonElement>;
}) => {
  return (
    <button
      ref={buttonRef}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "inline-flex w-[115px] items-center justify-center gap-1 rounded-[100px]  border border-black bg-black py-2 text-center text-lg text-white underline-offset-2 outline-offset-4 outline-black transition-all focus-visible:outline-2 active:scale-95  disabled:cursor-not-allowed disabled:bg-black/70 disabled:active:!scale-100 xs:w-[130px] notouch:hover:bg-white notouch:hover:text-black notouch:hover:active:scale-95 notouch:disabled:hover:bg-black/70 notouch:disabled:hover:text-white",
        className,
      )}
    >
      {type === "prev" && (
        <ArrowLeftIcon className="mr-1 inline-block h-5 w-5 stroke-2" />
      )}
      {label}
      {type === "next" && (
        <ArrowRightIcon className=" ml-1 inline-block h-5 w-5 stroke-2" />
      )}
    </button>
  );
};
