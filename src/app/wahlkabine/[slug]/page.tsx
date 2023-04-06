import { prisma } from "~/lib/prisma";
import { notFound } from "next/navigation";
import { Prisma } from ".prisma/client";
import {
  categoryHexForLabel,
  optionLabelForValue,
  weightingLabelForValue,
} from "~/data/answers";
import { CopyCurrentUrl } from "~/app/ui/copy-button";
import clsx from "clsx";

export const metadata = {
  title: "SPÖ Wahlkabine",
  description: "SPÖ Wahlkabine",
};

export default async function Wahlkabine({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const voterWithAnswers = await prisma.voter.findUnique({
    where: {
      hash: params.slug,
    },
    include: {
      answers: {
        include: {
          question: true,
        },
      },
    },
  });

  if (!voterWithAnswers) {
    notFound();
  }

  return (
    <section>
      <h1 className="text-5xl">Ihr Ergebnis:</h1>
      <div className="my-5">
        <CopyCurrentUrl />
      </div>
      <ul className="flex flex-col divide-y-2">
        {voterWithAnswers.answers.map((answer) => (
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
            <h2 className="text-2xl mb-5">{answer.question.title}</h2>
            <div className="grid grid-cols-2 gap-5">
              <p className="border-brand bg-red-50/50 text-center px-3 py-2 text-gray-800 underline underline-offset-2">
                Ich stimme {optionLabelForValue(answer.option)}
              </p>
              <p className="border-brand bg-red-50/50 text-center px-3 py-2 text-gray-800 underline underline-offset-2">
                Ist mir {weightingLabelForValue(answer.weighting)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
