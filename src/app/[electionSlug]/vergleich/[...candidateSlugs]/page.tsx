import { notFound } from "next/navigation";
import { ShareButton } from "~/app/ui/share-button";
import { getCandidatesFromSlugs } from "./get-candidates-from-slugs";
import { Metadata } from "next";
import { BackButton } from "~/app/ui/back-button";
import { getCandidates } from "~/app/get-candidates";
import { constructComparision } from "./construct-comparision";
import { QuestionWithAnswers } from "~/app/ui/question-with-answers";
import { PartyLogo } from "~/app/ui/party-logo";
import { getGlossarEntries } from "~/app/glossar/get-glossar-entries";
import { MagazineCta } from "~/app/ui/magazine-cta";
import { getElection } from "../../get-election";

export const revalidate = false;

export type CandidateComparisonProps = {
  params: {
    candidateSlugs: string[];
    electionSlug: string;
  };
};

export default async function CandidateComparison({
  params,
}: CandidateComparisonProps) {
  if (params.candidateSlugs.length < 2) {
    notFound();
  }

  const [candidates, glossarEntries, election] = await Promise.all([
    getCandidatesFromSlugs({
      candidateSlugs: params.candidateSlugs,
      electionSlug: params.electionSlug,
    }),
    getGlossarEntries(),
    getElection({
      electionSlug: params.electionSlug,
    }),
  ]);

  if (!candidates || !election) {
    notFound();
  }

  const randomCandidates = candidates.sort(
    (c) => Math.random() - Math.random(),
  );

  const candidatesTitle =
    randomCandidates.length === election.candidates.length
      ? "allen Parteien"
      : `Vergleich zwischen ${randomCandidates.map((c) => c.name).join(" & ")}`;

  const toolbar = (
    <aside
      aria-label="Zur Startseite und Teilen"
      className="flex flex-wrap items-center justify-center gap-5 pb-5"
    >
      <BackButton href={`/${params.electionSlug}`}>Zur Startseite</BackButton>
      <ShareButton
        title={`Vergleich zwischen ${candidatesTitle}`}
        text="Wahl-Checker EU 2024 von andererseits"
      >
        Seite teilen
      </ShareButton>
    </aside>
  );

  return (
    <div>
      {toolbar}
      <h1 className="my-5 border-b-2 border-black pb-4 text-center text-4xl">
        Vergleich zwischen <br />
        {candidatesTitle}
      </h1>

      <section className="my-10">
        <ul className="mx-auto my-10 grid w-[724px] max-w-full grid-cols-2 flex-row flex-wrap items-center justify-center gap-x-3 gap-y-6 sm:flex ">
          {randomCandidates.map((candidate) => (
            <li
              key={candidate.id}
              className="relative flex flex-col items-center justify-center"
            >
              <PartyLogo
                href={`/${params.electionSlug}/${candidate.slug}`}
                priority
                className=""
                title={`Zur ${candidate.name} Seite`}
                src={`/${candidate.profileImg}`}
                alt=""
              />
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-label="Die Antworten der Parteien im Vergleich"
        className="flex flex-col gap-10 py-10"
      >
        {candidates[0]?.answers
          .sort((a, b) => a.question.order - b.question.order)
          .map((answer, index) => (
            <QuestionWithAnswers
              key={answer.id}
              candidateLinkBase={`/${params.electionSlug}`}
              question={answer.question}
              candidatesAnswers={candidates}
              glossarEntries={glossarEntries}
              isQuestionnaire={election.isQuestionnaire}
            />
          ))}
      </section>

      <MagazineCta electionSlug={params.electionSlug} />

      {toolbar}
    </div>
  );
}

export async function generateStaticParams({
  params,
}: CandidateComparisonProps) {
  const candidates = await getCandidates({
    electionSlug: params.electionSlug,
  });

  const comboPairs = constructComparision(
    candidates.sort((c) => Math.random() - Math.random()),
  );

  return comboPairs.map((c) => ({
    candidateSlug: c.slug,
    electionSlug: params.electionSlug,
  }));
}

export async function generateMetadata({
  params,
}: CandidateComparisonProps): Promise<Metadata> {
  const candidates = await getCandidatesFromSlugs({
    candidateSlugs: params.candidateSlugs,
    electionSlug: params.electionSlug,
  });

  return {
    title: `Vergleich zwischen ${candidates.map((c) => c.name).join(" und ")}`,
    description: `Vergleich zwischen ${candidates
      .map((c) => c.name)
      .join(" und ")}`,
    twitter: {
      card: "summary_large_image",
      site: "wahlchecker.at",
      title: `Vergleich zwischen ${candidates
        .map((c) => c.name)
        .join(" und ")}`,
      description: `Vergleich zwischen ${candidates
        .map((c) => c.name)
        .join(" und ")}`,
    },
  };
}
