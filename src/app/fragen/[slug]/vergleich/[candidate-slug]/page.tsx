import { getVoterViaHash } from "../../../get-voter-via-hash";
import { notFound } from "next/navigation";
import { ShareButton } from "~/app/ui/share-button";
import { getCandidateWithQuestions } from "./get-candidate-with-question";
import { BackButton } from "~/app/ui/back-button";
import { DownloadImageLink } from "~/app/ui/download-image-link";
import { QuestionWithAnswers } from "~/app/ui/question-with-answers";
import { PartyLogo } from "~/app/ui/party-logo";
import { getGlossarEntries } from "~/app/glossar/page";

export type WahlkabineResultCandidate = {
  params: {
    slug: string;
    "candidate-slug": string;
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
  const [voterWithAnswers, candidate, glossarEntries] = await Promise.all([
    getVoterViaHash(params.slug),
    getCandidateWithQuestions(params["candidate-slug"]),
    getGlossarEntries(),
  ]);

  if (!candidate || !candidate.hasFinished || !voterWithAnswers) {
    notFound();
  }

  const toolbar = (
    <aside
      aria-label="Zurück & Teilen"
      className="flex flex-col items-center justify-center gap-5 pb-5 sm:flex-row"
    >
      <BackButton href={`/fragen/${params.slug}`}>Zur Übersicht</BackButton>
      <ShareButton
        title={`Mein Vergleich zu ${candidate.name} für die EU-Wahl 2024!`}
      >
        Teilen
      </ShareButton>
      <DownloadImageLink
        title="wahlchecker-andererseits.jpg"
        href={`/shareable-wide.jpg`}
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
            href={`/${candidate.slug}`}
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
            />
          ))}
      </section>

      {toolbar}
    </div>
  );
}

export async function generateMetadata({ params }: WahlkabineResultCandidate) {
  const voterWithAnswers = await getVoterViaHash(params.slug);
  const candidate = await getCandidateWithQuestions(params["candidate-slug"]);

  if (!candidate || !candidate.hasFinished || !voterWithAnswers) {
    notFound();
  }

  return {
    title: `Vergleich mit ${candidate.name} - wahlchecker.at`,
    description: `Meine Antworten im Vergleich zu ${candidate.name}.`,
    twitter: {
      card: "summary_large_image",
      site: "wahlchecker.at",
      title: `Vergleich mit ${candidate.name} - wahlchecker.at`,
      description: `Meine Antworten im Vergleich zu ${candidate.name}.`,
      images: [
        {
          url: `https;//wahlchecker.at/fragen/${params.slug}/vergleich/${params["candidate-slug"]}/opengraph-image`,
          alt: "SPÖ Vorsitzbefragungs-Kabine",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
