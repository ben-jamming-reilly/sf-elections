import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulation | SPÖ Vorsitzbefragungs-Kabine",
  description:
    "Finde heraus welche*r Kandidat*in für die SPÖ Vorsitzbefragung 2023 am Besten zu dir passt.",
  twitter: {
    card: "summary_large_image",
  },
};

export default function Kalkulation() {
  return (
    <section className="w-[60ch] max-w-full mx-auto">
      <h1 className="text-4xl my-5 pb-4 text-center border-b-2 border-gray-800 dark:border-white">
        Kalkulation
      </h1>

      <div className="space-y-5">
        <p>
          Die Kalkulation des Matches basiert auf einer einfachen Formel, die
          die Übereinstimmung der Antworten der Kandidat*innen mit den Antworten
          der Nutzer*innen berechnet.
          <br />
          <br />
          Pro Frage wird bis zu 1.15 Punkte für eine*n Kandidat*in zugewiesen.
          Bis zu 1 Punkt für die Antwort und bis zu 0.15 Punkte für die
          Relevanz.
          <br />
          <br />
          Am Ende wird ein Prozentsatz berechnet, der darstellt, wie sehr die
          Antworten der Nutzer*innen mit jenen der Kandiat*innen
          übereinstimmen."
        </p>
        <div className="w-full overflow-x-auto">
          <table className="border border-slate-300 dark:border-surface-500 border-separate">
            <thead className="bg-brand-yellow dark:bg-surface-300 ">
              <tr>
                <th className="p-2"></th>
                <th className="p-2 text-center font-medium">Gleiche Antwort</th>
                <th className="p-2 text-center font-medium">Gleiche Tendenz</th>
                <th className="p-2 text-center font-medium">Andere Tendenz</th>
                <th className="p-2 text-center font-medium">
                  Gegensätzliche Antwort
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 bg-brand-yellow dark:bg-surface-300  px-3">
                  Ja/Nein
                </td>
                <td className="p-2 text-center">1</td>
                <td className="p-2 text-center">-</td>
                <td className="p-2 text-center">-</td>
                <td className="p-2 text-center">0</td>
              </tr>
              <tr>
                <td className="p-2 bg-brand-yellow dark:bg-surface-300  px-3">
                  Zustimmung
                </td>
                <td className="p-2 text-center">1</td>
                <td className="p-2 text-center">0.7</td>
                <td className="p-2 text-center">0.2</td>
                <td className="p-2 text-center">0</td>
              </tr>
              <tr>
                <td className="p-2 bg-brand-yellow dark:bg-surface-300  px-3">
                  Wichtigkeit
                </td>
                <td className="p-2 text-center">0.15</td>
                <td className="p-2 text-center">0.075</td>
                <td className="p-2 text-center">0.025</td>
                <td className="p-2 text-center">0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Der Code für die Berechnung der Ergebnisse ist open-source und kann
          auf{" "}
          <a
            className="text-brand hover:underline underline-offset-2"
            href="https://gist.github.com/chrcit/8c7b2f81e8f6dc608fd97c7b43e96066"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub eingesehen werden.
          </a>
        </p>
      </div>
    </section>
  );
}
