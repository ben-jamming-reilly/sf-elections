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
      <div className="flex sm:flex-row flex-col gap-5 pb-5 items-center justify-center">
        <BackButton href={`/kabine/${params.slug}`}>Zur Übersicht</BackButton>
        <ShareButton title={`Schau wie gut ${candidate.name} zu mir passt!`}>
          Teilen
        </ShareButton>
        <DownloadImageLink
          title={`spoe-vorsitzwahlkabine-vergleich-${candidate.name}.jpg`}
          href={`/api/og/generate/instagram/result-comparision?slug=${params.slug}&candidateSlug=${candidate.slug}`}
        >
          Bild herunterladen
        </DownloadImageLink>
      </div>

      <h1 className="text-4xl my-5 pb-4 text-center border-b-2 border-black">
        Vergleich mit {candidate.name}
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

      <ul className="flex flex-col gap-4 items-center py-8">
        {voterWithAnswers.answers
          .sort((a, b) => a.question.order - b.question.order)
          .map((answer, index) => {
            const candidateAnswer = candidate.answers.sort(
              (a, b) => a.question.order - b.question.order
            )[index];

            return (
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

                <div className="pb-16 mt-6 border-t border-black  relative space-y-4">
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

                  {candidateAnswer?.option !== null &&
                  candidateAnswer?.weighting !== null ? (
                    <div className="flex md:flex-row flex-col gap-3">
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

      <div className="flex sm:flex-row flex-col gap-5 pt-5 items-center justify-center">
        <BackButton href={`/kabine/${params.slug}`}>Zur Übersicht</BackButton>
        <ShareButton title={`Schau wie gut ${candidate.name} zu mir passt!`}>
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
