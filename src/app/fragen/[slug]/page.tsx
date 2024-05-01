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
    title: `Mein Wahlchecker EU Ergebnis  – andererseits.org`,
    description: ``,
    twitter: {
      card: "summary_large_image",
      site: "andererseits.org",
      title: `Mein Wahlchecker EU Ergebnis  – andererseits.org`,
      description: ``,
      images: [
        {
          url: `https://andererseits.org/Wahl-Infos/fragen/${params.slug}/opengraph-image`,
          alt: "Wahlchecker EU 2024 – andererseits.org",
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
        <ShareButton title="Wahlchecker EU 2024">Teilen</ShareButton>
        <DownloadImageLink
          title="andererseits-Wahlchecker EU-resultat.jpg"
          href={`/api/og/generate/instagram/result?slug=${params.slug}`}
        >
          Bild herunterladen
        </DownloadImageLink>
      </div>

      <h1 className="my-5 pb-4 text-center text-4xl">
        Vergleiche deine Antworten mit:
      </h1>

      <section aria-label="Die Parteien" className="my-10">
        <nav className="mx-auto my-10 flex w-[724px] max-w-full flex-row flex-wrap items-center justify-evenly gap-y-6 lg:gap-x-3">
          {candidates.map((candidate, index) => (
            <Link
              key={candidate.id}
              className="no-touch:hover:bg-brand group relative z-10 flex h-[88px] w-[170px] overflow-clip rounded-[200px] border  border-black bg-white outline-offset-4 outline-black transition-all focus-visible:outline-2"
              href={`/${candidate.slug}`}
              title={`Zur ${candidate.name} Seite`}
            >
              <Image
                alt=""
                src={`/${candidate.profileImg}`}
                fill
                priority
                className="max-h-full px-5 py-3"
              />
            </Link>
          ))}
        </nav>
      </section>

      <section aria-label="Die Fragen mit den Antworten der Parteien">
        <div className="flex flex-col gap-10 py-10">
          {voterWithAnswers.answers
            .sort((a, b) => a.question.order - b.question.order)
            .map((answer, index) => (
              <article
                aria-labelledby={`aria-label-question-${index + 1}`}
                key={answer.id}
                className="w-full"
              >
                {answer.question.category && (
                  <QuestionCategoryLabel category={answer.question.category} />
                )}
                <div className="mt-3 text-lg">Frage {index + 1}:</div>
                <h2
                  id={`aria-label-question-${index + 1}`}
                  className="mb-5 hyphens-auto font-sans text-2xl"
                >
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
                  <div>
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
                              href={`/fragen/${params.slug}/vergleich/${candidate.slug}`}
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
                  </div>
                </div>
              </article>
            ))}
        </div>
      </section>

      <div className="flex flex-col items-center justify-center gap-5 pt-5 sm:flex-row">
        <BackButton href={`/`}>Zur Startseite</BackButton>
        <ShareButton title="Wahlchecker EU 2024">Teilen</ShareButton>
        <DownloadImageLink
          title="andererseits-Wahlchecker EU-resultat.jpg"
          href={`/api/og/generate/instagram/result?slug=${params.slug}`}
        >
          Bild herunterladen
        </DownloadImageLink>
      </div>
    </div>
  );
}
