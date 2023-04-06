import Link from "next/link";
import { notFound } from "next/navigation";
import { getCandidateFromSlug } from "../get-candidate-from-slug";
import clsx from "clsx";
import {
  categoryHexForLabel,
  optionLabelForValue,
  weightingLabelForValue,
} from "~/data/answers";
import { EditQuestionButton } from "./edit-question-button";

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
      <p className="my-3">
        Beantworten Sie die Fragen für die Vorstandswahlkabine!
      </p>

      <Link
        href={`/${candidate.slug}/${candidate.hash}/wahlkabine`}
        className="bg-brand text-white px-3 py-2 hover:bg-brand/90 active:scale-95 inline-flex text-center transition-all rounded-md focus-visible:outline-brand outline-offset-2"
      >
        Kandidaten-Wahlkabine starten/bearbeiten
      </Link>

      <section className="mt-10">
        <ul className="flex flex-col divide-y-2">
          {candidate.answers.map((answer) => (
            <li key={answer.id} className="py-5">
              <span
                className={clsx(
                  "inline-block px-2 py-1 text-sm mb-2 h-[2em]",
                  answer.question.category && "text-white"
                )}
                style={{
                  backgroundColor: categoryHexForLabel(
                    answer.question.category
                  ),
                }}
              >
                {answer.question.category}
              </span>
              <div className="text-lg font-semibold">
                Frage {answer.questionId}:
              </div>
              <h2 className="text-2xl mb-5 hyphens-auto">
                {answer.question.title}
              </h2>
              {answer.option && answer.weighting ? (
                <div className="grid grid-cols-2 gap-5">
                  <p className="border-brand bg-red-50/50 text-center px-3 py-2 text-gray-800 underline underline-offset-2">
                    Ich stimme {optionLabelForValue(answer.option)}
                  </p>
                  <p className="border-brand bg-red-50/50 text-center px-3 py-2 text-gray-800 underline underline-offset-2">
                    Ist mir {weightingLabelForValue(answer.weighting)}
                  </p>
                </div>
              ) : (
                <div className="w-full">
                  <p className="border-brand bg-red-50/50 text-center px-3 py-2 text-gray-800 underline underline-offset-2">
                    Diese Frage is nicht beantwortet.
                  </p>
                </div>
              )}
              {answer.option && answer.weighting && (
                <div className="py-3">
                  <h3 className="underline underline-offset-2">
                    Zusätzliche Information:
                  </h3>
                  <p className="py-1 text-lg">
                    {answer.text ? answer.text : "---"}
                  </p>
                </div>
              )}
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
