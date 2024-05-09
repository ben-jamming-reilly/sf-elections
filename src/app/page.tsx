/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { QuestionaireButton } from "./questionaire-button";
import { Button } from "./ui/button";
import { GlossaredTextServer } from "./ui/glossared-text.server";

export const revalidate = false;

export default async function Home() {
  return (
    <div className="flex h-full flex-col gap-10">
      <article
        aria-label="Erklärtext zum Wahl-Checker"
        className="mx-auto w-[675px] max-w-full text-[18px] leading-[24px]"
      >
        <h1 className="my-5 font-sans text-[36px] leading-[44px]">
          Wahl-Checker EU-Wahl 2024:
          <br /> Was sagen die Parteien?
        </h1>

        <div className="space-y-4 text-[18px] leading-[24px]">
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

          <p>
            {/* @ts-expect-error */}
            <GlossaredTextServer text="Die Europa-Wahl ist also sehr wichtig. In Österreich dürfen am 9. Juni die Menschen ab 16 Jahren wählen. Im EU-Parlament werden 720 Abgeordnete sitzen. 20 von den Abgeordneten kommen aus Österreich." />
          </p>

          <h2 className="pt-5 text-[28px] leading-[34px]">
            Was ist der Wahl-Checker?
          </h2>
          <p>
            {/* @ts-expect-error */}
            <GlossaredTextServer text="Der Wahl-Checker ist eine Orientierungs-Hilfe. Er ist so ähnlich wie die" />{" "}
            "
            <a
              href="https://wahlkabine.at"
              target="_blank"
              className="font-semibold underline"
            >
              Wahlkabine
            </a>
            " ,{/* @ts-expect-error */}
            <GlossaredTextServer text="die es für die EU-Wahl 2024 aber nicht gibt." />
            <br />
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
            <GlossaredTextServer text="Danach kannst Du Deine Meinung vergleichen mit den Meinungen von den 8 Parteien, die man bei der Europa-Wahl in Österreich wählen kann." />
            <br />
            {/* @ts-expect-error */}
            <GlossaredTextServer text="Die Parteien haben außerdem die Gründe für ihre Antworten geschickt. Wir haben die Gründe auch in einfacher Sprache erklärt." />
          </p>

          <p>
            {/* @ts-expect-error */}
            <GlossaredTextServer text="Wir haben außerdem Erklärungen zu wichtigen Wörtern geschrieben. Die Wörter sind gelb markiert. Wenn Du ein gelb markiertes Wort anklickst, kannst Du die Erklärung lesen. Du findest alle Erklärungen auch auf der Seite „Wort-Erklärungen“." />

            {/* @ts-expect-error */}
            <GlossaredTextServer text="Du kannst den Wahl-Checker auch mit einem Screen-Reader benutzen." />
          </p>

          <h2 className="pt-5 text-[28px] leading-[34px]">
            Was ist <span className="italic">andererseits</span>?
          </h2>
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

          <h2 className="pt-5 text-[28px] leading-[34px]">Daten-Schutz</h2>
          <p>
            Der Wahl-Checker ist anonym. Das heißt: Wir wissen nicht, wer Du
            bist und wie Du abgestimmt hast. Mehr Infos zum Datenschutz bei{" "}
            <span className="italic">andererseits</span> findest Du hier:{" "}
            <Link href="/datenschutz" className="font-semibold underline">
              wahlchecker.at/datenschutz
            </Link>
          </p>
        </div>
      </article>

      <nav
        aria-label="Zu den Fragen oder Wort-Erklärungen"
        className="mx-auto flex w-fit flex-col gap-5 text-2xl md:flex-row"
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
        <QuestionaireButton />
      </nav>
    </div>
  );
}
