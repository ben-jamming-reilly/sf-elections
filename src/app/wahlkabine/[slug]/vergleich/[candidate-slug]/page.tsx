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
    title: `Mein Vergleich mit ${candidateWithScore.name} | SPÖ Vorsitz Wahlkabine`,
    description: `Ich matche mit ${candidateWithScore.name} zu ${candidateWithScore.scorePercentage}%`,
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
      <div className="flex flex-row items-center gap-2 mb-10">
        <Link
          href={`/wahlkabine/${params.slug}`}
          className="border-brand border  px-3 py-2 hover:bg-brand hover:text-white active:scale-95 inline-flex items-center justify-center transition-all rounded-md text-brand gap-2"
        >
          <ArrowLeftCircleIcon className="w-5 h-5 stroke-2" />
          Zurück zur Übersicht
        </Link>
        <ShareButton
          title={`Schau wie gut ${candidateWithScore.name} zu mir passt!`}
        >
          Teilen
        </ShareButton>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3">
        <div key={candidateWithScore.id} className="py-5 rounded-md relative">
          <span className="absolute z-30 rounded-full w-14 h-14 top-2 -left-3 bg-brand text-white tabular-nums inline-flex justify-center items-center">
            {candidateWithScore.scorePercentage}%
          </span>
          <div className="">
            <Link
              href={`/${candidateWithScore.slug}`}
              className="transition-all group rounded-tr-md block z-10 relative w-full overflow-clip rounded-tl-md"
            >
              <Image
                src={`/${candidateWithScore.profileImg}`}
                alt={`Profilebild von ${candidateWithScore.name}`}
                width={300}
                height={300}
                className=" group-hover:scale-110 ease-in-out transition-all  bg-brand-yellow w-full"
              />
            </Link>
            <h2 className="text-2xl bg-brand text-white font-medium hyphens-auto px-3 py-2 selection:text-brand selection:bg-white text-center w-[110%] -translate-x-[5%] shadow-md">
              {candidateWithScore.name}
            </h2>
            <div className="p-5 border-2 z-20 relative rounded-br-md rounded-bl-md border-t-0 bg-white border-gray-800">
              <p className="prose mb-5">{candidateWithScore.description}</p>

              <Link
                className="text-white selection:text-brand-purple selection:bg-white inline-block active:scale-95 transition-all bg-brand-purple px-4 py-2 rounded-md hover:underline"
                href={`/${candidateWithScore.slug}`}
              >
                Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ul className="flex flex-col divide-y-2">
        {voterWithAnswers.answers.map((answer, index) => (
          <li key={answer.id} className="py-5">
            {answer.question.category && (
              <QuestionCategoryLabel category={answer.question.category} />
            )}
            <div className="text-lg font-semibold">
              Frage {answer.questionId}:
            </div>
            <h2 className="text-xl md:text-2xl mb-2 md:mb-5 hyphens-auto">
              {answer.question.title}
            </h2>

            <div className="grid grid-cols-1 py-5 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <div className="text-center top-0 bg-white py-2">
                  Deine Antwort:
                </div>
                {answer.option !== null && answer.weighting !== null ? (
                  <div className="grid grid-cols-1 grid-rows-2 gap-5">
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

              <div className="flex flex-col gap-1">
                <div className="justify-center inline-flex flex-row items-center gap-2 mb-2 top-0 bg-white">
                  Anwort von{" "}
                  <span className="inline-flex items-center gap-1">
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
                  </span>
                </div>
                <div className="">
                  {candidateWithScore.answers[index].option !== null &&
                  candidateWithScore.answers[index].weighting !== null ? (
                    <div className="grid grid-cols-1 grid-rows-2 gap-5">
                      <OptionResult
                        value={candidateWithScore.answers[index].option!}
                        type={candidateWithScore.answers[index]?.question.type}
                      />
                      <WeightingResult
                        value={candidateWithScore.answers[index].weighting!}
                      />
                    </div>
                  ) : (
                    <div className="w-full">
                      <QuestionUnansweredResult />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
