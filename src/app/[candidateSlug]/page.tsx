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
      <h1 className="text-3xl">Wahlkabine für {candidate.name}</h1>
      {candidate.hasFinished ? (
        <div className="mt-10">
          <div className="my-5">
            <ShareButton>Teilen</ShareButton>
          </div>
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
                <h2 className="text-xl mb-5">{answer.question.title}</h2>
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
