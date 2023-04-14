import Link from "next/link";
import { notFound } from "next/navigation";
import { getCandidateFromSlug } from "../get-candidate-from-slug";
import clsx from "clsx";
import {
  categoryHexForLabel,
  optionLabelForValue,
  wahlrechtLabelForValue,
  weightingLabelForValue,
} from "~/data/answers";
import { EditQuestionButton } from "./edit-question-button";
import { optionLabelForYesNoValue } from "../../../data/answers";
import { QuestionCategoryLabel } from "~/app/ui/question-category-label";
import { OptionResult } from "~/app/ui/option-result";
import { WeightingResult } from "~/app/ui/weighting-result";
import { QuestionUnansweredResult } from "~/app/ui/question-unanswered-result";

export const metadata = {
  title: "SPÖ Wahlkabine",
  description: "SPÖ Wahlkabine",
};

export default async function CandidatePreWahlkabine({
  params,
}: {
  params: { candidateSlug: string; hash: string };
}) {
  const candidate = await getCandidateFromSlug(params.candidateSlug);

  if (!candidate || candidate.hash !== params.hash) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl">Wahlkabine für {candidate.name}</h1>
      <p className="my-3">Beantworten die Fragen für die Vorsitzwahlkabine!</p>

      <Link
        href={`/${candidate.slug}/${candidate.hash}/wahlkabine`}
        className="bg-brand text-white px-3 py-2 hover:bg-brand/90 active:scale-95 inline-flex text-center transition-all rounded-md focus-visible:outline-brand outline-offset-2"
      >
        Kandidaten-Wahlkabine starten/bearbeiten
      </Link>

      <section className="mt-10">
        <ul className="flex flex-col gap-16 py-10">
          {candidate.answers.map((answer) => (
            <li key={answer.id}>
              <QuestionCategoryLabel category={answer.question.category} />
              <div className="text-lg font-semibold">
                Frage {answer.questionId}:
              </div>
              <h2 className="text-2xl mb-5 hyphens-auto">
                {answer.question.title}
              </h2>
              {answer.option !== null && answer.weighting !== null ? (
                <div className="grid grid-cols-1 grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-5">
                  <OptionResult
                    value={answer.option}
                    type={answer.question.type}
                  />
                  <WeightingResult value={answer.weighting!} />
                </div>
              ) : (
                <div className="w-full">
                  <QuestionUnansweredResult />
                </div>
              )}
              {answer.option && answer.weighting ? (
                <div className="py-3">
                  <h3 className="underline underline-offset-2">
                    Zusätzliche Information:
                  </h3>
                  <p className="py-1 text-lg">
                    {answer.text ? answer.text : "---"}
                  </p>
                </div>
              ) : null}
              <div className="mt-3">
                <EditQuestionButton
                  questionId={answer.questionId}
                  url={`/${candidate.slug}/${candidate.hash}/wahlkabine`}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
