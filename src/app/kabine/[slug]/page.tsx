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
    (a, b) => Math.random() - 0.5
  );

  return (
    <div>
      <div className="flex pb-5 sm:flex-row flex-col gap-5 items-center justify-center">
        <BackButton href={`/`}>Zur Startseite</BackButton>
        <ShareButton title="EU-Wahl-Infos 2024">Teilen</ShareButton>
        <DownloadImageLink
          title="andererseits-eu-Wahl-Infos-resultat.jpg"
          href={`/api/og/generate/instagram/result?slug=${params.slug}`}
        >
          Bild herunterladen
        </DownloadImageLink>
      </div>

      <h1 className="text-[28px] leading-[34px] my-5 pb-4 text-center">
        Vergleiche deine Antworten mit:
      </h1>

      <section className="my-10">
        <ul className="flex flex-row flex-wrap items-center justify-around lg:gap-x-3 gap-y-6 my-10 max-w-full w-[724px] mx-auto">
          {candidates.map((candidate, index) => (
            <li key={candidate.id} className="relative flex flex-col">
              <Link
                className="transition-all no-touch:hover:bg-brand bg-white focus-visible:outline-2 outline-offset-4 outline-black border-black border rounded-[200px] group  block z-10 relative overflow-clip w-[170px] h-[88px]"
                href={`/kabine/${params.slug}/vergleich/${candidate.slug}`}
              >
                <Image
                  src={`/${candidate.profileImg}`}
                  alt={`Profilebild von ${candidate.name}`}
                  fill
                  priority
                  className="max-h-full py-3 px-5"
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
                <div className="text-lg mt-3">Frage {index + 1}:</div>
                <h2 className="text-2xl font-sans mb-5 hyphens-auto">
                  {answer.question.title}
                </h2>
                <section className="py-4">
                  <h3 className="mb-3 font-semibold">Du hast gesagt:</h3>
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
                </section>

                <div className="mt-5">
                  <details open key={`candidate-details-${answer.questionId}`}>
                    <summary className="cursor-pointer underline underline-offset-2 font-semibold pb-3 border-black">
                      Das haben die Parteien gesagt:
                    </summary>
                    <ul className="grid grid-cols-1">
                      {candidates.map((candidate) => {
                        const candidateAnswer = candidate.answers.sort(
                          (a, b) => a.question.order - b.question.order
                        )[index];

                        if (!candidateAnswer) {
                          return null;
                        }

                        return (
                          <li
                            key={`candidate-details-${candidateAnswer.questionId}-${candidate.id}`}
                            className="pb-16 border-t border-black  relative space-y-4 pt-4"
                          >
                            <Link
                              className="transition-all absolute right-3 md:right-10 -top-5 md:-top-10 no-touch:hover:bg-brand bg-white focus-visible:outline-2 outline-offset-4 outline-black border-black border rounded-[200px] group  block z-10 overflow-clip w-[84px] h-[44px] md:w-[169px] md:h-[88px]"
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
                            {candidateAnswer.option !== null &&
                            candidateAnswer.weighting !== null ? (
                              <div className="flex md:flex-row flex-col gap-3">
                                <OptionResult
                                  value={candidateAnswer.option}
                                  type={candidateAnswer.question.type}
                                />
                                <WeightingResult
                                  value={candidateAnswer.weighting}
                                />
                              </div>
                            ) : (
                              <div className="w-full flex items-center justify-center">
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

      <div className="flex pt-5 sm:flex-row flex-col gap-5 items-center justify-center">
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
