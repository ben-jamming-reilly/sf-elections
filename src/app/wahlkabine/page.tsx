import { prisma } from "~/lib/prisma";
import { VoterQuestionnaire } from "./voter-questionnaire";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SPÖ Vorsitz Wahlkabine | Junge Generation Wien",
  description: "SPÖ Wahlkabine",
  openGraph: {
    images: [
      {
        url: "/api/og?type=wahlkabine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
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
