import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutz – Wahlchecker EU 2024",
  description: "",
  twitter: {
    card: "summary_large_image",
    title: "Datenschutz – Wahlchecker EU 2024",
    description: "",
    site: "wahlchecker.at",
    images: [
      {
        url: "wahlchecker.at/opengraph-image",
        alt: "Datenschutz – Wahlchecker EU 2024",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Datenschutz({}: {}) {
  return (
    <article className="prose mx-auto">
      <h1 className="text-3xl">Datenschutz</h1>

      <p>
        Das ist die Datenschutzerklärung für{" "}
        <Link href="/">wahlchecker.at</Link>. Die Datenschutzerklärung von
        andererseits.org finden Sie hier:{" "}
        <a href="https://andererseits.org/datenschutz">
          andererseits.org/datenschutz
        </a>
      </p>

      <h2 className="text-2xl">TLDR – Welche Daten wir verarbeiten</h2>

      <p>
        Die Privatsphäre unserer Website-Besucher ist uns sehr wichtig. Daher
        sollen Sie zu jeder Zeit wissen, wann welche personenbezogenen Daten auf
        welche Weise uns verwendet werden. Wir unterliegen den Bestimmungen der
        europäischen Datenschutzgrundverordnung (DSGVO) sowie den ergänzenden
        Bestimmungen des österreichischen Datenschutzgesetzes (DSG).
      </p>
      <p>Als Besucher dieser Seite:</p>
      <ul>
        <li>werden keine persönlichen Informationen gespeichert</li>
        <li>
          werden keine Informationen, wie z.B. Cookies, im Browser gespeichert
        </li>
        <li>
          werden keine Informationen mit Dritten (z.B. Werbefirmen) geteilt, an
          diese gesendet oder verkauft
        </li>
        <li>
          werden keine Informationen über persönliche und verhaltensbezogene
          Trends gesammelt und ausgewertet
        </li>
        <li>werden keine Informationen monetarisiert</li>
      </ul>

      <h2 className="text-2xl">Vollständige Datenschutzerklärung</h2>
      <p>
        Diese Datenschutzerklärung klärt Sie als Besucher dieser Website über
        die Art, den Umfang und die Zwecke der Erhebung und Verwendung
        personenbezogener Daten auf.
      </p>

      <p>
        Die folgenden Informationen gelten für alle Datenverarbeitungen im
        Rahmen dieser Website (wahlchecker.at).
      </p>

      <h3 className="text-xl">Links</h3>
      <p>
        Auf dieser Website sind zu Informationszwecken Links zu anderen Websites
        gesetzt. Diese Websites stehen nicht unter unser Kontrolle und fallen
        daher nicht unter die Bestimmungen dieser Datenschutzerklärung. Wird ein
        Link aktiviert, ist es möglich, dass der Betreiber dieser Website Daten
        über Sie gemäß seiner Datenschutzerklärung erhebt und verarbeitet.
      </p>

      <h3 className="text-xl">Verantwortlich</h3>
      <p>Verantwortliche gemäß Art 4 Z 7 DSGVO ist:</p>
      <p>
        Medienhaus andererseits GmbH
        <br />
        <strong>E-Mail:</strong>{" "}
        <a href="mailto:redaktion@andererseits.org">
          redaktion@andererseits.org
        </a>
      </p>

      <h3 className="text-xl">Verarbeitung</h3>
      <h4 className="text-lg font-semibold">Besuch der Webseite</h4>
      <p>
        Beim Besuch unserer Website werden zunächst einige personenbezogene
        Daten von uns erhoben. Nachfolgende Daten werden von Ihrem Browser an
        unsere Server übermittelt:
      </p>
      <ul>
        <li>IP-Adresse des Nutzers</li>
        <li>Datum und Uhrzeit der Anfrage</li>
        <li>Inhalt der Anforderung (konkrete Seite)</li>
        <li>Zugriffsstatus/HTTP-Statuscode</li>
        <li>jeweils übertragene Datenmenge</li>
        <li>Website, von der die Anforderung kommt</li>
        <li>Betriebssystem des Nutzers</li>
        <li>Sprache und Version der Browsersoftware</li>
      </ul>

      <p>
        Diese Datenerhebung ist zunächst technisch bedingt, damit unserer
        Website in Ihrem Browser angezeigt werden kann.
      </p>

      <h4 className="text-lg font-semibold">Website-Statistik</h4>
      <p>
        In weiterer Folge werden die oben genannten Daten an unseren
        Auftragsverarbeiter (Plausible Insights OÜ) weitergeleitet, um
        grundsätzliche Statistiken zur Nutzung unserer Website auswerten zu
        können. Ihre IP-Adresse wird im Laufe dieser Auswertung gelöscht.
        Dadurch werden die weiter verwendeten Daten anonymisiert (eine Zuordnung
        dieser Daten zu Ihnen als Website-Besucher ist also nicht mehr möglich).
      </p>
      <p>
        Das Ziel ist es, allgemeine Trends in unserem Website-Verkehr zu
        verfolgen, nicht jedoch, Daten, die auf den einzelnen Besucher
        rückführbar sind, zu speichern oder zu verwerten.
      </p>
      <p>
        Alle Daten werden nur in aggregierter Form gespeichert. Zu diesen
        gespeicherten Daten gehören Verweisquellen, Top-Seiten, Besuchsdauer,
        Informationen über die während des Besuchs verwendeten Geräte
        (Gerätetyp, Betriebssystem, Land und Browser).
      </p>
      <p>
        Alle Einzelheiten des verwendeten Tools (Plausible Analytics-Skript),
        können Sie in der Datenrichtlinie von Plausible Insights OÜ finden:{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://plausible.io/data-policy"
        >
          Plausible Analytics
        </a>
        .
      </p>

      <h4 className="text-lg font-semibold">E-Mail-Kontakt</h4>
      <p>
        Auf unserer Website finden E-Mail-Links (mailto), mit denen Sie schnell
        mit uns Kontakt aufnehmen können. Im Rahmen einer solchen Kommunikation
        werden von Ihnen mitunter personenbezogene Daten an uns übermittelt
        werden (z.B. wenn Ihr Name aus der E-Mail-Adresse hervorgeht). Je nach
        Ihrer Anfrage werden wir diese Daten zweckgebunden verarbeiten. Wir
        löschen die Anfragen und Sie betreffende Daten, sofern diese nicht mehr
        erforderlich sind und keine gesetzlichen Speicherungspflichten bestehen.
      </p>

      <h3 className="text-xl">Rechtsgrundlage der Datenverarbeitung</h3>
      <p>
        Wir verarbeiten personenbezogene Daten aufgrund berechtigter Interessen
        gemäß Art 6 Abs 1 lit f DSGVO.
      </p>
      <p>
        Die Erhebung Ihrer personenbezogenen Daten beim Aufruf und Verwenden
        unserer Website ist technisch notwendig, um diese Website anzeigen zu
        lassen.
      </p>
      <p>
        Die Weiterleitung dieser Daten an unserem Auftragsverarbeiter (Plausible
        Insights OÜ) erfolgt zu statistischen Zwecken, um unseren Web-Auftritt
        stetig verbessern zu können. Die hierbei verarbeiteten Daten werden
        zunächst anonymisiert und erst infolge ausgewertet bzw. abgespeichert.
      </p>
      <p>
        Im Zuge einer Kontaktaufnahme per E-Mail werden personenbezogenen Daten
        notwendigerweise verarbeitet, damit eine effektiven Bearbeitung dieser
        Anfragen gewährleistet werden kann.
      </p>
      <p>
        Durch diese differenzierten Abwägungen soll das Interesse unserer
        Website-Besucher auf Schutz ihrer personenbezogenen Daten im Sinne des
        Art 6 Abs 1 lit f DSGVO gewahrt werden.
      </p>
      <h3 className="text-xl">Speicherdauer und Löschung von Daten</h3>
      <p>
        Sobald der Zweck für die Speicherung entfällt, löschen wir Ihre
        personenbezogenen Daten unverzüglich.
      </p>
      <h3 className="text-xl">Auftragsverarbeiter</h3>
      <p>
        Für die Datenverarbeitung im Zuge der Erstellung unserer
        Website-Statistik ziehen wir einen Auftragsverarbeiter heran (Plausible
        Insights OÜ). Plausible Analytics wird genutzt um anonyme, nicht
        personenbezogene Statistiken zur Nutzung von Websites aufzustellen.
      </p>
      <h3 className="text-xl">Betroffenenrechte</h3>
      <p>
        Soweit personenbezogene Daten von Ihnen verarbeitet werden, sind Sie
        Betroffener im Sinne des Art 4 Z 1 DSGVO. Damit stehen Ihnen gegenüber
        uns als Verantwortliche folgende Rechte zu:
      </p>
      <ul>
        <li>Recht auf Auskunft</li>
        <li>Recht auf Berichtigung</li>
        <li>Recht auf Löschung</li>
        <li>Recht auf Einschränkung der Datenverarbeitung</li>
        <li>Recht auf Datenübertragbarkeit</li>
        <li>Recht auf Widerspruch der Verarbeitung</li>
      </ul>
      <p>
        Diese Rechte können einfach per Mail an{" "}
        <a href="mailto:redaktion@andererseits.org">
          redaktion@andererseits.org
        </a>{" "}
        geltend gemacht werden.
      </p>
      <p>
        Wir weisen Sie darauf hin, dass von uns nach dem Besuch unserer Website
        und im Zuge der Website-Statistik keine Speicherung von
        personenbezogenen Daten stattfindet. Daher können wir für diese Fälle
        keinen Anfragen auf Auskunft, Berichtigung, Löschung, Einschränkung der
        Verarbeitung, Datenübertragbarkeit oder Widerruf nachkommen.
      </p>
      <p>
        Sollten Sie der Ansicht sein, dass die Verarbeitung der sie betreffenden
        personenbezogenen Daten gegen die DSGVO oder das DSG verstößt haben Sie
        unbeschadet eines anderweitigen verwaltungsrechtlichen oder
        gerichtlichen Rechtsbehelfs das Recht auf Beschwerde bei einer
        Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres
        Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen
        Verstoßes.
      </p>
      <p>
        In Österreich sorgt die Datenschutzbehörde (
        <a
          href="https://www.dsb.gv.at/"
          target="_blank"
          rel="noreferrer noopener"
        >
          https://www.dsb.gv.at/
        </a>
        ) für die Einhaltung des Datenschutzes.
      </p>
    </article>
  );
}

export const runtime = "edge";
export const revalidate = false;
