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
import { Loading } from "../../ui/loading";
import { Pagination } from "./pagination";
import { getOptionsBasedOnType, weightings } from "~/data/answers";
import {
  VoterAnsweredQuestion,
  useVoterQuestionnaireStore,
} from "~/stores/questionnaire-store-voter";
import { QuestionCategoryLabel } from "../../ui/question-category-label";
import { useHasHydrated } from "~/hooks/useHasHydrated";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import {
  ThumbDownIcon,
  ThumbSideIcon,
  ThumbUpIcon,
} from "../../ui/yes-no-result";
import { GlossarEntry } from "@prisma/client";
import { GlossaredText } from "../../ui/glossared-text";
import { Button } from "../../ui/button";
import { MailerliteInput } from "~/app/ui/mailerlite-input";

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
  glossarEntries,
  electionSlug,
}: {
  questions: VoterAnsweredQuestion[];
  glossarEntries: GlossarEntry[];
  electionSlug: string;
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
    // TODO: Test if this still breaks on Chrome Android
    // if (!navigator.userAgent.match(/Android/i)) {
    questionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    // }
  }, [activeIndex]);

  useLayoutEffect(() => {}, [activeIndex]);

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

  if (hasHydrated && isSaving) {
    return (
      <div className="mx-auto flex max-w-[800px] flex-col items-center justify-center py-10">
        <p className="md:text-xl">Ergebnis wird geladen...</p>
      </div>
    );
  }

  if (hasHydrated && slug) {
    return (
      <AfterSubmitPage linkToNextPage={`/${electionSlug}/fragen/${slug}`} />
    );
  }

  return (
    <>
      {activeQuestion ? (
        <AnimatePresence mode="wait" custom={direction}>
          <motion.article
            aria-label="Frage und Antwortmöglichkeiten"
            className="mx-auto flex w-[900px] max-w-full flex-col items-center gap-5 md:gap-10"
            key={`question-${activeQuestion.id}`}
          >
            <header
              aria-label="Frage"
              ref={questionRef}
              className="w-full scroll-mt-28 md:scroll-mt-10"
            >
              <div className="flex flex-col justify-between gap-5 pb-5 md:flex-row">
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
                className="flex flex-col gap-2 text-[1.75rem] leading-[2.125rem] md:mb-3 md:min-h-[3.5em] md:text-2xl lg:min-h-[3em] xl:min-h-[2.5em]"
              >
                <span className="block text-[1.125rem] font-medium leading-[1.3125rem]">
                  Frage {activeIndex + 1}:
                </span>
                <h1 className="font-sans font-light">
                  <GlossaredText
                    text={activeQuestion.title}
                    glossarEntries={glossarEntries}
                  />
                </h1>
              </motion.div>
            </header>

            <section
              aria-label="Antwortmöglichkeiten"
              className="max-md:my-3 my-6 flex w-full flex-col gap-5 md:gap-10"
            >
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
                          "-200 group relative z-10 flex h-full w-full items-center justify-center gap-3 rounded-[100px] border-2 border-black py-3 text-center text-[1.375rem] leading-[1.625rem] text-black outline-offset-4 outline-black transition-all focus-visible:outline-2",
                          option.value === 1 && "bg-[#99EB8B]",
                          option.value === 0 && "bg-[#FBFF95]",
                          option.value === -1 && "bg-[#FFA06E]",
                        )}
                      >
                        {option.label}
                        {option.label === "Ja" && (
                          <ThumbUpIcon className="h-10 w-auto p-1 text-transparent transition-all group-data-[active=true]:text-black notouch:group-hover:text-black" />
                        )}
                        {option.label === "Ich weiß es nicht" && (
                          <ThumbSideIcon className="h-10 w-auto p-1 text-transparent transition-all group-data-[active=true]:text-black notouch:group-hover:text-black" />
                        )}
                        {option.label === "Nein" && (
                          <ThumbDownIcon className="h-10 w-auto p-1 text-transparent transition-all group-data-[active=true]:text-black notouch:group-hover:text-black" />
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

            <div className="flex w-full flex-col items-center justify-between gap-4 xs:flex-row">
              <NavigationButton
                label={"Zurück"}
                disabled={!hasPrevious}
                onClick={handlePrev}
                type="prev"
                className={clsx(!hasPrevious && "hidden xs:invisible xs:block")}
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

const AfterSubmitPage = ({ linkToNextPage }: { linkToNextPage: string }) => {
  return (
    <section
      aria-describedby="newsletter-cta-title"
      className="mx-auto w-[672px] max-w-full space-y-5 text-[1.125rem] leading-[1.6875rem]"
    >
      <div className="flex items-center justify-center pb-10">
        <Button
          prefetch
          as="Link"
          href={linkToNextPage}
          variant="primary"
          roundness="large"
        >
          Zum Ergebnis
          <ArrowRightIcon className="inline-block h-5 w-5 stroke-2" />
        </Button>
      </div>
      <h1
        id="newsletter-cta-title"
        className="text-[2.25rem] leading-[2.75rem]"
      >
        Richtige Worte?
      </h1>
      <p>
        Behinderung, Beeinträchtigung, besondere Bedürfnisse? Weißt Du manchmal
        auch nicht so ganz, wie Du über Behinderung sprechen sollst?
      </p>
      <p>
        Bei <span className="italic">andererseits</span> arbeiten
        Journalist*innen mit und ohne Behinderung gemeinsam. Gleichberechtigt,
        kritisch und fair bezahlt.
        <br />
        Wenn Du uns Deine E-Mail Adresse gibst, dann schicken wir dir unseren
        Leitfaden zu sensibler Sprache.
      </p>

      <p>
        Damit gibst Du uns auch die Erlaubnis, Dir unseren wöchentlichen
        Newsletter, Neuigkeiten und Werbung von{" "}
        <span className="italic">andererseits</span> zu schicken. Du kannst Dich
        jederzeit abmelden.
      </p>

      <p>
        Auch wenn Du uns deine E-Mail Adresse gibst, wissen wir nicht, wie Du
        gestimmt hast.
        <br /> Mehr Infos zum Datenschutz bei{" "}
        <span className="italic">andererseits</span> und unserem
        Newsletterprogramm findest Du hier:
      </p>
      <ul className="my-3 ml-4 list-disc space-y-1">
        {[
          {
            text: "Privacy Policy – MailerLite",
            href: "https://www.mailerlite.com/legal/privacy-policy",
          },
          {
            text: "Datenschutz – andererseits",
            href: "https://andererseits.org/datenschutz",
          },
        ].map((link) => (
          <li key={link.href}>
            <a
              className="font-semibold text-black underline"
              target="blank"
              rel="noreferrer noopener"
              href={link.href}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>

      <p>Bist Du dabei? Dann melde Dich jetzt kostenlos an.</p>

      <MailerliteInput action="https://assets.mailerlite.com/jsonp/345641/forms/118855395671279343/subscribe" />

      <p className="">
        Du möchtest keinen Newsletter bekommen? <br />
        Hier kommst Du direkt zu Deinem Ergebnis vom Wahl-Checker:
      </p>

      <div className="flex items-center justify-center pt-10">
        <Button
          prefetch
          as="Link"
          href={linkToNextPage}
          variant="primary"
          roundness="large"
        >
          Zum Ergebnis
          <ArrowRightIcon className="inline-block h-5 w-5 stroke-2" />
        </Button>
      </div>
    </section>
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
    <Button
      variant="primary"
      as="button"
      roundness="large"
      buttonRef={buttonRef}
      disabled={disabled}
      onClick={onClick}
      className={clsx("w-[130px] text-lg text-white", className)}
    >
      {type === "prev" && (
        <ArrowLeftIcon className="mr-1 inline-block h-5 w-5 flex-shrink-0 stroke-2" />
      )}
      {label}
      {type === "next" && (
        <ArrowRightIcon className=" ml-1 inline-block h-5 w-5 flex-shrink-0 stroke-2" />
      )}
    </Button>
  );
};