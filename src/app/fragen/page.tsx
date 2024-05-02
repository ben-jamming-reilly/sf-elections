import { prisma } from "~/lib/prisma";
import { VoterQuestionnaire } from "./voter-questionnaire";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wahlchecker Fragen EU 2024 – andereseits.org",
  description: "",
  twitter: {
    card: "summary_large_image",
    site: "andererseits.org",
    title: "Wahlchecker Fragen EU 2024 – andereseits.org",
    description: "15 Fragen zur EU-Wahl 2024.",
    images: [
      {
        url: "https://andererseits.org/Wahl-Infos/opengraph-image",
        alt: "Wahlchecker Fragen EU 2024 – andereseits.org",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export const revalidate = 3600;

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