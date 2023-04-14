import Link from "next/link";
import { notFound } from "next/navigation";
import { getCandidateFromSlug } from "./get-candidate-from-slug";
import {
  categoryHexForLabel,
  optionLabelForValue,
  weightingLabelForValue,
} from "~/data/answers";
import clsx from "clsx";
import { headers } from "next/headers";
import { ShareButton } from "../ui/share-button";
import { EditQuestionButton } from "./[hash]/edit-question-button";
import { OptionResult } from "../ui/option-result";
import { WeightingResult } from "../ui/weighting-result";
import { QuestionUnansweredResult } from "../ui/question-unanswered-result";
import { QuestionCategoryLabel } from "../ui/question-category-label";

export const metadata = {
  title: "SPÖ Wahlkabine",
  description: "SPÖ Wahlkabine",
};

export default async function CandidateWahlkabine({
  params,
}: {
  params: { candidateSlug: string };
}) {
  // headers(); // This is needed to make the page dynamic and not static
  const candidate = await getCandidateFromSlug(params.candidateSlug);

  if (!candidate) {
    notFound();
  }

  return (
    <section>
      <h1 className="text-3xl">Wahlkabinen Antworten von {candidate.name}</h1>
      {candidate.hasFinished ? (
        <div className="mt-10">
          <div className="my-5 flex flex-row items-center justify-center">
            <ShareButton title={`Wahlkabinen Antworten von ${candidate.name}`}>
              Profil von {candidate.name} teilen
            </ShareButton>
          </div>
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
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="my-2">
          {candidate.name} hat die Wahlkabine noch nicht beantwortet.
        </p>
      )}
    </section>
  );
}
