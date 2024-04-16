import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getVoterViaHash } from "../get-voter-via-hash";
import { ShareButton } from "~/app/ui/share-button";
import { OptionResult } from "~/app/ui/option-result";
import { WeightingResult } from "~/app/ui/weighting-result";
import { QuestionUnansweredResult } from "~/app/ui/question-unanswered-result";
import { QuestionCategoryLabel } from "~/app/ui/question-category-label";
import { getCandidatesWithQuestions } from "./get-candidates-with-questions";
import { rateCandidates } from "./rate-candidates";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { BackButton } from "~/app/ui/back-button";
import { QuestionInfo } from "~/app/ui/question-info";
import { SecondaryLink } from "~/app/ui/secondary-link";
import { DownloadImageLink } from "~/app/ui/download-image-link";
import { GlossaredTextServer } from "~/app/ui/glossared-text.server";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export type WahlkabineResultProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: WahlkabineResultProps) {
  const voterWithAnswers = await getVoterViaHash(params.slug);

  if (!voterWithAnswers) {
    notFound();
  }

  return {
    title: `Mein EU-Wahl-Infos Ergebnis  – andererseits.org`,
    description: ``,
    twitter: {
      card: "summary_large_image",
      site: "andererseits.org",
      title: `Mein EU-Wahl-Infos Ergebnis  – andererseits.org`,
      description: ``,
      images: [
        {
          url: `https://andererseits.org/Wahl-Infos/kabine/${params.slug}/opengraph-image`,
          alt: "EU-Wahl-Infos 2024 – andererseits.org",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function WahlkabineResult({
  params,
}: WahlkabineResultProps) {
  const voterWithAnswers = await getVoterViaHash(params.slug);

  if (!voterWithAnswers) {
    notFound();
  }

  const candidates = (await getCandidatesWithQuestions()).sort(
    (a, b) => Math.random() - 0.5,
  );

  return (
    <div>
      <div className="flex flex-col justify-center gap-5 pb-5 sm:flex-row">
        <BackButton href={`/`}>Zur Startseite</BackButton>
        <ShareButton title="EU-Wahl-Infos 2024">Teilen</ShareButton>
        <DownloadImageLink
          title="andererseits-eu-Wahl-Infos-resultat.jpg"
          href={`/api/og/generate/instagram/result?slug=${params.slug}`}
        >
          Bild herunterladen
        </DownloadImageLink>
      </div>

      <h1 className="my-5 pb-4 text-center text-[28px] leading-[34px]">
        Vergleiche deine Antworten mit:
      </h1>

      <section className="my-10">
        <ul className="mx-auto my-10 flex w-[724px] max-w-full flex-row flex-wrap items-center justify-around gap-y-6 lg:gap-x-3">
          {candidates.map((candidate, index) => (
            <li key={candidate.id} className="relative flex flex-col">
              <Link
                className="no-touch:hover:bg-brand group relative z-10 block h-[88px] w-[170px] overflow-clip rounded-[200px] border  border-black bg-white outline-offset-4 outline-black transition-all focus-visible:outline-2"
                href={`/kabine/${params.slug}/vergleich/${candidate.slug}`}
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

      <section aria-label="Fragen & Antworten">
        <ul className="flex flex-col gap-10 py-10">
          {voterWithAnswers.answers
            .sort((a, b) => a.question.order - b.question.order)
            .map((answer, index) => (
              <li key={answer.id} className="w-full">
                {answer.question.category && (
                  <QuestionCategoryLabel category={answer.question.category} />
                )}
                <div className="mt-3 text-lg">Frage {index + 1}:</div>
                <h2 className="mb-5 hyphens-auto font-sans text-2xl">
                  {/* @ts-expect-error */}
                  <GlossaredTextServer text={answer.question.title} />
                </h2>
                <section className="py-4">
                  <h3 className="mb-3 font-semibold">Du hast gesagt:</h3>
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
                </section>

                <div className="mt-5">
                  <details
                    className="group/candidates"
                    open
                    key={`candidate-details-${answer.questionId}`}
                  >
                    <summary className="flex cursor-pointer items-center gap-2 text-[18px] leading-[21px] underline underline-offset-4 outline-2 outline-offset-4 outline-black">
                      Das haben die Parteien gesagt:
                      <ChevronRightIcon className="w-6 transition-all group-open/candidates:rotate-90" />
                    </summary>
                    <ul className="grid grid-cols-1 py-4">
                      {candidates.map((candidate) => {
                        const candidateAnswer = candidate.answers.sort(
                          (a, b) => a.question.order - b.question.order,
                        )[index];

                        if (!candidateAnswer) {
                          return null;
                        }

                        return (
                          <li
                            key={`candidate-details-${candidateAnswer.questionId}-${candidate.id}`}
                            className="relative space-y-4 border-t  border-black pb-16 pt-4"
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

      <div className="flex flex-col items-center justify-center gap-5 pt-5 sm:flex-row">
        <BackButton href={`/`}>Zur Startseite</BackButton>
        <ShareButton title="EU-Wahl-Infos 2024">Teilen</ShareButton>
        <DownloadImageLink
          title="andererseits-eu-Wahl-Infos-resultat.jpg"
          href={`/api/og/generate/instagram/result?slug=${params.slug}`}
        >
          Bild herunterladen
        </DownloadImageLink>
      </div>
    </div>
  );
}
