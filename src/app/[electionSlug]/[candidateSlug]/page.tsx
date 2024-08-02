import { notFound } from "next/navigation";
import { getCandidateFromSlug } from "./get-candidate-from-slug";
import { ShareButton } from "../../ui/share-button";
import Link from "next/link";
import { BackButton } from "../../ui/back-button";
import { getCandidates } from "../../get-candidates";
import { QuestionWithAnswers } from "../../ui/question-with-answers";
import { PartyLogo } from "../../ui/party-logo";
import { getGlossarEntries } from "../../glossar/get-glossar-entries";
import { MagazineCta } from "../../ui/magazine-cta";

export const revalidate = 18000; // 5 hours

export type CandidateProfileProps = {
  params: { candidateSlug: string; electionSlug: string };
};

export default async function CandidateProfile({
  params,
}: CandidateProfileProps) {
  const [candidate, candidates, glossarEntries] = await Promise.all([
    getCandidateFromSlug({
      candidateSlug: params.candidateSlug,
      electionSlug: params.electionSlug,
    }),
    getCandidates(),
    getGlossarEntries(),
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
            className="flex flex-col items-center gap-1 py-6 text-[1.125rem] leading-[1.3125rem]"
          >
            <h2 className="mb-3 block font-medium uppercase ">
              Vergleichen mit:
            </h2>
            <div className="flex flex-row flex-wrap justify-center gap-y-3 divide-x divide-black">
              {randomOtherCandidates.map((c) => (
                <Link
                  key={c.id}
                  className="mx-0 px-3 outline-offset-4 outline-black notouch:hover:font-semibold"
                  href={`vergleich/${candidate.slug}/${c.slug}`}
                  title={`Vergleiche ${candidate.name} mit ${c.name}`}
                  prefetch={false}
                >
                  {c.name}
                </Link>
              ))}
              <Link
                className="px-3 outline-offset-4 outline-black notouch:hover:font-semibold"
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
                  voterType="candidate"
                  glossarEntries={glossarEntries}
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

      <MagazineCta electionSlug={params.electionSlug} />

      {toolbar}
    </section>
  );
}

export async function generateStaticParams() {
  const candidates = await getCandidates();

  return candidates.map((c) => ({ candidateSlug: c.slug }));
}

export async function generateMetadata({ params }: CandidateProfileProps) {
  const candidate = await getCandidateFromSlug({
    candidateSlug: params.candidateSlug,
    electionSlug: params.electionSlug,
  });

  if (!candidate) {
    notFound();
  }

  return {
    title: `${candidate.name} | Wahl-Checker EU 2024 von andererseits`,
    description: `15 Fragen beantwortet von ${candidate.name}.`,
  };
}
