import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { OptionResult } from "~/app/ui/option-result";
import { QuestionCategoryLabel } from "~/app/ui/question-category-label";
import { QuestionUnansweredResult } from "~/app/ui/question-unanswered-result";
import { ShareButton } from "~/app/ui/share-button";
import { WeightingResult } from "~/app/ui/weighting-result";
import { prisma } from "~/lib/prisma";

const getCandidatesFromSlugs = cache(async (candidateSlugs: string[]) => {
  return await prisma.candidate.findMany({
    where: {
      slug: {
        in: candidateSlugs,
      },
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
});

export async function generateMetaData({
  params,
}: {
  params: {
    candidateSlugs: string[];
  };
}) {
  const candidates = await getCandidatesFromSlugs(params.candidateSlugs);

  if (candidates.length !== params.candidateSlugs.length) {
    notFound();
  }

  return {
    title: `Vergleich zwischen ${candidates.map((c) => c.name).join(" und ")}`,
    description: `Vergleich zwischen ${candidates
      .map((c) => c.name)
      .join(" und ")}`,
  };
}

export const revalidate = 3600;

export default async function Wahlkabine({
  params,
}: {
  params: {
    candidateSlugs: string[];
  };
}) {
  if (params.candidateSlugs.length < 2) {
    notFound();
  }

  const candidates = await getCandidatesFromSlugs(params.candidateSlugs);

  if (candidates.length !== params.candidateSlugs.length) {
    notFound();
  }

  return (
    <div>
      <div className="my-5 flex flex-row items-center justify-center">
        <ShareButton
          title={`Vergleich zwischen ${candidates
            .map((c) => c.name)
            .join(" und ")}`}
          text="Schau dir die Antworten der Kandidat*innen an für die SPÖ Vorsitzwahl Kabine an."
        >
          Seite teilen
        </ShareButton>
      </div>

      <section className="my-10">
        <h1 className="text-3xl md:text-4xl font-medium">
          {`Vergleich zwischen ${candidates.map((c) => c.name).join(" und ")}`}
        </h1>
        <ul className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {candidates.map((candidate) => (
            <li key={candidate.id} className="py-5 rounded-md relative">
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
                  {candidate.name}
                </h2>
                <div className="p-5 border-2 z-20 relative rounded-br-md rounded-bl-md border-t-0 bg-white border-gray-800">
                  <p className="prose mb-5">{candidate.description}</p>
                  <Link
                    className="text-white selection:text-brand-purple selection:bg-white inline-block active:scale-95 transition-all bg-brand-purple px-4 py-2 rounded-md hover:underline"
                    href={`/${candidate.slug}`}
                  >
                    Profile
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <ul className="flex flex-col gap-16 py-10">
          {candidates[0]?.answers.map((answer) => (
            <li key={answer.id} className="py-5">
              {answer.question.category && (
                <QuestionCategoryLabel category={answer.question.category} />
              )}
              <div className="text-lg font-semibold">
                Frage {answer.questionId}:
              </div>
              <h2 className="text-xl md:text-2xl mb-2 md:mb-5 hyphens-auto">
                {answer.question.title}
              </h2>

              <ul className="grid grid-cols-1 py-5 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {candidates.map((candidate, index) => (
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
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
