import { notFound } from "next/navigation";
import { getCandidateFromSlug } from "./get-candidate-from-slug";
import { ShareButton } from "../../ui/share-button";
import Link from "next/link";
import { BackButton } from "../../ui/back-button";
import { getCandidates } from "../../get-candidates";
import { QuestionWithAnswers } from "../../ui/question-with-answers";
import { PartyLogo } from "../../ui/party-logo";
import { getGlossarEntries } from "../../glossary/get-glossar-entries";
import { getElection } from "../get-election";
import { metaTagsPerElectionSlug } from "~/app/utils.index";

export const revalidate = 18000; // 5 hours

export type CandidateProfileProps = {
  params: { candidateSlug: string; electionSlug: string };
};

export default async function CandidateProfile({
  params,
}: CandidateProfileProps) {
  const [candidate, candidates, glossarEntries, election] = await Promise.all([
    getCandidateFromSlug({
      candidateSlug: params.candidateSlug,
      electionSlug: params.electionSlug,
    }),
    getCandidates({
      electionSlug: params.electionSlug,
    }),
    getGlossarEntries(),
    getElection({
      electionSlug: params.electionSlug,
    }),
  ]);

  if (!candidate || !election) {
    notFound();
  }

  const randomOtherCandidates = candidates
    .filter((c) => c.id !== candidate.id)
    .sort((c) => Math.random() - Math.random());

  const toolbar = (
    <aside
      aria-label="Back to Homepage and Share"
      className="flex flex-row flex-wrap items-center justify-center gap-5 pb-5"
    >
      <BackButton href={`/${election.slug}`}>To the homepage</BackButton>

      <ShareButton
        electionSlug={params.electionSlug}
        title={`Voting Quiz answers from ${candidate.name} for ${election.name}`}
      >
        Share
      </ShareButton>
    </aside>
  );

  return (
    <section>
      {toolbar}
      {candidate.hasFinished ? (
        <div className="mb-5">
          <h1 className="my-5 pb-4 text-center text-4xl">
            The answers from {candidate.name}
          </h1>

          <section className="my-8 flex w-full justify-center">
            <div className="relative">
              <PartyLogo
                href={`/${params.electionSlug}/${candidate.slug}`}
                priority
                title={`Go to ${candidate.name} page`}
                src={`${candidate.profileImg}`}
              />
            </div>
          </section>

          <nav
            aria-label="Vergleichseiten mit den anderen Parteien"
            className="flex flex-col items-center gap-1 py-6 text-[1.125rem] leading-[1.3125rem]"
          >
            <h2 className="mb-3 block font-medium uppercase ">Compare with:</h2>
            <div className="flex flex-row flex-wrap justify-center gap-y-3 divide-x divide-black">
              {randomOtherCandidates.map((c) => (
                <Link
                  key={c.id}
                  className="mx-0 px-3 outline-offset-4 outline-black notouch:hover:font-semibold"
                  href={`compare/${candidate.slug}/${c.slug}`}
                  title={`Compare ${candidate.name} with ${c.name}`}
                  prefetch={false}
                >
                  {c.name}
                </Link>
              ))}
              <Link
                className="px-3 outline-offset-4 outline-black notouch:hover:font-semibold"
                href={`/compare/${candidates.map((c) => c.slug).join("/")}`}
                title="Compare all candidates"
              >
                ALL
              </Link>
            </div>
          </nav>

          <section
            aria-label="Fragen mit Antworten der Partei"
            className="flex flex-col gap-16 py-10"
          >
            {candidate.answers
              .sort((a, b) => a.question.order - b.question.order)
              .map((answer, index) => (
                <QuestionWithAnswers
                  key={answer.id}
                  voterType="candidate"
                  glossarEntries={glossarEntries}
                  candidateLinkBase={`/${params.candidateSlug}`}
                  voterAnswer={answer}
                  question={answer.question}
                  isQuestionnaire={election.isQuestionnaire}
                />
              ))}
          </section>
        </div>
      ) : (
        <p className="my-2">{candidate.name} has no answers yet.</p>
      )}

      {toolbar}
    </section>
  );
}

export async function generateStaticParams({ params }: CandidateProfileProps) {
  const candidates = await getCandidates({
    electionSlug: params.electionSlug,
  });

  return candidates.map((c) => ({
    electionSlug: params.electionSlug,
    candidateSlug: c.slug,
  }));
}

export async function generateMetadata({ params }: CandidateProfileProps) {
  const candidate = await getCandidateFromSlug({
    candidateSlug: params.candidateSlug,
    electionSlug: params.electionSlug,
  });

  if (!candidate) {
    notFound();
  }

  return metaTagsPerElectionSlug({
    electionSlug: candidate.election.slug,
    title: `${candidate.name} for ${candidate.election.name} – Voting Quiz`,
    description: `Check out the answers from ${candidate.name} for ${candidate.election.name}.`,
  });
}
