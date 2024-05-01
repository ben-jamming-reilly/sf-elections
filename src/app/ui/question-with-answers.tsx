import Image from "next/image";
import { CandidatesWithQuestions } from "../fragen/[slug]/get-candidates-with-questions";
import { GlossaredTextServer } from "./glossared-text.server";
import { OptionResult } from "./option-result";
import { QuestionCategoryLabel } from "./question-category-label";
import { QuestionUnansweredResult } from "./question-unanswered-result";
import { WeightingResult } from "./weighting-result";
import Link from "next/link";
import { QuestionInfo } from "./question-info";
import { Button } from "./button";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

// TODO: remove direct database type
// TODO: refactor naming to use main answer vs comparision answers

export const QuestionWithAnswers = ({
  question,
  voterAnswer,
  candidatesAnswers,
  candidateLinkBase, // For linking to the candidate comparison page with the voter hash
}: {
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
    changedQuestionDisclaimer?: string | null; // only used for when the "voter" is a candidate
  };
  candidatesAnswers?: CandidatesWithQuestions;
  candidateLinkBase?: string;
}) => {
  return (
    <article
      aria-labelledby={`aria-label-question-${question.order}`}
      key={`question-with-answers-${question.id}`}
      className="w-full"
    >
      {question.category && (
        <QuestionCategoryLabel category={question.category} />
      )}
      <div className="mt-3 text-lg">Frage {question.order + 1}:</div>
      <h2
        id={`aria-label-question-${question.order + 1}`}
        className="mb-5 hyphens-auto font-sans text-2xl"
      >
        {/* @ts-expect-error */}
        <GlossaredTextServer text={question.title} />
      </h2>

      {voterAnswer && (
        <section aria-label="Dein Antwort" className="">
          <h3 className="mb-3 font-semibold">Du hast gesagt:</h3>
          {voterAnswer.option !== null && voterAnswer.weighting !== null ? (
            <div className="flex flex-row gap-3">
              <OptionResult value={voterAnswer.option} type={question.type} />
              <WeightingResult value={voterAnswer.weighting!} />
            </div>
          ) : (
            <div className="w-full">
              <QuestionUnansweredResult />
            </div>
          )}
        </section>
      )}

      {voterAnswer?.text || voterAnswer?.changedQuestionDisclaimer ? (
        <div className=" my-3">
          <QuestionInfo
            open
            text={voterAnswer.text ?? ""}
            disclosure={voterAnswer.changedQuestionDisclaimer}
          />
        </div>
      ) : null}

      {candidatesAnswers && (
        <section aria-label="Antworten der Parteien auf einen Blick">
          <h3 className="mb-3 mt-5 font-semibold">
            Das haben die Parteien gesagt:
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
                  key={`candidate-${candidateAnswer.questionId}-${candidate.id}`}
                  className="relative h-[70px] w-full sm:h-[60px] md:w-[260px]"
                >
                  <Link
                    className="no-touch:hover:bg-brand xxs:w-[100px] xxs:rounded-[200px] group absolute left-0 top-0 z-20 block h-full w-[80px] overflow-clip rounded-[100px] border-2 border-black bg-white outline-offset-4 outline-black transition-all  focus-visible:outline-2 sm:w-2/3 xs:w-2/3"
                    href={`${candidateLinkBase ?? ""}/${candidate.slug}`}
                  >
                    <Image
                      src={`/${candidate.profileImg}`}
                      alt=""
                      fill
                      priority
                      className="mx-auto max-h-full max-w-[90px] px-3 py-3 md:max-w-[130px] md:px-5 md:py-3"
                    />
                  </Link>

                  {candidateAnswer.option !== null ? (
                    <OptionResult
                      className="absolute right-0 top-0 z-10 !h-full w-full !justify-end  !pr-4 !text-right sm:!pr-7"
                      hideIcon={true}
                      value={candidateAnswer.option}
                      type={candidateAnswer.question.type}
                    />
                  ) : (
                    <div className="flex w-full items-center justify-center">
                      <QuestionUnansweredResult />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {candidatesAnswers && (
        <section aria-label="Antworten der Parteien im Detail" className="mt-5">
          <details className="group flex items-center justify-center py-10">
            <Button
              as="summary"
              roundness="large"
              variant="secondary"
              className="mx-auto inline-flex w-fit items-center px-6 py-3 text-[18px] font-semibold leading-[22px]"
            >
              Antworten im Detail:
              <ChevronRightIcon className="ml-1 h-6 w-6 stroke-[1.5px] transition-all group-open:rotate-90" />
            </Button>
            <ul className="grid w-full grid-cols-1 gap-y-10 pt-20 md:gap-7">
              {candidatesAnswers.map((candidate) => {
                const candidateAnswer = candidate.answers.find(
                  (answer) => answer.questionId === question.id,
                );

                if (!candidateAnswer) {
                  return null;
                }

                return (
                  <li
                    key={`candidate-details-${candidateAnswer.questionId}-${candidate.id}`}
                    className="relative space-y-4 border-t border-black pb-16 pt-12 md:pt-4"
                  >
                    <Link
                      className="no-touch:hover:bg-brand group absolute -top-[30px] left-1/2 z-10 block h-[60px] w-[170px] -translate-x-1/2 overflow-clip rounded-[200px] border border-black  bg-white outline-offset-4 outline-black transition-all focus-visible:outline-2 sm:w-[150px] md:-top-[44px] md:left-auto md:right-10 md:h-[88px] md:translate-x-0 xl:-top-[30px] xl:h-[60px]"
                      href={`${candidateLinkBase ?? ""}/${candidate.slug}`}
                    >
                      <Image
                        src={`/${candidate.profileImg}`}
                        alt=""
                        fill
                        priority
                        className="max-h-full px-5 py-3"
                      />
                    </Link>

                    {candidateAnswer.option !== null &&
                    candidateAnswer.weighting !== null ? (
                      <div className="flex gap-3">
                        <OptionResult
                          value={candidateAnswer.option}
                          type={candidateAnswer.question.type}
                        />
                        <WeightingResult value={candidateAnswer.weighting} />
                      </div>
                    ) : (
                      <div className="flex w-full items-center justify-center">
                        <QuestionUnansweredResult />
                      </div>
                    )}

                    {candidateAnswer.text ||
                    candidateAnswer.changedQuestionDisclaimer ? (
                      <QuestionInfo
                        text={candidateAnswer.text}
                        disclosure={candidateAnswer.changedQuestionDisclaimer}
                      />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </details>
        </section>
      )}
    </article>
  );
};
