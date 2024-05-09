import { prisma } from "~/lib/prisma";
import { VoterQuestionnaire } from "./voter-questionnaire";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fragen | Wahl-Checker EU 2024 von andereseits",
  description: "",
  twitter: {
    card: "summary_large_image",
    site: "wahlchecker.at",
    title: "Fragen | Wahl-Checker EU 2024 von andereseits",
    description: "15 Fragen zur EU-Wahl 2024.",
    images: [
      {
        url: "https;//wahlchecker.at/opengraph-image",
        alt: "Fragen | Wahl-Checker EU 2024 von andereseits",
        width: 1200,
        height: 630,
      },
    ],
  },
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
    <div className="pt-14">
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
