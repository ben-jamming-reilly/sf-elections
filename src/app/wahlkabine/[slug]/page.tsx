import { prisma } from "~/lib/prisma";
import { notFound } from "next/navigation";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { getVoterViaHash } from "../get-voter-via-hash";
import { ShareButton } from "~/app/ui/share-button";
import { OptionResult } from "~/app/ui/option-result";
import { WeightingResult } from "~/app/ui/weighting-result";
import { QuestionUnansweredResult } from "~/app/ui/question-unanswered-result";
import { QuestionCategoryLabel } from "~/app/ui/question-category-label";
import { calculateScore } from "~/data/calucate-score";

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
  const voterWithAnswers = await getVoterViaHash(params.slug);
  const candidates = await prisma.candidate.findMany({
    where: {
      hasFinished: true,
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

  const maxScore = voterWithAnswers.answers.length * 1.15;
  const candidatesWithScore = candidates
    .map((candidate) => {
      return {
        ...candidate,
        score: calculateScore(voterWithAnswers.answers!, candidate.answers),
        scorePercentage: Math.round(
          (calculateScore(voterWithAnswers.answers!, candidate.answers) /
            maxScore) *
            100
        ),
      };
    })
    .sort((a, b) => b.score - a.score);

  return (
    <div>
      <div className="my-5 flex flex-row items-center justify-center">
        <ShareButton title="Schau welche:r SPÖ Vorsitz Kandidat:in am Besten zu mir passt!">
          Teil dein Ergebnis
        </ShareButton>
      </div>

      <section className="my-10">
        <h2 className="text-4xl">Die Kandidat:innen</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {candidatesWithScore.map((candidate, index) => (
            <li key={candidate.id} className="py-5 rounded-md relative">
              <span className="absolute z-30 rounded-full w-14 h-14 top-2 -left-3 bg-brand text-white tabular-nums inline-flex justify-center items-center">
                {candidate.scorePercentage}%
              </span>
              <div className="">
                <Link
                  href={`/wahlkabine/${candidate.slug}`}
                  className="transition-all group rounded-tr-md block z-10 relative w-full overflow-clip rounded-tl-md"
                >
                  <Image
                    src={`/${candidate.profileImg}`}
                    alt={`Profilebild von ${candidate.name}`}
                    width={300}
                    height={300}
                    className=" group-hover:scale-110 ease-in-out transition-all  bg-brand-yellow w-full"
                  />
                </Link>
                <h2 className="text-2xl bg-brand text-white font-medium hyphens-auto px-3 py-2 selection:text-brand selection:bg-white text-center w-[110%] -translate-x-[5%] shadow-md">
                  {index + 1}. {candidate.name}
                </h2>
                <div className="p-5 border-2 z-20 relative rounded-br-md rounded-bl-md border-t-0 bg-white border-gray-800">
                  <p className="prose mb-5">{candidate.description}</p>

                  <Link
                    className="text-white selection:text-brand-purple selection:bg-white inline-block active:scale-95 transition-all bg-brand-purple px-4 py-2 rounded-md hover:underline"
                    href={`/wahlkabine/${params.slug}/${candidate.slug}`}
                  >
                    Vergleichen
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-4xl">Deine Antworten:</h2>
        <ul className="flex flex-col gap-16 py-10">
          {voterWithAnswers.answers.map((answer, index) => (
            <li key={answer.id} className="">
              {answer.question.category && (
                <QuestionCategoryLabel category={answer.question.category} />
              )}
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

              <div className="mt-5">
                <details
                  key={`candidate-details-${answer.questionId}`}
                  className=""
                >
                  <summary className="cursor-pointer font-semibold py-2 border-gray-800">
                    Antworten der Kandidat:innen:
                  </summary>
                  <ul className="grid grid-cols-1 py-5 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {candidatesWithScore.map((candidate) => (
                      <li
                        key={`candidate-details-${answer.questionId}-${candidate.id}`}
                      >
                        <div className="text-center flex flex-row items-center font-semibold py-2 gap-3 justify-center">
                          <Image
                            src={`/${candidate.profileImg}`}
                            alt={`Profilebild von ${candidate.name}`}
                            width={35}
                            height={35}
                            className="rounded-full"
                          />
                          {candidate.name}
                        </div>
                        <div className="grid grid-cols-1 grid-rows-2 gap-3">
                          <OptionResult
                            value={candidate.answers[index].option!}
                            type={candidate.answers[index].question.type}
                          />
                          <WeightingResult
                            value={candidate.answers[index].weighting!}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
