import { Questionnaire } from "~/app/wahlkabine/questionnaire";
import { prisma } from "~/lib/prisma";
import { getCandidateFromSlug } from "../../get-candidate-from-slug";

export const metadata = {
  title: "SPÖ Wahlkabine",
  description: "SPÖ Wahlkabine",
};

export default async function CandidateWahlkabine({
  params,
}: {
  params: { candidateSlug: string; hash: string };
}) {
  const candidate = await getCandidateFromSlug(params.candidateSlug);
  const questions = await prisma.question.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <Questionnaire
      questions={
        candidate?.answers && candidate?.answers.length > 0
          ? candidate?.answers
              .sort((a, b) => a.question.order - b.question.order)
              .map((answer) => ({
                order: answer.question.order,
                option: answer.option,
                weighting: answer.weighting,
                text: answer.text,
                category: answer.question.category,
                id: answer.question.id,
                title: answer.question.title,
                description: answer.question.description,
                type: answer.question.type,
              }))
          : questions
      }
      candidateHash={params.hash}
      candidateSlug={params.candidateSlug}
    />
  );
}
