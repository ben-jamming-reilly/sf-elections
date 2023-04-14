import { prisma } from "~/lib/prisma";
import { getVoterViaHash } from "../../get-voter-via-hash";
import { notFound } from "next/navigation";
import clsx from "clsx";
import {
  categoryHexForLabel,
  optionLabelForValue,
  optionLabelForYesNoValue,
  wahlrechtLabelForValue,
  weightingLabelForValue,
} from "~/data/answers";
import Link from "next/link";
import { ShareButton } from "~/app/ui/share-button";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { QuestionCategoryLabel } from "~/app/ui/question-category-label";
import { OptionResult } from "~/app/ui/option-result";
import { WeightingResult } from "~/app/ui/weighting-result";
import { QuestionUnansweredResult } from "~/app/ui/question-unanswered-result";

export const metadata = {
  title: "Vergleich | SPÖ Wahlkabine",
  description: "SPÖ Wahlkabine",
};

export default async function Wahlkabine({
  params,
}: {
  params: {
    slug: string;
    "candidate-slug": string;
  };
}) {
  const voterWithAnswers = await getVoterViaHash(params.slug);
  const candidate = await prisma.candidate.findUnique({
    where: {
      slug: params["candidate-slug"],
    },
    include: {
      answers: {
        include: {
          question: true,
        },
      },
    },
  });

  if (!candidate || !candidate.hasFinished || !voterWithAnswers) {
    notFound();
  }

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
        <ShareButton>Teilen</ShareButton>
      </div>

      <h1 className="text-3xl md:text-4xl font-medium">
        Vergleich mit {candidate.name}
      </h1>

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
                <div className="text-center top-0 bg-white py-2">
                  Anwort von{" "}
                  <strong className="font-semibold">{candidate.name}</strong>:
                </div>
                <div className="">
                  {candidate.answers[index].option !== null &&
                  candidate.answers[index].weighting !== null ? (
                    <div className="grid grid-cols-1 grid-rows-2 gap-5">
                      <OptionResult
                        value={candidate.answers[index].option!}
                        type={candidate.answers[index]?.question.type}
                      />
                      <WeightingResult
                        value={candidate.answers[index].weighting!}
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
