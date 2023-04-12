import { prisma } from "~/lib/prisma";
import { getVoterViaHash } from "../../get-voter-via-hash";
import { notFound } from "next/navigation";
import clsx from "clsx";
import {
  categoryHexForLabel,
  optionLabelForValue,
  optionLabelForYesNoValue,
  wahlrechtLabelForValue,
  weightingLabelForValue,
} from "~/data/answers";
import Link from "next/link";

export const metadata = {
  title: "Vergleich | SPÖ Wahlkabine",
  description: "SPÖ Wahlkabine",
};

export default async function Wahlkabine({
  params,
}: {
  params: {
    slug: string;
    "candidate-slug": string;
  };
}) {
  const voterWithAnswers = await getVoterViaHash(params.slug);
  const candidate = await prisma.candidate.findUnique({
    where: {
      slug: params["candidate-slug"],
    },
    include: {
      answers: {
        include: {
          question: true,
        },
      },
    },
  });

  if (!candidate || !candidate.hasFinished || !voterWithAnswers) {
    notFound();
  }

  return (
    <div>
      <Link
        href={`/wahlkabine/${params.slug}`}
        className="bg-brand text-white px-3 py-2 hover:bg-brand/90 active:scale-95 inline-block transition-all rounded-md mb-10"
      >
        Zurück zur Übersicht
      </Link>

      <h1 className="text-4xl font-medium">Vergleich mit {candidate.name}</h1>

      <ul className="flex flex-col divide-y-2">
        {voterWithAnswers.answers.map((answer, index) => (
          <li key={answer.id} className="py-5">
            <span
              className={clsx(
                "inline-block px-2 py-1 text-sm mb-2 h-[2em]",
                answer.question.category && "text-white"
              )}
              style={{
                backgroundColor: categoryHexForLabel(answer.question.category),
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

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div>Deine Antwort:</div>
                {answer.option !== null && answer.weighting !== null ? (
                  <div className="grid grid-cols-2 gap-5">
                    <p className="border-brand bg-red-50/50 text-center px-3 py-2 text-gray-800 underline underline-offset-2">
                      {answer.question.type === "YesNo" &&
                        optionLabelForYesNoValue(answer.option)}
                      {answer.question.type === "Range" &&
                        `Ich stimme ${optionLabelForValue(answer.option)}`}
                      {answer.question.type === "Wahlrecht" &&
                        wahlrechtLabelForValue(answer.option)}
                    </p>
                    <p className="border-brand bg-red-50/50 text-center px-3 py-2 text-gray-800 underline underline-offset-2">
                      Ist mir {weightingLabelForValue(answer.weighting)}
                    </p>
                  </div>
                ) : (
                  <div className="w-full">
                    <p className="border-brand bg-red-50/50 text-center px-3 py-2 text-gray-800 underline underline-offset-2">
                      Diese Frage hast du nicht beantwortet.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div>
                  Anwort von{" "}
                  <strong className="font-semibold">{candidate.name}</strong>:
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <p className="border-brand bg-red-50/50 text-center px-3 py-2 text-gray-800 underline underline-offset-2">
                    {candidate.answers[index]?.question.type === "YesNo" &&
                      optionLabelForYesNoValue(
                        candidate.answers[index].option!
                      )}
                    {candidate.answers[index]?.question.type === "Range" &&
                      `Ich stimme ${optionLabelForValue(
                        candidate.answers[index].option!
                      )}`}
                    {candidate.answers[index]?.question.type === "Wahlrecht" &&
                      wahlrechtLabelForValue(candidate.answers[index].option!)}
                  </p>
                  <p className="border-brand bg-red-50/50 text-center px-3 py-2 text-gray-800 underline underline-offset-2">
                    Ist mir{" "}
                    {weightingLabelForValue(
                      candidate.answers[index].weighting!
                    )}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
