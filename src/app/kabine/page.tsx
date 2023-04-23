import { prisma } from "~/lib/prisma";
import { VoterQuestionnaire } from "./voter-questionnaire";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SPÖ Vorsitzbefragungs-Kabine | Junge Generation Wien",
  description:
    "Finde heraus welche*r Kandidat*in für die SPÖ Vorsitzbefragung 2023 am Besten zu dir passt.",
  twitter: {
    card: "summary_large_image",
    site: "mitentscheiden.at",
    title: "SPÖ Vorsitzbefragungs-Kabine | Junge Generation Wien",
    description:
      "Finde heraus welche*r Kandidat*in für die SPÖ Vorsitzbefragung 2023 am Besten zu dir passt.",
    images: [
      {
        url: "https://mitentscheiden.at/opengraph-image",
        alt: "SPÖ Vorsitzbefragungs-Kabine",
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
