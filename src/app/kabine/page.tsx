import { prisma } from "~/lib/prisma";
import { VoterQuestionnaire } from "./voter-questionnaire";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EU-Wahl-Infos 2024 – andereseits.org",
  description: "",
  twitter: {
    card: "summary_large_image",
    site: "andererseits.org",
    title: "EU-Wahl-Infos 2024 – andereseits.org",
    description: "",
    images: [
      {
        url: "https://andererseits.org/Wahl-Infos/opengraph-image",
        alt: "EU-Wahl-Infos 2024 – andereseits.org",
        width: 1200,
        height: 630,
      },
    ],
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
