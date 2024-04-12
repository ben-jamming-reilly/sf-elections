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
          <div className="flex sm:flex-row flex-col gap-5 pb-5 items-center justify-center">
            <BackButton href={`/`}>Zur Startseite</BackButton>

            <ShareButton
              title={`Vorsitzbefragungs-Kabinen Antworten von ${candidate.name}`}
            >
              Teilen
            </ShareButton>
          </div>

          <h1 className="text-4xl my-5 pb-4 text-center">
            Wahl-Infos Antworten: {candidate.name}
          </h1>

          <section className="flex justify-center mt-10">
            <div key={candidate.id} className="relative flex flex-col">
              <Link
                className="transition-all border-black border rounded-[200px] group  block z-10 relative overflow-clip w-[170px] h-[88px]"
                href={`/${candidate.slug}`}
              >
                <Image
                  src={`/${candidate.profileImg}`}
                  alt={`Profilebild von ${candidate.name}`}
                  fill
                  priority
                  className="max-h-full py-3 px-5"
                />
              </Link>
            </div>
          </section>

          <div className="flex flex-col gap-4 items-center py-8">
            <h2 className="text-xl block font-medium mb-3">Vergleichen mit:</h2>
            <ul className="flex flex-row flex-wrap gap-x-3 gap-y-8 justify-around">
              {randomOtherCandidates.map((c) => (
                <li key={c.id}>
                  <SecondaryLink href={`vergleich/${candidate.slug}/${c.slug}`}>
                    {c.name}
                  </SecondaryLink>
                </li>
              ))}
              <li>
                <SecondaryLink
                  href={`/vergleich/${candidates.map((c) => c.slug).join("/")}`}
                >
                  Alle
                </SecondaryLink>
              </li>
            </ul>
          </div>

          <ul className="flex flex-col gap-16 py-10">
            {candidate.answers
              .sort((a, b) => a.question.order - b.question.order)
              .map((answer, index) => (
                <li key={answer.id} className="flex flex-col gap-3 items-start">
                  <QuestionCategoryLabel category={answer.question.category} />
                  <div className="text-lg font-semibold">
                    Frage {index + 1}:
                  </div>
                  <h2 className="text-2xl mb-5 hyphens-auto">
                    {answer.question.title}
                  </h2>
                  {answer.option !== null && answer.weighting !== null ? (
                    <div className="flex md:flex-row flex-col gap-3">
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
    </section>
  );
}

export async function generateStaticParams() {
  const candidates = await getCandidates();

  return candidates.map((c) => ({ candidateSlug: c.slug }));
}
