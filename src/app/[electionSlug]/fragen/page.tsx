import { prisma } from "~/lib/prisma";
import { VoterQuestionnaire } from "./voter-questionnaire";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getElectionWithCandidates } from "../get-election-with-candidates";

export const metadata: Metadata = {
  title: "Fragen | Wahl-Checker EU 2024 von andererseits",
  description: "15 Fragen zur EU-Wahl 2024 beantwortet von 7 Parteien.",
};

export const revalidate = 18000; // 5 hours

export default async function Wahlkabine({
  params,
}: {
  params: { electionSlug: string };
}) {
  const election = await getElectionWithCandidates({
    electionSlug: params.electionSlug,
  });

  if (!election) {
    notFound();
  }

  if (!election.isQuestionnaire) {
    redirect(`/vergleich/${election.candidates.map((c) => c.slug).join("/")}`);
  }

  const [questions, glossarEntries] = await Promise.all([
    prisma.question.findMany({
      orderBy: { order: "asc" },
      where: {
        election: {
          slug: params.electionSlug,
        },
      },
    }),
    prisma.glossarEntry.findMany(),
  ]);

  if (!questions || questions.length === 0) {
    notFound();
  }

  return (
    <div className="pt-5">
      <VoterQuestionnaire
        electionSlug={params.electionSlug}
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
