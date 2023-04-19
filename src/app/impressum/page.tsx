import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | SPÖ Vorsitz Wahlkabine",
  description: "SPÖ Wahlkabine",
};

export default function Home() {
  return (
    <section className="w-[50ch] mx-auto">
      <h1 className="text-4xl my-5 pb-4 text-center border-b-2 border-gray-800 dark:border-white">
        Impressum
      </h1>

      <div className="space-y-5">
        <p>
          Impressum & Offenlegung gem. §§ 24, 25 Mediengesetz sowie
          Anbieteridentifizierung gem. § 5/1 ECG.
        </p>
        <br />
        <p>
          <strong>
            Medieninhaber, Herausgeber, Hersteller und Eigentümer (zu 100%):
          </strong>{" "}
          <br />
          Junge Generation in der SPÖ Wien
          <br /> Löwelstraße 18, A-1010 Wien <br />
          <br />
          <strong>Telefon:</strong>{" "}
          <a
            className="text-brand hover:underline underline-offset-2"
            href="tel:+430153427233"
          >
            +43 (01) 534 27 233
          </a>{" "}
          <br />
          <strong>E-Mail:</strong>{" "}
          <a
            className="text-brand hover:underline underline-offset-2"
            href="mailto:junge.generation@spw.at"
          >
            junge.generation@spw.at
          </a>
        </p>
        <p>
          <strong>Vorsitzende:</strong> Mag. Alexander Ackerl <br />
          <strong>Landessekretärin:</strong> Phillip Zimmerman
        </p>
        <p>
          <strong>Grundlegende Richtung:</strong> Die Website der Jungen
          Generation ist ein Diskussions- und Informationsorgan der Jungen
          Generation in der SPÖ Wien und will einen Beitrag zum freien
          politischen Diskurs und zu einer umfassenden und kritischen
          politischen Information der Öffentlichkeit leisten.
        </p>
        <p>
          <strong>Kontakt:</strong> Junge Generation in der SPÖ Wien Löwelstraße
          18 A-1010 Wien <br />
          <strong>Tel.:</strong>{" "}
          <a
            className="text-brand hover:underline underline-offset-2"
            href="tel:+430153427233"
          >
            +43 (01) 534 27 233
          </a>{" "}
          <br />
          <strong>E-Mail:</strong>{" "}
          <a
            className="text-brand hover:underline underline-offset-2"
            href="mailto:junge.generation@spw.at"
          >
            junge.generation@spw.at
          </a>
        </p>
        <p>
          <strong>Konzept und Umsetzung:</strong>{" "}
          <a
            className="text-brand hover:underline underline-offset-2"
            href="https://arthouse.agency"
            target="_blank"
            rel="noopener noreferrer"
          >
            Christian Cito / arthouse.agency
          </a>
        </p>
        <p>
          <strong>Herstellungs- und Erscheinungsort:</strong> Wien
        </p>
      </div>
    </section>
  );
}
