import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OptionResult } from "~/app/ui/option-result";
import { QuestionCategoryLabel } from "~/app/ui/question-category-label";
import { ShareButton } from "~/app/ui/share-button";
import { WeightingResult } from "~/app/ui/weighting-result";
import { getCandidatesFromSlugs } from "./get-candidates-from-slugs";
import { Metadata } from "next";
import { SecondaryLink } from "~/app/ui/secondary-link";
import { BackButton } from "~/app/ui/back-button";
import { QuestionUnansweredResult } from "~/app/ui/question-unanswered-result";
import { QuestionInfo } from "~/app/ui/question-info";

export const revalidate = 3600; // 1 hour

export type CandidateComparisonProps = {
  params: {
    candidateSlugs: string[];
  };
};

export async function generateMetadata({
  params,
}: CandidateComparisonProps): Promise<Metadata> {
  const candidates = await getCandidatesFromSlugs(params.candidateSlugs);

  if (candidates.length !== params.candidateSlugs.length) {
    notFound();
  }

  return {
    title: `Vergleich zwischen ${candidates.map((c) => c.name).join(" und ")}`,
    description: `Vergleich zwischen ${candidates
      .map((c) => c.name)
      .join(" und ")}`,
    openGraph: {
      images: [
        {
          url: `/api/og?type=vergleich&candidateSlugs=${params.candidateSlugs.join(
            ","
          )}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function CandidateComparison({
  params,
}: CandidateComparisonProps) {
  if (params.candidateSlugs.length < 2) {
    notFound();
  }

  const candidates = await getCandidatesFromSlugs(params.candidateSlugs);

  if (candidates.length !== params.candidateSlugs.length) {
    notFound();
  }

  const randomCandidates = candidates.sort(
    (c) => Math.random() - Math.random()
  );

  return (
    <>
      <div>
        <div className="flex sm:flex-row flex-col gap-5 pb-5 items-center justify-center">
          <BackButton href={`/`}>Zur Startseite</BackButton>
          <ShareButton
            title={`Vergleich zwischen ${randomCandidates
              .map((c) => c.name)
              .join(" und ")}`}
            text="Schau dir die Antworten der Kandidat*innen an für die SPÖ Vorsitzbefragung Kabine an."
          >
            Seite teilen
          </ShareButton>
        </div>

        <h1 className="text-4xl my-5 pb-4 text-center border-b-2 border-gray-800 dark:border-white">
          Vergleich zwischen <br />
          {`${randomCandidates.map((c) => c.name).join(" & ")}`}
        </h1>

        <section className="my-10">
          <ul className="flex flex-row scroll-mx-5  overflow-x-auto snap-x gap-5 snap-mandatory lg:gap-10 my-10 max-w-full">
            {randomCandidates.map((candidate) => (
              <li
                key={candidate.id}
                className="md:flex-1 min-w-[250px] snap-start rounded-md relative flex flex-col"
              >
                <div className="flex-grow flex flex-col">
                  <Link
                    className="transition-all group rounded-tr-md block z-10 relative w-full overflow-clip rounded-tl-md aspect-square"
                    href={`/${candidate.slug}`}
                  >
                    <Image
                      src={`/${candidate.profileImg}`}
                      alt={`Profilebild von ${candidate.name}`}
                      fill
                      className=" group-hover:scale-110 ease-in-out transition-all  bg-brand-yellow w-full"
                    />
                  </Link>
                  <h2 className="text-2xl bg-brand text-white font-medium hyphens-auto px-3 py-2 selection:text-brand selection:bg-white text-center w-full shadow-md">
                    {candidate.name}
                  </h2>
                  <div className="p-5 flex-grow border-2 border-brand rounded-bl-md rounded-br-md flex flex-col justify-between items-start">
                    <p className="prose mb-5">{candidate.description}</p>
                    <SecondaryLink href={`/${candidate.slug}`}>
                      {`${candidate.name}s Antworten`}
                    </SecondaryLink>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <ul className="flex flex-col gap-16 py-10">
            {candidates[0]?.answers
              .sort((a, b) => a.question.order - b.question.order)
              .map((answer, index) => (
                <li key={answer.id} className="py-5">
                  {answer.question.category && (
                    <QuestionCategoryLabel
                      category={answer.question.category}
                    />
                  )}
                  <div className="text-lg font-semibold">
                    Frage {index + 1}:
                  </div>
                  <h2 className="text-xl md:text-2xl mb-2 md:mb-5 hyphens-auto">
                    {answer.question.title}
                  </h2>

                  <ul className="grid grid-cols-1 py-5  gap-5">
                    {randomCandidates.map((candidate) => (
                      <li
                        className="flex-1 space-y-4"
                        key={`candidate-details-${answer.questionId}-${candidate.id}`}
                      >
                        <Link
                          href={`/${candidate.slug}`}
                          className="text-center flex flex-row items-center font-semibold gap-3 justify-center dark:text-white hover:underline underline-offset-2"
                        >
                          <Image
                            src={`/${candidate.profileImg}`}
                            alt={`Profilebild von ${candidate.name}`}
                            width={35}
                            height={35}
                            className="rounded-full"
                          />
                          {candidate.name}
                        </Link>
                        {candidate.answers.sort(
                          (a, b) => a.question.order - b.question.order
                        )[index].option !== null &&
                        candidate.answers.sort(
                          (a, b) => a.question.order - b.question.order
                        )[index].weighting !== null ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <OptionResult
                              value={
                                candidate.answers.sort(
                                  (a, b) => a.question.order - b.question.order
                                )[index].option!
                              }
                              type={
                                candidate.answers.sort(
                                  (a, b) => a.question.order - b.question.order
                                )[index].question.type
                              }
                            />
                            <WeightingResult
                              value={
                                candidate.answers.sort(
                                  (a, b) => a.question.order - b.question.order
                                )[index].weighting!
                              }
                            />
                          </div>
                        ) : (
                          <div className="w-full flex items-center justify-center">
                            <QuestionUnansweredResult />
                          </div>
                        )}
                        {candidate.answers.sort(
                          (a, b) => a.question.order - b.question.order
                        )[index].text && (
                          <QuestionInfo
                            text={
                              candidate.answers.sort(
                                (a, b) => a.question.order - b.question.order
                              )[index].text
                            }
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </>
  );
}
