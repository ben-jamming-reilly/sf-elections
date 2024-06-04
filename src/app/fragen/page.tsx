import { prisma } from "~/lib/prisma";
import { VoterQuestionnaire } from "./voter-questionnaire";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fragen | Wahl-Checker EU 2024 von andererseits",
  description: "15 Fragen zur EU-Wahl 2024 beantwortet von 7 Parteien.",
};

export const revalidate = 18000; // 5 hours

export default async function Wahlkabine() {
  const [questions, glossarEntries] = await Promise.all([
    prisma.question.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.glossarEntry.findMany(),
  ]);

  return (
    <div className="pt-5">
      <VoterQuestionnaire
        questions={questions.map((q) => ({
          ...q,
          option: null,
          weighting: null,
          skipped: false,
        }))}
        glossarEntries={glossarEntries}
      />
    </div>
  );
}
