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

  const candidateWithScore = rateCandidate(
    voterWithAnswers.answers!,
    candidate
  );

  return {
    title: `Vergleich mit ${candidateWithScore.name} - andererseits.org`,
    description: `Ich matche mit ${candidateWithScore.name} zu ${candidateWithScore.scorePercentage}%.`,
    twitter: {
      card: "summary_large_image",
      site: "andererseits.org",
      title: `Vergleich mit ${candidateWithScore.name} - andererseits.org`,
      description: `Ich matche mit ${candidateWithScore.name} zu ${candidateWithScore.scorePercentage}%.`,
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

  const candidateWithScore = rateCandidate(
    voterWithAnswers.answers!,
    candidate
  );

  return (
    <div>
      <div className="flex sm:flex-row flex-col gap-5 pb-5 items-center justify-center">
        <BackButton href={`/kabine/${params.slug}`}>Zur Übersicht</BackButton>
        <ShareButton
          title={`Schau wie gut ${candidateWithScore.name} zu mir passt!`}
        >
          Teilen
        </ShareButton>
        <DownloadImageLink
          title={`spoe-vorsitzwahlkabine-vergleich-${candidateWithScore.name}.jpg`}
          href={`/api/og/generate/instagram/result-comparision?slug=${params.slug}&candidateSlug=${candidateWithScore.slug}`}
        >
          Bild herunterladen
        </DownloadImageLink>
      </div>

      <h1 className="text-4xl my-5 pb-4 text-center border-b-2 border-gray-800 dark:border-white">
        Vergleich mit {candidate.name}
      </h1>

      <section className="flex justify-center mt-10">
        <div
          key={candidateWithScore.id}
          className={
            "w-full min-w-[250px] max-w-[350px] rounded-md relative flex flex-col"
          }
        >
          <span className="absolute z-30 rounded-full w-14 h-14 top-3 left-3 bg-brand text-white tabular-nums inline-flex justify-center items-center">
            {candidateWithScore.scorePercentage}%
          </span>
          <div className="">
            <Link
              href={`/${candidateWithScore.slug}`}
              className="transition-all group rounded-tr-md block z-10 relative w-full overflow-clip rounded-tl-md aspect-square"
            >
              <Image
                src={`/${candidateWithScore.profileImg}`}
                alt={`Profilebild von ${candidateWithScore.name}`}
                fill
                priority
                className=" group-hover:scale-110 ease-in-out transition-all  bg-brand-yellow w-full"
              />
            </Link>
            <h2 className="text-2xl bg-brand text-white font-medium hyphens-auto px-3 py-2 selection:text-brand selection:bg-white text-center w-full">
              {candidateWithScore.name}
            </h2>
            <div className="p-5 border-2 z-20 relative items-center flex justify-center rounded-br-md rounded-bl-md border-t-0 border-brand">
              <Link
                className="border  dark:text-white active:scale-95 dark:hover:opacity-90 dark:bg-brand-purple hover:bg-brand-purple text-brand-purple hover:text-white border-brand-purple transition-all  px-4 py-2 rounded-md"
                href={`/${candidateWithScore.slug}`}
              >
                {`${candidate.name}s Antworten`}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ul className="flex flex-col gap-16 py-10">
        {voterWithAnswers.answers
          .sort((a, b) => a.question.order - b.question.order)
          .map((answer, index) => (
            <li key={answer.id} className="">
              {answer.question.category && (
                <QuestionCategoryLabel category={answer.question.category} />
              )}
              <div className="text-lg">Frage {index + 1}:</div>
              <h2 className="text-xl md:text-2xl mb-2 md:mb-5 hyphens-auto font-sans">
                {answer.question.title}
              </h2>

              <div className="grid grid-cols-1 py-5  gap-5">
                <div className="flex flex-col gap-1 dark:bg-surface-200 dark:p-3 rounded-md space-y-4">
                  <div className="text-center inline-flex items-center  justify-center font-semibold -translate-x-[15px]">
                    <span className="h-[30px] w-[30px]" /> Deine Antwort:
                  </div>
                  {answer.option !== null && answer.weighting !== null ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                </div>

                <div className="flex flex-col gap-1 dark:bg-surface-200 dark:p-3 rounded-md space-y-4">
                  <Link
                    href={`/${candidate.slug}`}
                    className="text-center flex flex-row items-center font-semibold gap-3 justify-center dark:text-white hover:underline underline-offset-2"
                  >
                    <Image
                      src={`/${candidateWithScore.profileImg}`}
                      width={30}
                      height={30}
                      alt={`${candidateWithScore.name} Profilbild`}
                      className="rounded-full"
                    />
                    <strong className="font-semibold">
                      {candidateWithScore.name}:
                    </strong>
                  </Link>
                  {candidateWithScore.answers.sort(
                    (a, b) => a.question.order - b.question.order
                  )[index].option !== null &&
                  candidateWithScore.answers.sort(
                    (a, b) => a.question.order - b.question.order
                  )[index].weighting !== null ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <OptionResult
                        value={
                          candidateWithScore.answers.sort(
                            (a, b) => a.question.order - b.question.order
                          )[index].option!
                        }
                        type={
                          candidateWithScore.answers.sort(
                            (a, b) => a.question.order - b.question.order
                          )[index]?.question.type
                        }
                      />
                      <WeightingResult
                        value={
                          candidateWithScore.answers.sort(
                            (a, b) => a.question.order - b.question.order
                          )[index].weighting!
                        }
                      />
                    </div>
                  ) : (
                    <div className="w-full">
                      <QuestionUnansweredResult />
                    </div>
                  )}
                  {candidateWithScore.answers.sort(
                    (a, b) => a.question.order - b.question.order
                  )[index].text ||
                  candidateWithScore.answers.sort(
                    (a, b) => a.question.order - b.question.order
                  )[index].changedQuestionDisclaimer ? (
                    <QuestionInfo
                      text={
                        candidateWithScore.answers.sort(
                          (a, b) => a.question.order - b.question.order
                        )[index].text
                      }
                      disclosure={
                        candidateWithScore.answers.sort(
                          (a, b) => a.question.order - b.question.order
                        )[index].changedQuestionDisclaimer
                      }
                    />
                  ) : null}
                </div>
              </div>
            </li>
          ))}
      </ul>

      <div className="flex sm:flex-row flex-col gap-5 pt-5 items-center justify-center">
        <BackButton href={`/kabine/${params.slug}`}>Zur Übersicht</BackButton>
        <ShareButton
          title={`Schau wie gut ${candidateWithScore.name} zu mir passt!`}
        >
          Teilen
        </ShareButton>
        <DownloadImageLink
          title={`spoe-vorsitzwahlkabine-vergleich-${candidateWithScore.name}.jpg`}
          href={`/api/og/generate/instagram/result-comparision?slug=${params.slug}&candidateSlug=${candidateWithScore.slug}`}
        >
          Bild herunterladen
        </DownloadImageLink>
      </div>
    </div>
  );
}
