/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { QuestionaireButton } from "../questionaire-button";
import { Button } from "../ui/button";
import { GlossaredTextServer } from "../ui/glossared-text.server";
import { MagazineCta } from "../ui/magazine-cta";

export const revalidate = false;

export default async function ElectionHome({
  params,
}: {
  params: { electionSlug: string };
}) {
  return (
    <div className="flex h-full flex-col gap-10">
      <section
        aria-label="Erklärtext zum Wahl-Checker"
        className="mx-auto w-[900px] max-w-full text-[1.125rem] leading-[1.6875rem]"
      >
        {params.electionSlug === "eu-2024" && (
          <EU2024Election electionSlug={params.electionSlug} />
        )}
        {params.electionSlug === "nr-2024" && (
          <NR2024Election electionSlug={params.electionSlug} />
        )}
      </section>
    </div>
  );
}

const EU2024Election = ({ electionSlug }: { electionSlug: string }) => {
  return (
    <div>
      <h1 className="my-5 font-sans text-[2.25rem] leading-[2.75rem]">
        Wahl-Checker EU-Wahl 2024:
        <br /> Was sagen die Parteien?
      </h1>

      <div className="space-y-4 text-[1.125rem] leading-[1.5rem]">
        <p>
          {/* @ts-expect-error */}
          <GlossaredTextServer text="Vom 6. bis 9. Juni 2024 ist die Europa-Wahl." />
        </p>

        <p>
          {/* @ts-expect-error */}
          <GlossaredTextServer text="Rund 450 Millionen Menschen in Europa dürfen entscheiden, wer sie im EU-Parlament vertreten soll." />
          <br />
          {/* @ts-expect-error */}
          <GlossaredTextServer text="EU ist kurz für: Europäische Union. In der EU arbeiten 27 Länder aus Europa zusammen." />
          <br />
          {/* @ts-expect-error */}
          <GlossaredTextServer text="Das EU-Parlament arbeitet an den Regeln mit, die die EU für alle Mitglieds-Länder macht." />
        </p>

        <h2 className="pt-5 text-[1.75rem] leading-[2.125rem]">
          Was ist der Wahl-Checker?
        </h2>
        <p>
          {/* @ts-expect-error */}
          <GlossaredTextServer text="Der Wahl-Checker ist eine Orientierungs-Hilfe. Er ist so ähnlich wie die" />{" "}
          "
          <a
            href="https://wahlkabine.at"
            target="_blank"
            title="Zu wahlkabine.at, öffnet in neuem Fenster"
            className="font-semibold underline"
          >
            Wahlkabine
          </a>
          ", {/* @ts-expect-error */}
          <GlossaredTextServer text="die es für die EU-Wahl 2024 aber nicht gibt." />{" "}
          {/* @ts-expect-error */}
          <GlossaredTextServer
            text="Im Wahl-Checker stehen 15 Fragen zu wichtigen Themen, um die sich
          die EU kümmert. Zum Beispiel Klima-Schutz, Flüchtlinge, Arbeit und
          Inklusion. Du kannst zu jeder Frage Deine Meinung sagen: „Ja“ oder
          „Nein“ oder „Ich weiß es nicht“. Du kannst auch sagen, wie wichtig
          Dir jedes Thema ist."
          />
        </p>

        <p>
          {/* @ts-expect-error */}
          <GlossaredTextServer text="Danach kannst Du Deine Meinung vergleichen mit den Meinungen von den 7 Parteien, die man bei der Europa-Wahl in Österreich wählen kann." />
        </p>

        <p>
          {/* @ts-expect-error */}
          <GlossaredTextServer text="Wir haben außerdem Erklärungen zu wichtigen Wörtern geschrieben. Die Wörter sind gelb markiert. Wenn Du ein gelb markiertes Wort anklickst, kannst Du die Erklärung lesen. Du findest alle Erklärungen auch auf der Seite „Wort-Erklärungen“." />{" "}
        </p>

        <nav
          aria-label="Zu den Fragen oder Wort-Erklärungen"
          className="mx-auto flex w-fit flex-col gap-5 py-10 text-2xl md:flex-row"
        >
          <Button
            roundness="large"
            className=""
            as="a"
            variant="secondary"
            href="/glossar"
          >
            Wort-Erklärungen
          </Button>
          <QuestionaireButton electionSlug={electionSlug} />
        </nav>

        <h2 className=" text-[1.75rem] leading-[2.125rem]">
          Was ist <span className="italic">andererseits</span>?
        </h2>
        <p>
          Der Wahl-Checker wird von der Medienhaus andererseits GmbH
          veröffentlicht und wurde in Kooperation mit dem Verein andererseits -
          für Inklusion im Journalismus und der Hil-Foundation entwickelt.
        </p>
        <p>
          <span className="italic">andererseits</span> ist ein Magazin für
          Behinderung und Gesellschaft. Bei{" "}
          <span className="italic">andererseits</span> machen Menschen mit und
          ohne Behinderung Journalismus. Das Team arbeitet gleichberechtigt,
          kritisch und fair bezahlt. <br />
          Hier erfährst du mehr über{" "}
          <span className="italic">andererseits</span>:{" "}
          <a
            target="_blank"
            href="https://andererseits.org"
            className="font-semibold underline"
          >
            andererseits.org
          </a>
        </p>

        <h2 className="pt-5 text-[1.75rem] leading-[2.125rem]">Daten-Schutz</h2>
        <p>
          Der Wahl-Checker ist anonym. Das heißt: Wir wissen nicht, wer Du bist
          und wie Du abgestimmt hast. Mehr Infos zum Datenschutz findest Du
          hier:{" "}
          <Link href="/datenschutz" className="font-semibold underline">
            wahlchecker.at/datenschutz
          </Link>
        </p>
      </div>

      <MagazineCta electionSlug={electionSlug} />
    </div>
  );
};

