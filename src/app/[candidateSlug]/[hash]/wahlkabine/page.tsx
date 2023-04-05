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
  const questions = await prisma.question.findMany();

  return <Questionnaire questions={questions} candidateHash={params.hash} />;
}
