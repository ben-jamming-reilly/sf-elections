import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz | SPÖ Vorsitzbefragungs-Kabine",
  description:
    "Finde heraus welche*r Kandidat*in für die SPÖ Vorsitzbefragung 2023 am Besten zu dir passt.",
  twitter: {
    card: "summary_large_image",
  },
};

export default function Datenschutz() {
  return (
    <section className="w-[60ch] max-w-full mx-auto">
      <h1 className="text-4xl my-5 pb-4 text-center border-b-2 border-gray-800 dark:border-white">
        Datenschutz
      </h1>

      <div className="space-y-5">
        <p>
          Die Junge Generation in der SPÖ Wien ist sich ihrer großen
          Verantwortung bei der Verarbeitung personenbezogener Daten bewusst und
          verpflichtet sich daher im Rahmen ihrer gesellschaftlichen
          Verantwortung zur vollständigen Einhaltung von Datenschutzrechten. Die
          Persönlichkeitsrechte und die Privatsphäre eines jeden Einzelnen zu
          wahren, ist für die Junge Generation in der SPÖ Wien oberste Priorität
          im Umgang mit personenbezogenen Daten.
        </p>
        <p>
          Wir handeln hierbei nach den Grundsätzen von Rechtmäßigkeit,
          Transparenz, Zweckbindung, Speicherbegrenzung und Datensicherheit.
        </p>
        <h2 className="text-2xl">Welche Daten wir verarbeiten</h2>
        <p>
          <strong>TLDR: </strong>Wir nutzen keine Cookies und sammeln keine
          personenbezogenen Daten.
        </p>
        <p>
          Die Privatsphäre unserer Website-Besucher ist uns wichtig, daher
          erfassen wir keine einzelnen Personen.
        </p>
        <p>
          Als Besucher der dieser Seite:
          <ul className="list-disc ml-5">
            <li>werden keine persönlichen Informationen gesammelt</li>
            <li>
              werden keine Informationen, wie z.B. Cookies, im Browser
              gespeichert
            </li>
            <li>
              werden keine Informationen mit Dritten geteilt, an diese gesendet
              oder verkauft
            </li>
            <li>werden keine Informationen mit Werbefirmen geteilt</li>
            <li>
              werden keine Informationen über persönliche und verhaltensbezogene
              Trends gesammelt und ausgewertet
            </li>
            <li>werden keine Informationen monetarisiert</li>
          </ul>
        </p>
        <p>
          Wir lassen das Plausible Analytics-Skript laufen, um einige anonyme
          Nutzungsdaten zu statistischen Zwecken zu sammeln. Das Ziel ist es,
          allgemeine Trends in unserem Website-Verkehr zu verfolgen, nicht
          jedoch, einzelne Besucher zu verfolgen.
        </p>
        <p>
          Alle Daten werden nur in aggregierter Form erfasst. Es werden keine
          persönlichen Daten gesammelt. Zu den erfassten Daten gehören
          Verweisquellen, Top-Seiten, Besuchsdauer, Informationen über die
          während des Besuchs verwendeten Geräte (Gerätetyp, Betriebssystem,
          Land und Browser) und mehr.
        </p>{" "}
        <p>
          Alle Einzelheiten finden Sie in der{" "}
          <a
            className="text-brand hover:underline underline-offset-2"
            href="https://plausible.io/data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datenrichtlinie von Plausible Analytics
          </a>
          .
        </p>
      </div>
    </section>
  );
}
