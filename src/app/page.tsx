import Image from "next/image";
import { getCandidates } from "./get-candidates";
import { QuestionaireButton } from "./questionaire-button";

export const revalidate = 3600; // 1 hour

export default async function Home() {
  // const candidates = await getCandidates();

  return (
    <div className="flex flex-col h-full">
      <div>
        <h1 className="text-4xl my-5 pb-4 text-center border-b-2 border-gray-800 dark:border-white">
          Finde heraus welche:r Kandidat:in für die SPÖ Vorsitzwahl 2023 am
          Besten zu dir passt.
        </h1>
        <p className="my-3 text-2xl text-center">
          Die Wahlkabine ist eine Initiative der Jungen Generation.
        </p>

        <div className="min-h-[60px] text-center text-xl">
          <QuestionaireButton />
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
