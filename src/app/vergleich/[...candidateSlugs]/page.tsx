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
import { GlossaredTextServer } from "~/app/ui/glossared-text.server";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { QuestionWithAnswers } from "~/app/ui/question-with-answers";

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

  const toolbar = (
    <aside
      aria-label="Zur Startseite und Teilen"
      className="flex flex-col items-center justify-center gap-5 pb-5 sm:flex-row"
    >
      <BackButton href={`/`}>Zur Startseite</BackButton>
      <ShareButton
        title={`Vergleich zwischen ${randomCandidates
          .map((c) => c.name)
          .join(" und ")}`}
        text="Wahlchecker EU 2024 – andereseits.org"
      >
        Seite teilen
      </ShareButton>
    </aside>
  );

  return (
    <div>
      {toolbar}
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

      <section
        aria-label="Die Antworten der Parteien im Vergleich"
        className="flex flex-col gap-10 py-10"
      >
        {candidates[0]?.answers
          .sort((a, b) => a.question.order - b.question.order)
          .map((answer, index) => (
            <QuestionWithAnswers
              key={answer.id}
              question={answer.question}
              candidatesAnswers={candidates}
            />
          ))}
      </section>

      {toolbar}
    </div>
  );
}

export async function generateStaticParams() {
  const candidates = await getCandidates();

  const comboPairs = constructComparision(
    candidates.sort((c) => Math.random() - Math.random()),
  );

  return comboPairs.map((c) => ({ params: { candidateSlug: c.slug } }));
}
