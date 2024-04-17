import { notFound } from "next/navigation";
import { getCandidateFromSlug } from "./get-candidate-from-slug";
import { ShareButton } from "../ui/share-button";
import { OptionResult } from "../ui/option-result";
import { WeightingResult } from "../ui/weighting-result";
import { QuestionUnansweredResult } from "../ui/question-unanswered-result";
import { QuestionCategoryLabel } from "../ui/question-category-label";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { BackButton } from "../ui/back-button";
import { getCandidates } from "../get-candidates";
import { SecondaryLink } from "../ui/secondary-link";
import { QuestionInfo } from "../ui/question-info";
import { constructComparision } from "../vergleich/[...candidateSlugs]/construct-comparision";
import { GlossaredTextServer } from "../ui/glossared-text.server";

export const revalidate = false;

export type CandidateProfileProps = {
  params: { candidateSlug: string };
};

export async function generateMetadata({ params }: CandidateProfileProps) {
  const candidate = await getCandidateFromSlug(params.candidateSlug);

  if (!candidate) {
    notFound();
  }

  return {
    title: `${candidate.name} | EU-Wahl-Infos 2024`,
    description: `15 Fragen beantwortet von ${candidate.name}.`,
    twitter: {
      card: "summary_large_image",
      site: "andererseits.org/",
      images: [
        {
          url: `https://andererseits.org/Wahl-Infos/${params.candidateSlug}/opengraph-image`,
          alt: "EU-Wahl-Infos 2024",
        },
      ],
    },
  };
}

export default async function CandidateProfile({
  params,
}: CandidateProfileProps) {
  const candidate = await getCandidateFromSlug(params.candidateSlug);

  if (!candidate) {
    notFound();
  }

  const candidates = await getCandidates();
  const randomOtherCandidates = candidates
    .filter((c) => c.id !== candidate.id)
    .sort((c) => Math.random() - Math.random());

  return (
    <section>
      {candidate.hasFinished ? (
        <div className="mb-5">
          <div className="flex flex-col items-center justify-center gap-5 pb-5 sm:flex-row">
            <BackButton href={`/`}>Zur Startseite</BackButton>

            <ShareButton
              title={`Vorsitzbefragungs-Kabinen Antworten von ${candidate.name}`}
            >
              Teilen
            </ShareButton>
          </div>

          <h1 className="my-5 pb-4 text-center text-4xl">
            Wahl-Infos Antworten: {candidate.name}
          </h1>

          <section className="my-8 flex justify-center">
            <div key={candidate.id} className="relative flex flex-col">
              <Link
                className="group relative z-10 block h-[88px]  w-[170px] overflow-clip rounded-[200px] border border-black outline-offset-4 outline-black transition-all focus-visible:outline-2"
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
            </div>
          </section>

          <div className="flex flex-col items-center gap-1 py-6 text-[18px] leading-[21px]">
            <h2 className="mb-3 block font-medium uppercase ">
              Vergleichen mit:
            </h2>
            <ul className="flex flex-row flex-wrap justify-around gap-y-8 divide-x divide-black">
              {randomOtherCandidates.map((c) => (
                <li key={c.id}>
                  <Link
                    className="mx-3 px-3 outline-offset-4 outline-black"
                    href={`vergleich/${candidate.slug}/${c.slug}`}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  className="mx-3 px-3 outline-offset-4 outline-black"
                  href={`/vergleich/${candidates.map((c) => c.slug).join("/")}`}
                >
                  ALLE
                </Link>
              </li>
            </ul>
          </div>

          <ul className="flex flex-col gap-16 py-10">
            {candidate.answers
              .sort((a, b) => a.question.order - b.question.order)
              .map((answer, index) => (
                <li key={answer.id} className="flex flex-col items-start gap-3">
                  <QuestionCategoryLabel category={answer.question.category} />
                  <div className="text-lg font-semibold">
                    Frage {index + 1}:
                  </div>
                  <h2 className="mb-5 hyphens-auto text-2xl">
                    {/* @ts-expect-error */}
                    <GlossaredTextServer text={answer.question.title} />
                  </h2>
                  {answer.option !== null && answer.weighting !== null ? (
                    <div className="flex flex-col gap-3 md:flex-row">
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
                  {answer.text || answer.changedQuestionDisclaimer ? (
                    <div className=" my-3">
                      <QuestionInfo
                        open
                        text={answer.text}
                        disclosure={answer.changedQuestionDisclaimer}
                      />
                    </div>
                  ) : null}
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <p className="my-2">
          {candidate.name} hat die Wahlkabine noch nicht beantwortet.
        </p>
      )}

      <div className="flex flex-col items-center justify-center gap-5 pb-5 sm:flex-row">
        <BackButton href={`/`}>Zur Startseite</BackButton>

        <ShareButton
          title={`Vorsitzbefragungs-Kabinen Antworten von ${candidate.name}`}
        >
          Teilen
        </ShareButton>
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const candidates = await getCandidates();

  return candidates.map((c) => ({ candidateSlug: c.slug }));
}
