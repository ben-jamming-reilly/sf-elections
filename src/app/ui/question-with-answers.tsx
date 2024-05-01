import Image from "next/image";
import { CandidatesWithQuestions } from "../fragen/[slug]/get-candidates-with-questions";
import { GlossaredTextServer } from "./glossared-text.server";
import { OptionResult } from "./option-result";
import { QuestionCategoryLabel } from "./question-category-label";
import { QuestionUnansweredResult } from "./question-unanswered-result";
import { WeightingResult } from "./weighting-result";
import Link from "next/link";
import { QuestionInfo } from "./question-info";

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
            <div className="flex flex-col gap-3 md:flex-row">
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
        <div className="mt-5">
          <div>
            <ul className="grid grid-cols-1 py-4">
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
                    className="relative space-y-4 border-t border-black pb-16 pt-4"
                  >
                    <Link
                      className="no-touch:hover:bg-brand group absolute -top-5 right-3 z-10 block h-[44px] w-[84px] overflow-clip rounded-[200px] border border-black bg-white outline-offset-4  outline-black transition-all focus-visible:outline-2 md:-top-10 md:right-10 md:h-[88px] md:w-[169px]"
                      href={`${candidateLinkBase}/${candidate.slug}`}
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
                      <div className="flex flex-col gap-3 md:flex-row">
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
          </div>
        </div>
      )}
    </article>
  );
};
