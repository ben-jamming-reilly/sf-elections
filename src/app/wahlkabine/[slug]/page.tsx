import { prisma } from "~/lib/prisma";
import { notFound } from "next/navigation";
import { Prisma } from ".prisma/client";
import { optionLabelForValue, weightingLabelForValue } from "~/data/answers";
import { CopyCurrentUrl } from "~/app/ui/copy-button";

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
            <span className="text-lg font-semibold">
              Frage {answer.questionId}:
            </span>
            <h2 className="text-3xl mb-5">{answer.question.title}</h2>
            <div className="grid grid-cols-2 gap-5">
              <p className="bg-brand text-center px-3 py-2 text-white rounded-md">
                Stimme ich {optionLabelForValue(answer.option)}
              </p>
              <p className="bg-brand text-center px-3 py-2 text-white rounded-md">
                Ist mir {weightingLabelForValue(answer.weighting)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
