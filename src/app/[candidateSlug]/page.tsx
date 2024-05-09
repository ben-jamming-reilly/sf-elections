import { notFound } from "next/navigation";
import { getCandidateFromSlug } from "./get-candidate-from-slug";
import { ShareButton } from "../ui/share-button";
import Link from "next/link";
import Image from "next/image";
import { BackButton } from "../ui/back-button";
import { getCandidates } from "../get-candidates";
import { QuestionWithAnswers } from "../ui/question-with-answers";
import { PartyLogo } from "../ui/party-logo";

export const revalidate = 18000; // 5 hours

export type CandidateProfileProps = {
  params: { candidateSlug: string };
};

export default async function CandidateProfile({
  params,
}: CandidateProfileProps) {
  const [candidate, candidates] = await Promise.all([
    getCandidateFromSlug(params.candidateSlug),
    getCandidates(),
  ]);

  if (!candidate) {
    notFound();
  }

  const randomOtherCandidates = candidates
    .filter((c) => c.id !== candidate.id)
    .sort((c) => Math.random() - Math.random());

  const toolbar = (
    <aside
      aria-label="Zur Startseite und Teilen"
      className="flex flex-col items-center justify-center gap-5 pb-5 sm:flex-row"
    >
      <BackButton href={`/`}>Zur Startseite</BackButton>

      <ShareButton
        title={`Vorsitzbefragungs-Kabinen Antworten von ${candidate.name}`}
      >
        Teilen
      </ShareButton>
    </aside>
  );

  return (
    <section>
      {toolbar}
      {candidate.hasFinished ? (
        <div className="mb-5">
          <h1 className="my-5 pb-4 text-center text-4xl">
            Die Antworten von {candidate.name}
          </h1>

          <section className="my-8 flex w-full justify-center">
            <div className="relative">
              <PartyLogo
                href={`/${candidate.slug}`}
                priority
                title={`Zur ${candidate.name} Seite`}
                src={`/${candidate.profileImg}`}
              />
            </div>
          </section>

          <nav
            aria-label="Vergleichseiten mit den anderen Parteien"
            className="flex flex-col items-center gap-1 py-6 text-[18px] leading-[21px]"
          >
            <h2 className="mb-3 block font-medium uppercase ">
              Vergleichen mit:
            </h2>
            <div className="flex flex-row flex-wrap justify-center gap-y-3 divide-x divide-black">
              {randomOtherCandidates.map((c) => (
                <Link
                  key={c.id}
                  className="mx-0 px-3 outline-offset-4 outline-black"
                  href={`vergleich/${candidate.slug}/${c.slug}`}
                  title={`Vergleiche ${candidate.name} mit ${c.name}`}
                  prefetch={false}
                >
                  {c.name}
                </Link>
              ))}
              <Link
                className="px-3 outline-offset-4 outline-black"
                href={`/vergleich/${candidates.map((c) => c.slug).join("/")}`}
                title="Vergleiche alle Parteien"
              >
                ALLE
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
                  candidateLinkBase={`/${params.candidateSlug}`}
                  voterAnswer={answer}
                  question={answer.question}
                />
              ))}
          </section>
        </div>
      ) : (
        <p className="my-2">
          {candidate.name} hat die Wahlkabine noch nicht beantwortet.
        </p>
      )}

      {toolbar}
    </section>
  );
}

export async function generateStaticParams() {
  const candidates = await getCandidates();

  return candidates.map((c) => ({ candidateSlug: c.slug }));
}

export async function generateMetadata({ params }: CandidateProfileProps) {
  const candidate = await getCandidateFromSlug(params.candidateSlug);

  if (!candidate) {
    notFound();
  }

  return {
    title: `${candidate.name} | Wahl-Checker EU 2024`,
    description: `15 Fragen beantwortet von ${candidate.name}.`,
    twitter: {
      card: "summary_large_image",
      site: "wahlchecker.at/",
      images: [
        {
          url: `https;//wahlchecker.at/${params.candidateSlug}/opengraph-image`,
          alt: "Wahl-Checker EU 2024",
        },
      ],
    },
  };
}
