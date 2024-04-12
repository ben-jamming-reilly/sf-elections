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
import { BASE_URL } from "~/app/api/og/baseUrl";
import { getCandidates } from "~/app/get-candidates";
import { constructComparision } from "./construct-comparision";

export const revalidate = false;

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
          url: `${BASE_URL}/api/og?type=vergleich&candidateSlugs=${params.candidateSlugs.join(
            ",",
          )}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "andererseits.org",
      title: `Vergleich zwischen ${candidates
        .map((c) => c.name)
        .join(" und ")}`,
      description: `Vergleich zwischen ${candidates
        .map((c) => c.name)
        .join(" und ")}`,
      images: [
        {
          url: `${BASE_URL}/api/og?type=vergleich&candidateSlugs=${params.candidateSlugs.join(
            ",",
          )}`,
          alt: "EU-Whalinfos 2024 – andereseits.org",
          width: 1200,
          height: 630,
        },
      ],
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
    (c) => Math.random() - Math.random(),
  );

  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center gap-5 pb-5 sm:flex-row">
          <BackButton href={`/`}>Zur Startseite</BackButton>
          <ShareButton
            title={`Vergleich zwischen ${randomCandidates
              .map((c) => c.name)
              .join(" und ")}`}
            text="EU-Wahl-Infos 2024 – andereseits.org"
          >
            Seite teilen
          </ShareButton>
        </div>

        <h1 className="my-5 border-b-2 border-black pb-4 text-center text-4xl">
          Vergleich zwischen <br />
          {`${randomCandidates.map((c) => c.name).join(" & ")}`}
        </h1>

        <section className="my-10">
          <ul className="mx-auto my-10 flex w-[724px] max-w-full flex-row flex-wrap items-center justify-around gap-y-6 lg:gap-x-3">
            {randomCandidates.map((candidate) => (
              <li key={candidate.id} className="relative flex flex-col">
                <Link
                  className="no-touch:hover:bg-brand group relative z-10 block h-[88px] w-[170px] overflow-clip rounded-[200px] border  border-black bg-white outline-offset-4 outline-black transition-all focus-visible:outline-2"
                  href={`/${candidate.slug}`}
                >
                  <Image
                    src={`/${candidate.profileImg}`}
                    alt={`Profilebild von ${candidate.name}`}
                    fill
                    priority
                    className="max-h-full px-5 py-3"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <ul className="flex flex-col gap-10 py-10">
            {candidates[0]?.answers
              .sort((a, b) => a.question.order - b.question.order)
              .map((answer, index) => (
                <li key={answer.id} className="w-full py-5">
                  {answer.question.category && (
                    <QuestionCategoryLabel
                      category={answer.question.category}
                    />
                  )}
                  <div className="mt-3 text-lg">Frage {index + 1}:</div>
                  <h2 className="mb-5 hyphens-auto font-sans text-2xl">
                    {answer.question.title}
                  </h2>

                  <div className="mt-5">
                    <details
                      open
                      key={`candidate-details-${answer.questionId}`}
                    >
                      <summary className="cursor-pointer border-black pb-3 font-semibold underline underline-offset-2">
                        Das haben die Parteien gesagt:
                      </summary>
                      <ul className="grid grid-cols-1 py-4">
                        {randomCandidates.map((candidate) => {
                          const candidateAnswer = candidate.answers.sort(
                            (a, b) => a.question.order - b.question.order,
                          )[index];

                          if (!candidateAnswer) {
                            return null;
                          }

                          return (
                            <li
                              key={`candidate-details-${candidateAnswer.questionId}-${candidate.id}`}
                              className="relative space-y-4 border-t border-black  pb-8 pt-4 md:pb-16"
                            >
                              <Link
                                className="no-touch:hover:bg-brand group absolute -top-5 right-3 z-10 block h-[44px] w-[84px] overflow-clip rounded-[200px] border border-black bg-white outline-offset-4  outline-black transition-all focus-visible:outline-2 md:-top-10 md:right-10 md:h-[88px] md:w-[169px]"
                                href={`/${candidate.slug}`}
                              >
                                <Image
                                  src={`/${candidate.profileImg}`}
                                  alt={`Profilebild von ${candidate.name}`}
                                  fill
                                  priority
                                  className="max-h-full px-5 py-3"
                                />
                              </Link>
                              {candidateAnswer.option !== null &&
                              candidateAnswer.weighting !== null ? (
                                <div className="flex flex-col gap-3 md:flex-row">
                                  <OptionResult
                                    value={candidateAnswer.option}
                                    type={candidateAnswer.question.type}
                                  />
                                  <WeightingResult
                                    value={candidateAnswer.weighting}
                                  />
                                </div>
                              ) : (
                                <div className="flex w-full items-center justify-center">
                                  <QuestionUnansweredResult />
                                </div>
                              )}
                              {candidateAnswer.text ||
                              candidateAnswer.changedQuestionDisclaimer ? (
                                <QuestionInfo
                                  text={candidateAnswer.text}
                                  disclosure={
                                    candidateAnswer.changedQuestionDisclaimer
                                  }
                                />
                              ) : null}
                            </li>
                          );
                        })}
                      </ul>
                    </details>
                  </div>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const candidates = await getCandidates();

  const comboPairs = constructComparision(
    candidates.sort((c) => Math.random() - Math.random()),
  );

  return comboPairs.map((c) => ({ params: { candidateSlug: c.slug } }));
}
