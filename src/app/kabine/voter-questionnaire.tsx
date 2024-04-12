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

  // Redirect once hash is set
  // Re-add when candidates are done
  useEffect(() => {
    if (slug) {
      router.push(`/kabine/${slug}`, {
        forceOptimisticNavigation: true,
      });
    }
  }, [router, slug]);

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

  if (!hasHydrated) {
    return (
      <div className="w-full h-[500px]">
        <Loading />
      </div>
    );
  }

  if (hasHydrated && !hasAcceptedTos) {
    return (
      <div className="flex flex-col gap-5 md:gap-10 items-center max-w-[800px] mx-auto">
        <h1 className="text-4xl my-5 pb-4 text-center border-b-2 border-black w-full">
          EU-Wahl-Infos 2024 Information
        </h1>
        <p className="max-w-[50ch] mx-auto text-lg">
          <ul className="list-disc ml-4 mb-3">
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
            className="text-brand  underline-offset-2 hover:underline"
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
            className="border-brand  border active:scale-95 px-3 py-2 hover:bg-brand   hover:text-white inline-flex items-center justify-center transition-all rounded-md gap-2"
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
        className="flex flex-col gap-5 md:gap-10 items-center max-w-[800px] mx-auto"
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
        <h1 className="text-4xl my-5 text-center border-b-2 border-black  w-full">
          Anonyme Informationen für die Statistik
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mx-auto">
          <label htmlFor="age" className="flex-1 flex flex-col gap-1">
            <span className="underline underline-offset-2 text-lg">Alter:</span>
            <input
              min={6}
              max={120}
              step={1}
              type="number"
              name="age"
              placeholder="Dein Alter"
              className="appearance-none text-lg border-brand  border-2  outline-brand  px-3 py-2"
            />
          </label>
          <label htmlFor="gender" className="flex-1 flex flex-col gap-1">
            <span className="underline underline-offset-2 text-lg">
              Geschlecht:
            </span>
            <select
              name="gender"
              className="appearance-none text-lg border-brand  border-2  outline-brand  px-3 py-[10px]"
            >
              <option value="no_answer">Bitte auswählen</option>
              <option value="w">Weiblich</option>
              <option value="x">Diverse</option>
              <option value="m">Männlich</option>
            </select>
          </label>
          <label htmlFor="state" className="flex-1 flex flex-col gap-1">
            <span className="underline underline-offset-2 text-lg">
              Bundesland:
            </span>
            <select
              name="state"
              className="appearance-none text-lg border-brand  border-2 outline-brand  px-3 py-[10px]"
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
          className="border-brand  border active:scale-95 px-3 py-2 hover:bg-brand  outline-brand  focus-visible:text-white focus-visible:bg-brand  hover:text-white inline-flex items-center justify-center transition-all rounded-md gap-2"
        >
          Weiter
        </button>
      </form>
    );
  }

  if (hasHydrated && (isSaving || slug)) {
    return (
      <div className="flex flex-col fixed inset-0 h-screen justify-center items-center max-w-[800px] mx-auto">
        <p className="md:text-xl">Ergebnis wird geladen...</p>
      </div>
    );
  }

  return (
    <>
      {activeQuestion ? (
        <AnimatePresence mode="wait" custom={direction}>
          <motion.article
            className="flex flex-col gap-5 md:gap-10 items-center max-w-full w-[900px] mx-auto"
            key={`question-${activeQuestion.id}`}
          >
            <header
              ref={questionRef}
              className="w-full scroll-mt-28 md:scroll-mt-10"
            >
              <div className="flex flex-col gap-5 md:flex-row justify-between mb-3">
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
                  className="order-2 md:order-1 w-fit"
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
                className="text-[28px] leading-[34px] md:text-3xl xl:text-4xl md:mb-3 md:min-h-[4em]"
              >
                <span className="text-[18px] leading-[21px] font-semibold">
                  Frage {activeIndex + 1}:
                </span>
                <h1 className="hyphens-auto font-sans">
                  {activeQuestion.title}
                </h1>
              </motion.div>
            </header>

            <section className="flex flex-col gap-5 md:gap-10 max-md:my-3 my-6 w-full">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-sans">Ich stimme:</h2>
                <ul
                  className={clsx(
                    "grid w-full",
                    activeQuestion.type === "YesNo" &&
                      "md:grid-cols-3 md:grid-rows-1 grid-cols-1 grid-rows-2",
                    activeQuestion.type === "Range" &&
                      "md:grid-cols-4 md:grid-rows-1 grid-cols-1 grid-rows-4"
                  )}
                >
                  {getOptionsBasedOnType(activeQuestion.type).map((option) => (
                    <li
                      className={clsx(
                        "relative",
                        (activeQuestion.type === "Range" ||
                          activeQuestion.type === "YesNo") &&
                          "mb-2 md:mb-0 md:mr-2 last:mr-0"
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
                          "z-10 rounded-[100px] transition-all gap-3 flex items-center justify-center h-full -200 border-black border-2 text-black relative group text-[22px] leading-[26px] w-full text-center py-3 focus-visible:outline-2 outline-black outline-offset-4",
                          option.value === 3 && "bg-[#99EB8B]",
                          option.value === 0 && "bg-[#FBFF95]",
                          option.value === -3 && "bg-[#FFA06E]"
                        )}
                      >
                        {option.label}
                        {option.label === "Ja" && (
                          <ThumbUpIcon className="group-data-[active=true]:text-black group-hover:text-black transition-all text-transparent h-auto w-10 p-1" />
                        )}
                        {option.label === "Ich weiß es nicht" && (
                          <ThumbSideIcon className="group-data-[active=true]:text-black group-hover:text-black transition-all text-transparent h-auto w-10 p-1" />
                        )}
                        {option.label === "Nein" && (
                          <ThumbDownIcon className="group-data-[active=true]:text-black group-hover:text-black transition-all text-transparent h-auto w-10 p-1" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-lg">Das ist mir:</h2>
                <ul className="grid w-full md:grid-cols-4 md:grid-rows-1 grid-cols-1 grid-rows-4">
                  {weightings.map((weighting, index) => (
                    <li
                      className="relative mb-2 md:mb-0 md:mr-2 last:mb-0 last:mr-0"
                      key={`${activeQuestion.id}-weighting-${weighting.value}`}
                    >
                      <button
                        ref={index === 0 ? firstWeightingRef : undefined}
                        onClick={(e) => {
                          setWeighting(activeQuestion.id, weighting.value);

                          if (document.activeElement === e.currentTarget) {
                            nextButtonRef.current?.focus();
                          }
                        }}
                        className={clsx(
                          "z-20 rounded-[100px] transition-colors border-black border-2  text-black relative text-lg w-full focus-visible:outline-2 outline-black outline-offset-4 text-center py-4",
                          weighting.value === activeQuestion.weighting &&
                            "bg-[#A8F5FF]"
                        )}
                      >
                        {weighting.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <div className="flex flex-col xs:flex-row gap-2 justify-between items-center w-full">
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
              className="visible md:hidden mt-5"
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
        "notouch:hover:active:scale-95 disabled:active:!scale-100 disabled:cursor-not-allowed underline-offset-2 text-center transition-all  w-[115px] xs:w-[130px] py-2 active:scale-95 text-lg border bg-black disabled:bg-black/70 rounded-[100px] hover:bg-white text-white hover:text-black border-black  disabled:hover:text-white disabled:hover:bg-black/70 gap-1 justify-center items-center inline-flex focus-visible:outline-2 outline-black outline-offset-4",
        className
      )}
    >
      {type === "prev" && (
        <ArrowLeftIcon className="inline-block w-5 h-5 mr-1 stroke-2" />
      )}
      {label}
      {type === "next" && (
        <ArrowRightIcon className=" inline-block w-5 h-5 ml-1 stroke-2" />
      )}
    </button>
  );
};
