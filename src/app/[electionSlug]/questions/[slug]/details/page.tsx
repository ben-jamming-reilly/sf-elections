import { notFound } from "next/navigation";
import { getVoterViaHash } from "../../get-voter-via-hash";
import { ShareButton } from "~/app/ui/share-button";
import { getCandidatesWithQuestions } from "../get-candidates-with-questions";
import { BackButton } from "~/app/ui/back-button";
import { DownloadImageLink } from "~/app/ui/download-image-link";
import { QuestionWithAnswers } from "~/app/ui/question-with-answers";
import { PartyLogo } from "~/app/ui/party-logo";
import { getGlossarEntries } from "~/app/glossary/get-glossar-entries";
import { MagazineCta } from "~/app/ui/magazine-cta";
import { getElection } from "~/app/[electionSlug]/get-election";
import { metaTagsPerElectionSlug } from "~/app/utils.index";

export type WahlkabineResultDetailsProps = {
  params: {
    slug: string;
    electionSlug: string;
  };
};

export const revalidate = 18000; // 5 hours

export function generateStaticParams() {
  return [];
}

export const dynamicParams = true;

export default async function WahlkabineResultDetails({
  params,
}: WahlkabineResultDetailsProps) {
  const [voterWithAnswers, candidates, glossarEntries, election] =
    await Promise.all([
      getVoterViaHash(params.slug),
      getCandidatesWithQuestions({
        electionSlug: params.electionSlug,
      }),
      getGlossarEntries(),
      getElection({
        electionSlug: params.electionSlug,
      }),
    ]);

  if (!voterWithAnswers || !election) {
    notFound();
  }

  const randomCandidates = candidates.sort(() => Math.random() - 0.5);

  const toolbar = (
    <aside
      aria-label="Zurück & Teilen"
      className="flex flex-row flex-wrap justify-center gap-5 pb-5"
    >
      <BackButton href={`/${params.electionSlug}/questions/${params.slug}/`}>
        Back to Overview
      </BackButton>
      <ShareButton
        electionSlug={params.electionSlug}
        title={`Election Checker for ${election.name}`}
      >
        Share
      </ShareButton>
      <DownloadImageLink
        title="election-checker-andererseits.jpg"
        href={`/shareable-wide-${params.electionSlug}.png`}
      >
        Download Image
      </DownloadImageLink>
    </aside>
  );
  return (
    <div>
      {toolbar}

      <section>
        <h1 className="my-5 pb-4 text-center text-4xl">
          The candidates answers:
        </h1>

        <nav
          aria-label="Links to the answers of each party"
          className="mx-auto my-10 grid w-[724px] max-w-full grid-cols-2 flex-row flex-wrap place-items-center items-center justify-evenly gap-x-3 gap-y-6 xs:flex"
        >
          {randomCandidates.map((candidate, index) => (
            <PartyLogo
              key={candidate.id}
              href={`/${params.electionSlug}/${candidate.slug}`}
              priority
              className=""
              title={`To the ${candidate.name} page`}
              src={`${candidate.profileImg}`}
              alt=""
            />
          ))}
        </nav>
      </section>

      <section
        aria-labelledby="details-page-questions-overview-title"
        className="flex flex-col gap-10 py-16"
      >
        <div className="max-w-[80ch] space-y-3">
          <h2 id="details-page-questions-overview-title" className="text-3xl">
            Here you can compare your answers with all parties
          </h2>
          <p>
            The parties have also written the explainations for their opinions.
            You can read this by clicking on &quot;More Info.&quot; We have also
            explained the reasons in simple language.
            <br />
            <br /> The order of the parties is random.
          </p>
        </div>
        <div>
          {voterWithAnswers.answers
            .sort((a, b) => a.question.order - b.question.order)
            .map((answer, index) => (
              <QuestionWithAnswers
                key={answer.id}
                candidateLinkBase={`/${params.electionSlug}/questions/${params.slug}/compare`}
                voterAnswer={answer}
                question={answer.question}
                candidatesAnswers={randomCandidates}
                glossarEntries={glossarEntries}
                isQuestionnaire={election.isQuestionnaire}
              />
            ))}
        </div>
      </section>

      {toolbar}
    </div>
  );
}

export async function generateMetadata({
  params,
}: WahlkabineResultDetailsProps) {
  const voterWithAnswers = await getVoterViaHash(params.slug);

  if (!voterWithAnswers) {
    notFound();
  }

  return metaTagsPerElectionSlug({
    electionSlug: voterWithAnswers.election.slug,
    title: `Mein Ergebnis für ${voterWithAnswers.election.name} – Wahl-Checker von andererseits`,
    description: `Schau Dir an, wie ähnlich ich zu den Parteien war.`,
  });
}
