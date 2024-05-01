import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getVoterViaHash } from "../get-voter-via-hash";
import { ShareButton } from "~/app/ui/share-button";
import { getCandidatesWithQuestions } from "./get-candidates-with-questions";
import { BackButton } from "~/app/ui/back-button";
import { DownloadImageLink } from "~/app/ui/download-image-link";
import { QuestionWithAnswers } from "~/app/ui/question-with-answers";

export type WahlkabineResultProps = {
  params: {
    slug: string;
  };
};

export default async function WahlkabineResult({
  params,
}: WahlkabineResultProps) {
  const voterWithAnswers = await getVoterViaHash(params.slug);

  if (!voterWithAnswers) {
    notFound();
  }

  const candidates = (await getCandidatesWithQuestions()).sort(
    (a, b) => Math.random() - 0.5,
  );

  const toolbar = (
    <aside
      aria-label="Zurück & Teilen"
      className="flex flex-col justify-center gap-5 pb-5 sm:flex-row"
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
        {candidates.map((candidate, index) => (
          <Link
            key={candidate.id}
            className="no-touch:hover:bg-brand group relative z-10 flex h-[78px] w-[110px] overflow-clip rounded-[200px] border border-black bg-white outline-offset-4 outline-black  transition-all focus-visible:outline-2 sm:w-[150px] md:h-[88px] md:w-[170px]"
            href={`/${candidate.slug}`}
            title={`Zur ${candidate.name} Seite`}
          >
            <Image
              alt=""
              src={`/${candidate.profileImg}`}
              fill
              priority
              className="max-h-full px-3 py-3"
            />
          </Link>
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
              candidatesAnswers={candidates}
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
