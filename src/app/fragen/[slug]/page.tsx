import { notFound } from "next/navigation";
import { getVoterViaHash } from "../get-voter-via-hash";
import { ShareButton } from "~/app/ui/share-button";
import { getCandidatesWithQuestions } from "./get-candidates-with-questions";
import { BackButton } from "~/app/ui/back-button";
import { DownloadImageLink } from "~/app/ui/download-image-link";
import { QuestionWithAnswers } from "~/app/ui/question-with-answers";
import { PartyLogo } from "~/app/ui/party-logo";

export type WahlkabineResultProps = {
  params: {
    slug: string;
  };
};

export const revalidate = 18000; // 5 hours

export function generateStaticParams() {
  return [];
}

export const dynamicParams = true;

export default async function WahlkabineResult({
  params,
}: WahlkabineResultProps) {
  const [voterWithAnswers, candidates] = await Promise.all([
    getVoterViaHash(params.slug),
    getCandidatesWithQuestions(),
  ]);

  if (!voterWithAnswers) {
    notFound();
  }

  const randomCandidates = candidates.sort(() => Math.random() - 0.5);

  const toolbar = (
    <aside
      aria-label="Zurück & Teilen"
      className="flex flex-row flex-wrap justify-center gap-5 pb-5"
    >
      <BackButton href={`/`}>Zur Startseite</BackButton>
      <ShareButton title="Wahlchecker EU 2024">Teilen</ShareButton>
      <DownloadImageLink
        title="andererseits-Wahlchecker EU-resultat.jpg"
        href={`/api/og/generate/instagram/result?slug=${params.slug}`}
      >
        Bild herunterladen
      </DownloadImageLink>
    </aside>
  );

  return (
    <div>
      {toolbar}

      <h1 className="my-5 pb-4 text-center text-4xl">
        Vergleiche deine Antworten mit:
      </h1>

      <nav
        aria-label="Links zu den Antworten der einzelnen Parteien"
        className="mx-auto my-10 flex w-[724px] max-w-full flex-row flex-wrap items-center justify-evenly gap-x-3 gap-y-6"
      >
        {randomCandidates.map((candidate, index) => (
          <PartyLogo
            key={candidate.id}
            href={`/${candidate.slug}`}
            priority
            className=""
            title={`Zur ${candidate.name} Seite`}
            src={`/${candidate.profileImg}`}
            alt=""
          />
        ))}
      </nav>

      <section
        aria-label="Die Fragen mit den Antworten der Parteien"
        className="flex flex-col gap-10 py-10"
      >
        {voterWithAnswers.answers
          .sort((a, b) => a.question.order - b.question.order)
          .map((answer, index) => (
            <QuestionWithAnswers
              key={answer.id}
              candidateLinkBase={`/fragen/${params.slug}/vergleich`}
              voterAnswer={answer}
              question={answer.question}
              candidatesAnswers={randomCandidates}
            />
          ))}
      </section>

      {toolbar}
    </div>
  );
}

export async function generateMetadata({ params }: WahlkabineResultProps) {
  const voterWithAnswers = await getVoterViaHash(params.slug);

  if (!voterWithAnswers) {
    notFound();
  }

  return {
    title: `Mein Wahlchecker EU Ergebnis  – andererseits.org`,
    description: ``,
    twitter: {
      card: "summary_large_image",
      site: "andererseits.org",
      title: `Mein Wahlchecker EU Ergebnis  – andererseits.org`,
      description: ``,
      images: [
        {
          url: `https://andererseits.org/Wahl-Infos/fragen/${params.slug}/opengraph-image`,
          alt: "Wahlchecker EU 2024 – andererseits.org",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
