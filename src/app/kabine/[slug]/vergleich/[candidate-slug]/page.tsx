import { getVoterViaHash } from "../../../get-voter-via-hash";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShareButton } from "~/app/ui/share-button";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { QuestionCategoryLabel } from "~/app/ui/question-category-label";
import { OptionResult } from "~/app/ui/option-result";
import { WeightingResult } from "~/app/ui/weighting-result";
import { QuestionUnansweredResult } from "~/app/ui/question-unanswered-result";
import Image from "next/image";
import { rateCandidate } from "../../rate-candidates";
import { getCandidateWithQuestions } from "./get-candidate-with-question";
import { BackButton } from "~/app/ui/back-button";
import { QuestionInfo } from "~/app/ui/question-info";
import { DownloadImageLink } from "~/app/ui/download-image-link";
import { GlossaredTextServer } from "~/app/ui/glossared-text.server";

export type WahlkabineResultCandidate = {
  params: {
    slug: string;
    "candidate-slug": string;
  };
};

export async function generateMetadata({ params }: WahlkabineResultCandidate) {
  const voterWithAnswers = await getVoterViaHash(params.slug);
  const candidate = await getCandidateWithQuestions(params["candidate-slug"]);

  if (!candidate || !candidate.hasFinished || !voterWithAnswers) {
    notFound();
  }

  return {
    title: `Vergleich mit ${candidate.name} - andererseits.org`,
    description: `Meine Antworten im Vergleich zu ${candidate.name}.`,
    twitter: {
      card: "summary_large_image",
      site: "andererseits.org",
      title: `Vergleich mit ${candidate.name} - andererseits.org`,
      description: `Meine Antworten im Vergleich zu ${candidate.name}.`,
      images: [
        {
          url: `https://andererseits.org/Wahl-Infos/kabine/${params.slug}/vergleich/${params["candidate-slug"]}/opengraph-image`,
          alt: "SPÖ Vorsitzbefragungs-Kabine",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function WahlkabineResultCandidate({
  params,
}: WahlkabineResultCandidate) {
  const voterWithAnswers = await getVoterViaHash(params.slug);
  const candidate = await getCandidateWithQuestions(params["candidate-slug"]);

  if (!candidate || !candidate.hasFinished || !voterWithAnswers) {
    notFound();
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-5 pb-5 sm:flex-row">
        <BackButton href={`/kabine/${params.slug}`}>Zur Übersicht</BackButton>
        <ShareButton
          title={`Mein Vergleich zu ${candidate.name} für die EU-Wahl 2024!`}
        >
          Teilen
        </ShareButton>
        <DownloadImageLink
          title={`spoe-vorsitzwahlkabine-vergleich-${candidate.name}.jpg`}
          href={`/api/og/generate/instagram/result-comparision?slug=${params.slug}&candidateSlug=${candidate.slug}`}
        >
          Bild herunterladen
        </DownloadImageLink>
      </div>

      <h1 className="my-5 border-b-2 border-black pb-4 text-center text-4xl">
        Vergleich mit {candidate.name}
      </h1>

      <section className="mt-10 flex justify-center">
        <div key={candidate.id} className="relative flex flex-col">
          <Link
            className="group relative z-10 block h-[88px] w-[170px] overflow-clip rounded-[200px]  border border-black outline-offset-4 outline-black transition-all focus-visible:outline-2"
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

      <ul className="flex flex-col items-center gap-4 py-8">
        {voterWithAnswers.answers
          .sort((a, b) => a.question.order - b.question.order)
          .map((answer, index) => {
            const candidateAnswer = candidate.answers.sort(
              (a, b) => a.question.order - b.question.order,
            )[index];

            return (
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

                <div className="relative mt-6 space-y-4 border-t  border-black pb-16">
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

                  {candidateAnswer?.option !== null &&
                  candidateAnswer?.weighting !== null ? (
                    <div className="flex flex-col gap-3 md:flex-row">
                      <OptionResult
                        value={candidateAnswer?.option!}
                        type={candidateAnswer?.question.type}
                      />
                      <WeightingResult value={candidateAnswer?.weighting!} />
                    </div>
                  ) : (
                    <div className="w-full">
                      <QuestionUnansweredResult />
                    </div>
                  )}
                  {candidateAnswer?.text ||
                  candidateAnswer?.changedQuestionDisclaimer ? (
                    <QuestionInfo
                      open
                      text={candidateAnswer?.text}
                      disclosure={candidateAnswer?.changedQuestionDisclaimer}
                    />
                  ) : null}
                </div>
              </li>
            );
          })}
      </ul>

      <div className="flex flex-col items-center justify-center gap-5 pt-5 sm:flex-row">
        <BackButton href={`/kabine/${params.slug}`}>Zur Übersicht</BackButton>
        <ShareButton
          title={`Mein Vergleich zu ${candidate.name} für die EU-Wahl 2024!`}
        >
          Teilen
        </ShareButton>
        <DownloadImageLink
          title={`spoe-vorsitzwahlkabine-vergleich-${candidate.name}.jpg`}
          href={`/api/og/generate/instagram/result-comparision?slug=${params.slug}&candidateSlug=${candidate.slug}`}
        >
          Bild herunterladen
        </DownloadImageLink>
      </div>
    </div>
  );
}
