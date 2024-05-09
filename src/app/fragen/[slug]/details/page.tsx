import { notFound } from "next/navigation";
import { getVoterViaHash } from "../../get-voter-via-hash";
import { ShareButton } from "~/app/ui/share-button";
import { getCandidatesWithQuestions } from "../get-candidates-with-questions";
import { BackButton } from "~/app/ui/back-button";
import { DownloadImageLink } from "~/app/ui/download-image-link";
import { QuestionWithAnswers } from "~/app/ui/question-with-answers";
import { PartyLogo } from "~/app/ui/party-logo";

export type WahlkabineResultDetailsProps = {
  params: {
    slug: string;
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
      <BackButton href={`/fragen/${params.slug}/`}>Zur Übersicht</BackButton>
      <ShareButton title="Wahl-Checker EU 2024">Teilen</ShareButton>
      <DownloadImageLink
        title="andererseits-Wahl-Checker EU-resultat.jpg"
        href={`/api/og/generate/instagram/result?slug=${params.slug}`}
      >
        Bild herunterladen
      </DownloadImageLink>
    </aside>
  );

  return (
    <div>
      {toolbar}

      <section>
        <h1 className="my-5 pb-4 text-center text-4xl">
          Zu den Antworten von den Parteien:
        </h1>

        <nav
          aria-label="Links zu den Antworten der einzelnen Parteien"
          className="mx-auto my-10 grid w-[724px] max-w-full grid-cols-2 flex-row flex-wrap place-items-center items-center justify-evenly gap-x-3 gap-y-6 xs:flex"
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
      </section>

      <section
        aria-labelledby="details-page-questions-overview-title"
        className="flex flex-col gap-10 py-10"
      >
        <div className="mx-auto w-[60ch] max-w-full space-y-3 text-center">
          <h2 id="details-page-questions-overview-title" className="text-4xl">
            Hier kannst Du Deine Antworten mit allen Parteien vergleichen
          </h2>
          <p>
            Die Parteien haben außerdem geschrieben, was der Grund für ihre
            Meinung ist. Das kannst Du lesen, wenn Du auf „Mehr Infos“ klickst.
            Wir haben die Gründe auch in einfacher Sprache erklärt.
            <br />
            <br /> Die Reihenfolge der Parteien ist zufällig.
          </p>
        </div>
        <div>
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

  return {
    title: `Mein Wahl-Checker EU Ergebnis `,
    description: ``,
    twitter: {
      card: "summary_large_image",
      site: "wahlchecker.at",
      title: `Mein Wahl-Checker EU Ergebnis `,
      description: ``,
      images: [
        {
          url: `https;//wahlchecker.at/fragen/${params.slug}/opengraph-image`,
          alt: "Wahl-Checker EU 2024",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
