import { prisma } from "~/lib/prisma";
import { VoterQuestionnaire } from "./voter-questionnaire";

export const metadata = {
  title: "SPÖ Vorsitz Wahlkabine | Junge Generation Wien",
  description: "SPÖ Wahlkabine",
};

export const revalidate = 3600;

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