const NR2024Election = ({ electionSlug }: { electionSlug: string }) => {
  return (
    <div>
      <h1 className="my-5 font-sans text-[2.25rem] leading-[2.75rem]">
        Wahl-Checker NR-Wahl 2024:
        <br /> Was sagen die Parteien?
      </h1>

      <div className="space-y-4 text-[1.125rem] leading-[1.5rem]">
        <p>
          {/* @ts-expect-error */}
          <GlossaredTextServer text="Vom 6. bis 9. Juni 2024 ist die Europa-Wahl." />
        </p>

        <p>
          {/* @ts-expect-error */}
          <GlossaredTextServer text="Rund 450 Millionen Menschen in Europa dürfen entscheiden, wer sie im EU-Parlament vertreten soll." />
          <br />
          {/* @ts-expect-error */}
          <GlossaredTextServer text="EU ist kurz für: Europäische Union. In der EU arbeiten 27 Länder aus Europa zusammen." />
          <br />
          {/* @ts-expect-error */}
          <GlossaredTextServer text="Das EU-Parlament arbeitet an den Regeln mit, die die EU für alle Mitglieds-Länder macht." />
        </p>

        <h2 className="pt-5 text-[1.75rem] leading-[2.125rem]">
          Was ist der Wahl-Checker?
        </h2>
        <p>
          {/* @ts-expect-error */}
          <GlossaredTextServer text="Der Wahl-Checker ist eine Orientierungs-Hilfe. Er ist so ähnlich wie die" />{" "}
          "
          <a
            href="https://wahlkabine.at"
            target="_blank"
            title="Zu wahlkabine.at, öffnet in neuem Fenster"
            className="font-semibold underline"
          >
            Wahlkabine
          </a>
          ", {/* @ts-expect-error */}
          <GlossaredTextServer text="die es für die EU-Wahl 2024 aber nicht gibt." />{" "}
          {/* @ts-expect-error */}
          <GlossaredTextServer
            text="Im Wahl-Checker stehen 15 Fragen zu wichtigen Themen, um die sich
            die EU kümmert. Zum Beispiel Klima-Schutz, Flüchtlinge, Arbeit und
            Inklusion. Du kannst zu jeder Frage Deine Meinung sagen: „Ja“ oder
            „Nein“ oder „Ich weiß es nicht“. Du kannst auch sagen, wie wichtig
            Dir jedes Thema ist."
          />
        </p>

        <p>
          {/* @ts-expect-error */}
          <GlossaredTextServer text="Danach kannst Du Deine Meinung vergleichen mit den Meinungen von den 7 Parteien, die man bei der Europa-Wahl in Österreich wählen kann." />
        </p>

        <p>
          {/* @ts-expect-error */}
          <GlossaredTextServer text="Wir haben außerdem Erklärungen zu wichtigen Wörtern geschrieben. Die Wörter sind gelb markiert. Wenn Du ein gelb markiertes Wort anklickst, kannst Du die Erklärung lesen. Du findest alle Erklärungen auch auf der Seite „Wort-Erklärungen“." />{" "}
        </p>

        <nav
          aria-label="Zu den Fragen oder Wort-Erklärungen"
          className="mx-auto flex w-fit flex-col gap-5 py-10 text-2xl md:flex-row"
        >
          <Button
            roundness="large"
            className=""
            as="a"
            variant="secondary"
            href="/glossar"
          >
            Wort-Erklärungen
          </Button>
          <QuestionaireButton electionSlug={electionSlug} />
        </nav>

        <h2 className=" text-[1.75rem] leading-[2.125rem]">
          Was ist <span className="italic">andererseits</span>?
        </h2>
        <p>
          Der Wahl-Checker wird von der Medienhaus andererseits GmbH
          veröffentlicht und wurde in Kooperation mit dem Verein andererseits -
          für Inklusion im Journalismus und der Hil-Foundation entwickelt.
        </p>
        <p>
          <span className="italic">andererseits</span> ist ein Magazin für
          Behinderung und Gesellschaft. Bei{" "}
          <span className="italic">andererseits</span> machen Menschen mit und
          ohne Behinderung Journalismus. Das Team arbeitet gleichberechtigt,
          kritisch und fair bezahlt. <br />
          Hier erfährst du mehr über{" "}
          <span className="italic">andererseits</span>:{" "}
          <a
            target="_blank"
            href="https://andererseits.org"
            className="font-semibold underline"
          >
            andererseits.org
          </a>
        </p>

        <h2 className="pt-5 text-[1.75rem] leading-[2.125rem]">Daten-Schutz</h2>
        <p>
          Der Wahl-Checker ist anonym. Das heißt: Wir wissen nicht, wer Du bist
          und wie Du abgestimmt hast. Mehr Infos zum Datenschutz findest Du
          hier:{" "}
          <Link href="/datenschutz" className="font-semibold underline">
            wahlchecker.at/datenschutz
          </Link>
        </p>
      </div>

      <MagazineCta electionSlug={electionSlug} />
    </div>
  );
};
