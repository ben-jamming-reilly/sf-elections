"use client";

import { CandidatesWithQuestions } from "../[electionSlug]/questions/[slug]/get-candidates-with-questions";
import { OptionResult } from "./option-result";
import { QuestionCategoryLabel } from "./question-category-label";
import { QuestionUnansweredResult } from "./question-unanswered-result";
import { WeightingResult } from "./weighting-result";
import { QuestionInfo } from "./question-info";
import { Button } from "./button";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { PartyLogo } from "./party-logo";
import { GlossarEntry } from "@prisma/client";
import { GlossaredText } from "./glossared-text";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import {
  optionLabelForValue,
  optionLabelForYesNoValue,
  weightingLabelForValue,
} from "~/data/answers";

// TODO: remove direct database type
// TODO: refactor naming to use main answer vs comparision answers

export const QuestionWithAnswers = ({
  question,
  voterAnswer,
  candidatesAnswers,
  candidateLinkBase, // For linking to the candidate comparison page with the voter hash
  textOpenByDefault = false,
  glossarEntries,
  isQuestionnaire,
  voterType = "voter",
}: {
  voterType?: "voter" | "candidate";
  question: {
    id: number;
    title: string;
    category: string;
    type: string;
    order: number;
  };
  voterAnswer?: {
    option: number | null;
    weighting: number | null;
    text?: string | null; // only used for when the "voter" is a candidate
    textSimpleLanguage?: string | null; // only used for when the "voter" is a candidate
    changedQuestionDisclaimer?: string | null; // only used for when the "voter" is a candidate
  };
  candidatesAnswers?: CandidatesWithQuestions;
  candidateLinkBase?: string;
  textOpenByDefault?: boolean;
  isQuestionnaire?: boolean;
  glossarEntries: GlossarEntry[];
}) => {
  const isSingleComparison = candidatesAnswers?.length === 1;
  const [detailsOpen, setDetailsOpen] = useState(
    isSingleComparison || !isQuestionnaire ? true : textOpenByDefault,
  );

  return (
    <article
      aria-labelledby={`aria-label-question-${question.order + 1}`}
      key={`question-with-answers-${question.id}`}
      className="w-full"
    >
      {question.category && (
        <QuestionCategoryLabel category={question.category} />
      )}
      <div className="mt-3 text-lg">Question {question.order + 1}:</div>
      <h2
        id={`aria-label-question-${question.order + 1}`}
        className="mb-5 font-sans text-2xl"
      >
        <GlossaredText glossarEntries={glossarEntries} text={question.title} />
      </h2>

      {voterAnswer && (
        <section className="mb-6 w-full">
          {voterType === "voter" && (
            <h3 className="mb-3 font-semibold">You said:</h3>
          )}
          {voterAnswer.option !== null && voterAnswer.weighting !== null ? (
            <ul
              aria-label={
                voterType === "voter" ? "Your Answer" : "Candidate's Answer"
              }
              className="grid w-full grid-cols-2 flex-row gap-3 sm:flex"
            >
              <li
                className="inline-flex flex-shrink items-stretch justify-stretch"
                aria-label={optionLabelForYesNoValue(voterAnswer.option)}
              >
                <OptionResult value={voterAnswer.option} type={question.type} />
              </li>
              <li
                className="inline-flex flex-shrink items-stretch justify-stretch"
                aria-label={weightingLabelForValue(voterAnswer.weighting!)}
              >
                <WeightingResult value={voterAnswer.weighting!} />
              </li>
            </ul>
          ) : (
            <div className="w-full">
              {isQuestionnaire ? <QuestionUnansweredResult /> : null}
            </div>
          )}
        </section>
      )}

      {voterAnswer?.text || voterAnswer?.changedQuestionDisclaimer ? (
        <div className=" my-3">
          <QuestionInfo
            open
            glossarEntries={glossarEntries}
            text={voterAnswer.text ?? ""}
            disclosure={voterAnswer.changedQuestionDisclaimer}
            textSimpleLanguage={voterAnswer.textSimpleLanguage}
          />
        </div>
      ) : null}

      {candidatesAnswers && !isSingleComparison && isQuestionnaire ? (
        <section aria-label="Party Responses at a Glance">
          <h3 className="mb-3 mt-5 font-semibold">
            This is what the {voterType === "candidate" ? "other" : ""}{" "}
            candidates said:
          </h3>
          <ul className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:w-fit">
            {candidatesAnswers.map((candidate) => {
              const candidateAnswer = candidate.answers.find(
                (answer) => answer.questionId === question.id,
              );

              if (!candidateAnswer) {
                return null;
              }

              return (
                <li
                  aria-label={`Response from ${candidate.name}: ${optionLabelForYesNoValue(candidateAnswer.option!)}`}
                  key={`candidate-${candidateAnswer.questionId}-${candidate.id}`}
                  className="relative h-[70px] w-full sm:h-[60px] md:w-[260px]"
                >
                  <PartyLogo
                    className="absolute left-0 top-0 z-20 h-full w-[75px] rounded-[100px]  border-2 sm:w-2/3 xxs:w-[100px] xxs:rounded-[200px] xs:w-2/3"
                    href={`${candidateLinkBase ?? ""}/${candidate.slug}`}
                    title={`Go to ${candidate.name} page`}
                    src={`${candidate.profileImg}`}
                    alt={`${candidate.name}`}
                    priority
                  />

                  {candidateAnswer.option !== null ? (
                    <OptionResult
                      className="absolute right-0 top-0 z-10 !h-full w-full !justify-end  !pr-4 !text-right sm:!pr-7"
                      hideLabel={true}
                      value={candidateAnswer.option}
                      type={candidateAnswer.question.type}
                    />
                  ) : (
                    <div className="flex w-full items-center justify-center">
                      {isQuestionnaire ? <QuestionUnansweredResult /> : null}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {candidatesAnswers && (
        <section
          aria-label={
            isSingleComparison
              ? "Party's Answer"
              : "Detailed Responses from candidates"
          }
          className="mt-5"
        >
          <details
            open={detailsOpen}
            onToggle={(e) => setDetailsOpen(e.currentTarget.open)}
            className={"group flex items-center justify-center py-10"}
          >
            <Button
              as="summary"
              roundness="large"
              variant="secondary"
              className={clsx(
                "mx-auto inline-flex w-fit items-center px-6 py-3 text-[1.125rem] font-semibold leading-[1.375rem]",
                isSingleComparison && "hidden",
              )}
            >
              More Info:
              <ChevronRightIcon
                aria-hidden="true"
                className="ml-1 h-6 w-6 stroke-[1.5px] transition-all group-open:rotate-90"
              />
            </Button>
            <AnimatePresence mode="wait">
              {detailsOpen && (
                <motion.ul
                  key={`question-answer-list-${question.id}`}
                  transition={{
                    duration: 0.3,
                  }}
                  initial={{
                    opacity: 0,
                    y: -50,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -50,
                  }}
                  className={clsx(
                    "grid w-full grid-cols-1 gap-y-10 pt-20 md:gap-7",
                    isSingleComparison ? "pt-5" : "pt-20",
                  )}
                >
                  {candidatesAnswers.map((candidate) => {
                    const candidateAnswer = candidate.answers.find(
                      (answer) => answer.questionId === question.id,
                    );

                    if (!candidateAnswer) {
                      return null;
                    }

                    return (
                      <li
                        aria-label={`Response from ${candidate.name}: ${optionLabelForYesNoValue(candidateAnswer.option!)} – ${weightingLabelForValue(candidateAnswer.weighting!)}`}
                        key={`candidate-details-${candidateAnswer.questionId}-${candidate.id}`}
                        className="relative space-y-4 border-t border-black pb-10 pt-12 md:pt-4"
                      >
                        <PartyLogo
                          className="group absolute -top-[30px] left-1/2 h-[60px] w-[170px] -translate-x-1/2 sm:w-[150px] md:-top-[44px] md:left-auto md:right-10 md:h-[88px] md:translate-x-0 xl:-top-[30px] xl:h-[60px]"
                          href={`${candidateLinkBase ?? ""}/${candidate.slug}`}
                          title={`Go to ${candidate.name} page`}
                          src={`${candidate.profileImg}`}
                          priority
                        />

                        {candidateAnswer.option !== null &&
                        candidateAnswer.weighting !== null ? (
                          <div className="flex gap-3">
                            <OptionResult
                              value={candidateAnswer.option}
                              type={candidateAnswer.question.type}
                            />
                            <WeightingResult
                              value={candidateAnswer.weighting}
                            />
                          </div>
                        ) : (
                          <div className="flex w-full items-center justify-center">
                            {isQuestionnaire ? (
                              <QuestionUnansweredResult />
                            ) : null}
                          </div>
                        )}

                        {candidateAnswer.text ||
                        candidateAnswer.changedQuestionDisclaimer ? (
                          <QuestionInfo
                            open
                            glossarEntries={glossarEntries}
                            text={candidateAnswer.text}
                            textSimpleLanguage={
                              candidateAnswer.textSimpleLanguage
                            }
                            disclosure={
                              candidateAnswer.changedQuestionDisclaimer
                            }
                          />
                        ) : null}
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </details>
        </section>
      )}
    </article>
  );
};
