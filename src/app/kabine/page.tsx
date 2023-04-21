import { prisma } from "~/lib/prisma";
import { VoterQuestionnaire } from "./voter-questionnaire";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SPÖ Vorsitzbefragungs-Kabine | Junge Generation Wien",
  description: "SPÖ Vorsitzbefragungs-Kabine",
  twitter: {
    card: "summary_large_image",
  },
};

export const revalidate = 3600;

export default async function Wahlkabine() {
  const questions = await prisma.question.findMany({
    orderBy: { order: "asc" },
  });

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
