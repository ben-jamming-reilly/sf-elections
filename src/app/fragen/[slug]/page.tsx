import { notFound } from "next/navigation";
import { getVoterViaHash } from "../get-voter-via-hash";
import { ShareButton } from "~/app/ui/share-button";
import { getCandidatesWithQuestions } from "./get-candidates-with-questions";
import { BackButton } from "~/app/ui/back-button";
import { DownloadImageLink } from "~/app/ui/download-image-link";
import { PartyLogo } from "~/app/ui/party-logo";
import { Button } from "~/app/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

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

const MAX_POINTS = 15 * 27;

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

  const toolbar = (
    <aside
      aria-label="Zurück & Teilen"
      className="flex flex-row flex-wrap justify-center gap-5"
    >
      <BackButton href={`/`}>Zur Startseite</BackButton>
      <ShareButton title="Wahl-Checker EU 2024">Teilen</ShareButton>
      <DownloadImageLink
        title="wahlchecker-andererseits.jpg"
        href={`/shareable-wide.png`}
      >
        Bild zum Teilen
      </DownloadImageLink>
    </aside>
  );

  return (
    <div className="flex flex-col gap-5">
      {toolbar}

      <section
        aria-label="Ergebnis Übersicht"
        className="my-10 flex w-[900px] max-w-full flex-col items-center gap-10"
      >
        <div className="w-full">
          <h1 className="mb-3 text-4xl">Dein Ergebnis</h1>
          <div className="space-y-3">
            <p>
              Du hast 15 Fragen über die EU-Politik beantwortet. Hier kannst Du
              sehen, welche Parteien eine ähnliche Meinung zu den Fragen haben
              wie Du.
            </p>
            <p>
              Wir haben die Antworten von den Parteien mit Deinen Antworten
              verglichen. Und wir haben verglichen, wie wichtig die einzelnen
              Fragen für Dich und die Parteien sind.
            </p>
            <p>
              Je größer der grüne Balken ist, desto mehr ähnliche Meinungen hast
              Du mit einer Partei.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col">
          {voterWithAnswers.candidateMatches
            .sort((a, b) => b.score - a.score)
            .map((match) => (
              <article
                aria-label={`Kandidat: ${match.candidate.name} - Übereinstimmung: ${match.score}/${MAX_POINTS} Punkten`}
                key={`candidate-match-overview-${match.candidate.id}`}
                className="relative -mt-[2px] flex h-[60px] w-full flex-row items-center justify-center overflow-clip  rounded-[200px] border-2 border-black px-3 [--radius-offset:60px] sm:px-7 md:[--radius-offset:90px] xs:[--radius-offset:75px]"
              >
                <PartyLogo
                  src={`/${match.candidate.profileImg}`}
                  alt=""
                  title={`Vergleiche Deine Antworten mit ${match.candidate.name}`}
                  href={`/fragen/${params.slug}/vergleich/${match.candidate.slug}`}
                  className="z-20 -mt-[2px] h-[calc(100%+4px)] w-[120px] border-2 sm:w-[180px] xs:w-[150px]"
                />

                <div
                  aria-hidden="true"
                  className={clsx(
                    "absolute bottom-0 top-0 z-10 w-[var(--radius-offset)]",
                    match.score > 0 && "left-1/2 bg-[#98EB8B]",
                    match.score < 0 && "right-1/2 bg-[#FFA06E]",
                  )}
                />

                <div
                  aria-hidden="true"
                  className={clsx(
                    "absolute bottom-0 top-0 z-10 w-[calc(50%-var(--radius-offset))]",
                    match.score > 0 && "left-[calc(50%+var(--radius-offset))]",
                    match.score < 0 && "right-[calc(50%+var(--radius-offset))]",
                  )}
                >
                  <div
                    style={{
                      width: `${(Math.abs(match.score) / MAX_POINTS) * 100}%`,
                    }}
                    className={clsx(
                      "absolute bottom-0 top-0 z-10",
                      match.score > 0 && "left-0 bg-[#98EB8B]",
                      match.score < 0 && "right-0 bg-[#FFA06E]",
                    )}
                  />
                </div>
              </article>
            ))}
        </div>

        <div className="w-full space-y-3">
          <p>
            <strong className="font-semibold">Wichtig:</strong>
            <br /> Das Ergebnis ist keine Wahl-Empfehlung. Es bedeutet nicht,
            dass Du die Partei mit der größten Ähnlichkeit im Wahl-Checker
            wählen sollst. Das Ergebnis zeigt nur, welche Parteien auf die 15
            Fragen ähnlich geantwortet haben wie Du.
          </p>
          <p>
            Auf der nächsten Seite kannst Du Dir die Antworten von allen
            Parteien anschauen und mit Deinen Antworten vergleichen.
          </p>
        </div>

        <Button
          as="Link"
          href={`/fragen/${params.slug}/details`}
          variant="primary"
          roundness="large"
        >
          <ArrowRightIcon
            aria-hidden="true"
            className="ml-1 inline h-5 w-5 stroke-2"
          />
          Zu den Antworten
        </Button>
      </section>
    </div>
  );
}

export async function generateMetadata({ params }: WahlkabineResultProps) {
  const voterWithAnswers = await getVoterViaHash(params.slug);

  if (!voterWithAnswers) {
    notFound();
  }

  return {
    title: `Mein Wahl-Checker EU Ergebnis`,
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
