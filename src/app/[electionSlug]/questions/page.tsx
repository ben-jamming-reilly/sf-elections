import { prisma } from "~/lib/prisma";
import { VoterQuestionnaire } from "./voter-questionnaire";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getElectionWithCandidates } from "../get-election-with-candidates";
import { getElections } from "~/app/get-elections";
import { metaTagsPerElectionSlug } from "~/app/utils.index";

export async function generateStaticParams() {
  const elections = await getElections();

  return elections.map((election) => ({
    electionSlug: election.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { electionSlug: string };
}): Promise<Metadata> {
  const election = await getElectionWithCandidates({
    electionSlug: params.electionSlug,
  });

  if (!election) {
    notFound();
  }

  return metaTagsPerElectionSlug({
    electionSlug: election.slug,
    title: `${election.name} Questions – Vote Checker`,
    description: `${election.questions.length} questions answered by ${election.candidates.length}.`,
  });
}

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
