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

export const revalidate = 3600; // 1 hour

export type CandidateProfileProps = {
  params: { candidateSlug: string };
};

export async function generateMetadata({ params }: CandidateProfileProps) {
  const candidate = await getCandidateFromSlug(params.candidateSlug);

  if (!candidate) {
    notFound();
  }

  return {
    title: `${candidate.name} | SPÖ Vorsitzbefragungs-Kabine`,
    description: `Vorsitzbefragungs-Kabine Antworten von ${candidate.name}`,
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

          <h1 className="text-4xl my-5 pb-4 text-center border-b-2 border-gray-800 dark:border-white">
            Profil von {candidate.name}
          </h1>

          <section className="flex justify-center mt-10">
            <div
              key={candidate.id}
              className={clsx(
                "w-full min-w-[250px] max-w-[350px] snap-start rounded-md relative flex flex-col"
              )}
            >
              <Link
                href={`/${candidate.slug}`}
                className={"flex-grow flex flex-col group"}
              >
                <div className="transition-all  rounded-tr-md block z-10 relative w-full overflow-clip rounded-tl-md aspect-square">
                  <Image
                    src={`/${candidate.profileImg}`}
                    alt={`Profilebild von ${candidate.name}`}
                    fill
                    priority
                    className={clsx(
                      "ease-in-out transition-all  bg-brand-yellow w-full",
                      candidate.id !== candidate.id && "group-hover:scale-110"
                    )}
                  />
                </div>
                <h2 className="text-2xl bg-brand text-white font-medium hyphens-auto px-3 py-2 selection:text-brand selection:bg-white text-center w-full shadow-md">
                  {candidate.name}
                </h2>
                <div className="p-5 flex-grow border-2 border-brand flex flex-col justify-between items-start">
                  <p className="prose mb-5">{candidate.description}</p>
                </div>
              </Link>
            </div>
          </section>

          <div className="flex flex-col gap-4 items-center py-5 ">
            <h2 className="text-xl block font-medium underline underline-offset-2">
              Vergleichen mit:
            </h2>
            <ul className="flex flex-row gap-3">
              {randomOtherCandidates.map((c) => (
                <li key={c.id}>
                  <SecondaryLink href={`vergleich/${candidate.slug}/${c.slug}`}>
                    {c.name}
                  </SecondaryLink>
                </li>
              ))}
            </ul>
            <SecondaryLink
              href={`/vergleich/${candidates.map((c) => c.slug).join("/")}`}
            >
              {randomOtherCandidates.map((c) => c.name).join(" & ")}
            </SecondaryLink>
          </div>

          <ul className="flex flex-col gap-16 py-10">
            {candidate.answers
              .sort((a, b) => a.question.order - b.question.order)
              .map((answer, index) => (
                <li key={answer.id}>
                  <QuestionCategoryLabel category={answer.question.category} />
                  <div className="text-lg font-semibold">
                    Frage {index + 1}:
                  </div>
                  <h2 className="text-2xl mb-5 hyphens-auto">
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
                  {answer.text ? (
                    <div className=" my-3">
                      <QuestionInfo open text={answer.text} />
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
