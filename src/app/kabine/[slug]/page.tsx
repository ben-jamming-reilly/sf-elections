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

  const candidates = await getCandidatesWithQuestions();

  const candidatesWithScore = rateCandidates(
    voterWithAnswers.answers.sort(
      (a, b) => a.question.order - b.question.order
    ),
    candidates
  );

  return {
    title: `Mein Ergebnis bei der Vorsitzbefragungs-Kabine | SPÖ Vorsitz Vorsitzbefragungs-Kabine`,
    description: `Mein Resultat: ${candidatesWithScore
      .map((c) => `${c.name}: ${c.scorePercentage}%`)
      .join(", ")}`,
    twitter: {
      card: "summary_large_image",
      site: "andererseits.org",
      title: `Mein Ergebnis bei der Vorsitzbefragungs-Kabine | SPÖ Vorsitz Vorsitzbefragungs-Kabine`,
      description: `Mein Resultat: ${candidatesWithScore
        .map((c) => `${c.name}: ${c.scorePercentage}%`)
        .join(", ")}`,
      images: [
        {
          url: `https://andererseits.org/wahlinfos/kabine/${params.slug}/opengraph-image`,
          alt: "SPÖ Vorsitzbefragungs-Kabine",
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

  const candidates = await getCandidatesWithQuestions();

  const candidatesWithScore = rateCandidates(
    voterWithAnswers.answers.sort(
      (a, b) => a.question.order - b.question.order
    ),
    candidates
  ).sort((a, b) => b.scorePercentageRaw - a.scorePercentageRaw);

  return (
    <div>
      <div className="flex pb-5 sm:flex-row flex-col gap-5 items-center justify-center">
        <BackButton href={`/`}>Zur Startseite</BackButton>
        <ShareButton title="Schau welche*r SPÖ Vorsitz Kandidat*in am Besten zu mir passt!">
          Teilen
        </ShareButton>
        <DownloadImageLink
          title="spoe-vorsitzwahlkabine-resultat.jpg"
          href={`/api/og/generate/instagram/result?slug=${params.slug}`}
        >
          Bild herunterladen
        </DownloadImageLink>
      </div>

      <h1 className="text-4xl my-5 pb-4 text-center border-b-2 border-gray-800 dark:border-white">
        Die Kandidat*innen
      </h1>

      <section className="my-10">
        <ul className="flex flex-row scroll-mx-5  overflow-x-auto snap-x gap-5 snap-mandatory lg:gap-10 my-10 max-w-full">
          {candidatesWithScore.map((candidate, index) => (
            <li
              key={candidate.id}
              className="md:flex-1 min-w-[250px] max-w-[375px] snap-start rounded-md relative flex flex-col"
            >
              <span className="absolute z-30 rounded-full w-14 h-14 top-2 left-2 bg-brand text-white tabular-nums inline-flex justify-center items-center">
                {candidate.scorePercentage}%
              </span>
              <div className="flex-grow flex flex-col">
                <Link
                  className="transition-all group rounded-tr-md block z-10 relative w-full overflow-clip rounded-tl-md aspect-square"
                  href={`/${candidate.slug}`}
                >
                  <Image
                    src={`/${candidate.profileImg}`}
                    alt={`Profilebild von ${candidate.name}`}
                    fill
                    priority
                    className=" group-hover:scale-110 ease-in-out transition-all  bg-brand-yellow"
                  />
                </Link>
                <h2 className="text-2xl bg-brand flex-grow flex items-center justify-center text-white font-medium hyphens-auto px-1 py-2 selection:text-brand selection:bg-white text-center w-full shadow-md">
                  {index + 1}. {candidate.name}
                </h2>
                <div className="p-5 flex-grow  flex flex-col justify-between items-center rounded-br-md rounded-bl-md border-2 border-brand">
                  <Link
                    className="border  dark:text-white active:scale-95 dark:hover:opacity-90 dark:bg-brand-purple hover:bg-brand-purple text-brand-purple hover:text-white border-brand-purple transition-all  px-4 py-2 rounded-md"
                    href={`/kabine/${params.slug}/vergleich/${candidate.slug}`}
                  >
                    Vergleichen
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-3xl pt-10 pb-4 text-center border-b-2 border-gray-800 dark:border-white">
          Fragen und Antworten
        </h2>
        <ul className="flex flex-col gap-16 py-10">
          {voterWithAnswers.answers
            .sort((a, b) => a.question.order - b.question.order)
            .map((answer, index) => (
              <li key={answer.id} className="">
                {answer.question.category && (
                  <QuestionCategoryLabel category={answer.question.category} />
                )}
                <div className="text-lg mt-3">Frage {index + 1}:</div>
                <h2 className="text-2xl font-brand mb-5 hyphens-auto">
                  {answer.question.title}
                </h2>
                {answer.option !== null && answer.weighting !== null ? (
                  <div className="grid grid-cols-1 grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-5">
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

                <div className="mt-5">
                  <details key={`candidate-details-${answer.questionId}`}>
                    <summary className="cursor-pointer font-semibold py-2 border-gray-800">
                      Antworten der Kandidat*innen:
                    </summary>
                    <ul className="grid grid-cols-1 py-5  gap-5">
                      {candidatesWithScore.map((candidate) => (
                        <li
                          key={`candidate-details-${answer.questionId}-${candidate.id}`}
                          className="dark:bg-surface-200 p-3 rounded-md space-y-4"
                        >
                          <Link
                            href={`/${candidate.slug}`}
                            className="text-center flex flex-row items-center font-semibold gap-3 justify-center dark:text-white hover:underline underline-offset-2"
                          >
                            <Image
                              src={`/${candidate.profileImg}`}
                              alt={`Profilebild von ${candidate.name}`}
                              width={35}
                              height={35}
                              className="rounded-full"
                            />
                            {candidate.name}
                          </Link>
                          {candidate.answers.sort(
                            (a, b) => a.question.order - b.question.order
                          )[index]?.option !== null &&
                          candidate.answers.sort(
                            (a, b) => a.question.order - b.question.order
                          )[index]?.weighting !== null ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <OptionResult
                                value={
                                  candidate.answers.sort(
                                    (a, b) =>
                                      a.question.order - b.question.order
                                  )[index]?.option!
                                }
                                type={
                                  candidate.answers.sort(
                                    (a, b) =>
                                      a.question.order - b.question.order
                                  )[index]?.question.type
                                }
                              />
                              <WeightingResult
                                value={
                                  candidate.answers.sort(
                                    (a, b) =>
                                      a.question.order - b.question.order
                                  )[index]?.weighting!
                                }
                              />
                            </div>
                          ) : (
                            <div className="w-full flex items-center justify-center">
                              <QuestionUnansweredResult />
                            </div>
                          )}
                          {candidate.answers.sort(
                            (a, b) => a.question.order - b.question.order
                          )[index]?.text ||
                          candidate.answers.sort(
                            (a, b) => a.question.order - b.question.order
                          )[index]?.changedQuestionDisclaimer ? (
                            <QuestionInfo
                              text={
                                candidate.answers.sort(
                                  (a, b) => a.question.order - b.question.order
                                )[index]?.text
                              }
                              disclosure={
                                candidate.answers.sort(
                                  (a, b) => a.question.order - b.question.order
                                )[index]?.changedQuestionDisclaimer
                              }
                            />
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              </li>
            ))}
        </ul>
      </section>

      <div className="flex pt-5 sm:flex-row flex-col gap-5 items-center justify-center">
        <BackButton href={`/`}>Zur Startseite</BackButton>
        <ShareButton title="Schau welche:r SPÖ Vorsitz Kandidat*in am Besten zu mir passt!">
          Teilen
        </ShareButton>
        <DownloadImageLink
          title="spoe-vorsitzwahlkabine-resultat.jpg"
          href={`/api/og/generate/instagram/result?slug=${params.slug}`}
        >
          Bild herunterladen
        </DownloadImageLink>
      </div>
    </div>
  );
}
