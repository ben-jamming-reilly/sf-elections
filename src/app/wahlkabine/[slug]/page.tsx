import { prisma } from "~/lib/prisma";
import { notFound } from "next/navigation";
import {
  categoryHexForLabel,
  optionLabelForValue,
  optionLabelForYesNoValue,
  wahlrechtLabelForValue,
  weightingLabelForValue,
} from "~/data/answers";
import { CopyCurrentUrl } from "~/app/ui/copy-button";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { getVoterViaHash } from "../get-voter-via-hash";
import {
  CandidateQuestionAnswer,
  Question,
  VoterQuestionAnswer,
} from "@prisma/client";

export const metadata = {
  title: "SPÖ Wahlkabine",
  description: "SPÖ Wahlkabine",
};

/**
 * Returns number depending on match
 * 0 = no match
 * 1 = match
 * 2 = same answer
 *
 * @param voterAnswer
 * @param candidateAnswer
 * @returns
 */
const calculateDistnace = (
  voterAnswer: VoterQuestionAnswer & {
    question: Question;
  },
  candidateAnswer: CandidateQuestionAnswer & {
    question: Question;
  }
) => {
  if (voterAnswer.skipped) return 0;

  if (voterAnswer.question.category === "YesNo") {
    if (voterAnswer.option === candidateAnswer.option) return 2;
    return Math.abs(voterAnswer.option! - candidateAnswer.option!);
  }

  if (voterAnswer.question.category === "Wahlrecht") {
    return Math.abs(voterAnswer.option! - candidateAnswer.option!);
  }

  return Math.abs(voterAnswer.option! + candidateAnswer.option!);
};

const calculateScore = (
  voterAnswers: (VoterQuestionAnswer & {
    question: Question;
  })[],
  candidateAnswers: (CandidateQuestionAnswer & {
    question: Question;
  })[]
) => {
  let score = 0;
  voterAnswers.forEach((voterAnswer) => {
    const candidateAnswer = candidateAnswers.find(
      (candidateAnswer) => candidateAnswer.questionId === voterAnswer.questionId
    );

    if (voterAnswer.skipped) return;

    if (candidateAnswer) {
      score +=
        Math.abs(voterAnswer.option! + candidateAnswer.option!) *
        voterAnswer.weighting!;
    }
  });
  return score;
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

  // console.log(
  //   candidates.map((c) => calculateScore(voterWithAnswers.answers!, c.answers))
  // );

  return (
    <div>
      <div className="my-5 flex flex-row">
        <CopyCurrentUrl />
      </div>

      <section className="my-10">
        <h2 className="text-4xl">Die Kandidat:innen</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3">
          {candidates.map((candidate, index) => (
            <li key={candidate.id} className="py-5 rounded-md">
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
                  <span className="absolute rounded-full w-10 h-10 top-3 left-3 bg-brand text-white tabular-nums inline-flex justify-center items-center">
                    {index + 1}.
                  </span>
                </Link>
                <div className="p-5 border-2 z-20 relative rounded-br-md rounded-bl-md border-t-0 bg-white border-brand-yellow">
                  <h2 className="text-3xl text-brand font-medium hyphens-auto">
                    {candidate.name}
                  </h2>

                  <p className="prose mb-5">{candidate.description}</p>

                  <Link
                    className="text-white inline-block active:scale-95 transition-all bg-brand-purple px-4 py-1 rounded-md hover:underline"
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
        <ul className="flex flex-col divide-y-2">
          {voterWithAnswers.answers.map((answer) => (
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
                    Diese Frage wurde nicht beantwortet.
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
