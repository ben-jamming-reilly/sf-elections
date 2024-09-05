import { getVoterViaHash } from "../../../get-voter-via-hash";
import { notFound } from "next/navigation";
import { ShareButton } from "~/app/ui/share-button";
import { getCandidateWithQuestions } from "./get-candidate-with-question";
import { BackButton } from "~/app/ui/back-button";
import { DownloadImageLink } from "~/app/ui/download-image-link";
import { QuestionWithAnswers } from "~/app/ui/question-with-answers";
import { PartyLogo } from "~/app/ui/party-logo";
import { getGlossarEntries } from "~/app/glossar/get-glossar-entries";
import { MagazineCta } from "~/app/ui/magazine-cta";
import { getElection } from "~/app/[electionSlug]/get-election";
import { metaTagsPerElectionSlug } from "~/app/utils.index";

export type WahlkabineResultCandidate = {
  params: {
    slug: string;
    "candidate-slug": string;
    electionSlug: string;
  };
};

export const revalidate = 18000; // 5 hours

export function generateStaticParams() {
  return [];
}

export const dynamicParams = true;

export default async function WahlkabineResultCandidate({
  params,
}: WahlkabineResultCandidate) {
  const [voterWithAnswers, candidate, glossarEntries, election] =
    await Promise.all([
      getVoterViaHash(params.slug),
      getCandidateWithQuestions({
        slug: params["candidate-slug"],
        electionSlug: params.electionSlug,
      }),
      getGlossarEntries(),
      getElection({
        electionSlug: params.electionSlug,
      }),
    ]);

  if (!candidate || !candidate.hasFinished || !voterWithAnswers || !election) {
    notFound();
  }

  const toolbar = (
    <aside
      aria-label="Zurück & Teilen"
      className="flex flex-row flex-wrap items-center justify-center gap-5 pb-5"
    >
      <BackButton href={`/${params.electionSlug}/fragen/${params.slug}`}>
        Zur Übersicht
      </BackButton>
      <ShareButton
        title={`Mein Vergleich zu ${candidate.name} für die EU-Wahl 2024!`}
      >
        Teilen
      </ShareButton>
      <DownloadImageLink
        title="wahlchecker-andererseits.jpg"
        href={`/shareable-wide.png`}
      >
        Bild zum Teilen
      </DownloadImageLink>
    </aside>
  );

  return (
    <div>
      {toolbar}

      <h1 className="my-5 border-b-2 border-black pb-4 text-center text-4xl">
        Vergleiche Deine Antworten mit {candidate.name}
      </h1>

      <section className="mt-10 flex justify-center">
        <div className="relative flex flex-col">
          <PartyLogo
            key={candidate.id}
            href={`/${params.electionSlug}/${candidate.slug}`}
            priority
            className=""
            title={`Zur ${candidate.name} Seite`}
            src={`/${candidate.profileImg}`}
            alt=""
          />
        </div>
      </section>

      <section
        aria-label={`Deine Antworten im Vergleich zu ${candidate.name}`}
        className="flex flex-col items-center gap-4 py-8"
      >
        {voterWithAnswers.answers
          .sort((a, b) => a.question.order - b.question.order)
          .map((answer, index) => (
            <QuestionWithAnswers
              key={answer.id}
              candidateLinkBase={`/fragen/${params.slug}/vergleich`}
              voterAnswer={answer}
              question={answer.question}
              candidatesAnswers={[candidate]}
              textOpenByDefault
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

export async function generateMetadata({ params }: WahlkabineResultCandidate) {
  const voterWithAnswers = await getVoterViaHash(params.slug);
  const candidate = await getCandidateWithQuestions({
    slug: params["candidate-slug"],
    electionSlug: params.electionSlug,
  });

  if (!candidate || !candidate.hasFinished || !voterWithAnswers) {
    notFound();
  }

  return metaTagsPerElectionSlug({
    electionSlug: voterWithAnswers.election.slug,
    title: `Mein Ergebnis für ${voterWithAnswers.election.name} – Wahl-Checker von andererseits`,
    description: `Meine Antworten im Vergleich zu ${candidate.name}.`,
  });
}
