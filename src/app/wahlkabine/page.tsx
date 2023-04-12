import { prisma } from "~/lib/prisma";
import { notFound } from "next/navigation";
import { VoterQuestionnaire } from "./voter-questionnaire";

export const metadata = {
  title: "SPÖ Wahlkabine",
  description: "SPÖ Wahlkabine",
};

export default async function Wahlkabine() {
  const questions = await prisma.question.findMany();

  return (
    <VoterQuestionnaire
      questions={questions.map((q) => ({
        ...q,
        option: null,
        weighting: null,
        skipped: false,
      }))}
    />
  );
}
