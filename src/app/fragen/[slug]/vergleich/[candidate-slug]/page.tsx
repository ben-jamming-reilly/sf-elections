import { getVoterViaHash } from "../../../get-voter-via-hash";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShareButton } from "~/app/ui/share-button";
import Image from "next/image";
import { getCandidateWithQuestions } from "./get-candidate-with-question";
import { BackButton } from "~/app/ui/back-button";
import { DownloadImageLink } from "~/app/ui/download-image-link";
import { QuestionWithAnswers } from "~/app/ui/question-with-answers";

export type WahlkabineResultCandidate = {
  params: {
    slug: string;
    "candidate-slug": string;
  };
};

export default async function WahlkabineResultCandidate({
  params,
}: WahlkabineResultCandidate) {
  const voterWithAnswers = await getVoterViaHash(params.slug);
  const candidate = await getCandidateWithQuestions(params["candidate-slug"]);

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
        title={`wahlchecker-andererseits-vergleich-${candidate.name}.jpg`}
        href={`/api/og/generate/instagram/result-comparision?slug=${params.slug}&candidateSlug=${candidate.slug}`}
      >
        Bild herunterladen
      </DownloadImageLink>
    </aside>
  );

  return (
    <div>
      {toolbar}

      <h1 className="my-5 border-b-2 border-black pb-4 text-center text-4xl">
        Vergleich mit {candidate.name}
      </h1>

      <section className="mt-10 flex justify-center">
        <div key={candidate.id} className="relative flex flex-col">
          <Link
            className="group relative z-10 block h-[88px] w-[170px] overflow-clip rounded-[200px]  border border-black outline-offset-4 outline-black transition-all focus-visible:outline-2"
            href={`/${candidate.slug}`}
          >
            <Image
              src={`/${candidate.profileImg}`}
              alt={`Profilebild von ${candidate.name}`}
              fill
              priority
              className="max-h-full px-5 py-3"
            />
          </Link>
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
    title: `Vergleich mit ${candidate.name} - andererseits.org`,
    description: `Meine Antworten im Vergleich zu ${candidate.name}.`,
    twitter: {
      card: "summary_large_image",
      site: "andererseits.org",
      title: `Vergleich mit ${candidate.name} - andererseits.org`,
      description: `Meine Antworten im Vergleich zu ${candidate.name}.`,
      images: [
        {
          url: `https://andererseits.org/Wahl-Infos/fragen/${params.slug}/vergleich/${params["candidate-slug"]}/opengraph-image`,
          alt: "SPÖ Vorsitzbefragungs-Kabine",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
