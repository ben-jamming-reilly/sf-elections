import Image from "next/image";
import { getCandidates } from "./get-candidates";
import { QuestionaireButton } from "./questionaire-button";
import Link from "next/link";
import { constructComparision } from "./vergleich/[...candidateSlugs]/construct-comparision";

export const revalidate = false;

export default async function Home() {
  const candidates = await getCandidates();

  const comboPairs = constructComparision(candidates.sort(
    (c) => Math.random() - Math.random()
  ))

  return (
    <div className="flex flex-col h-full">
      <div className="text-center">
        <h1 className="text-4xl my-5 pb-4 border-b-2 font-brand border-gray-800 dark:border-white">
          Finde heraus welche*r Kandidat*in für die SPÖ Vorsitzbefragung 2023 am
          Besten zu dir passt.
        </h1>
        <p className="my-3 text-2xl ">
          Die Vorsitzbefragungs-Kabine <span className="line-through">ist</span>{" "}<span className="font-bold">war</span> eine Initiative der Jungen Generation
          Wien.
        </p>

<div className="my-10">
        <p className="text-xl">
          Lies die Antworten <br /> der Kandidat*innen auf die Fragen
        </p>

        <ul className="flex justify-center my-5 gap-x-10 gap-y-5 items-center flex-wrap">
          {candidates.map((candidate) => (
            <li key={`/${candidate.slug}`}>
              <Link href={`/${candidate.slug}`} className="hover:bg-brand px-3 text-xl py-2 hover:text-white border-brand text-brand border active:scale-95  transition-all rounded-md focus-visible:outline-brand outline-offset-2 dark:bg-brand dark:text-white dark:hover:opacity-90 items-center gap-1 inline-flex">
                  {candidate.name}
              </Link>
            </li>
          ))}
        </ul>

          <p className="text-xl">
          und vergleichen sie untereinander
        </p>

                <ul className="flex justify-center flex-col my-5 gap-5 items-center flex-wrap">
          {comboPairs.map((combo) => (
            <li key={`/vergleich/${combo.slug}`}>
              <Link href={`/vergleich/${combo.slug}`} className="hover:bg-brand-purple text-xl px-3 py-2 hover:text-white border-brand-purple text-brand-purple border active:scale-95  transition-all rounded-md focus-visible:outline-brand-purple outline-offset-2 dark:bg-brand-purple dark:text-white dark:hover:opacity-90 items-center gap-1 inline-flex">
                  {combo.name}
              </Link>
            </li>
          ))}
        </ul>
        </div>
      </div>

      <div className="flex flex-grow justify-end pt-20 items-grow">
        <Image
          className="w-full max-w-screen-sm"
          sizes="(max-width: 640px) 100vw, 640px"
          src={"/artwork.png"}
          width={2000}
          priority
          height={2000}
          alt=""
        />
      </div>
    </div>
  );
}
