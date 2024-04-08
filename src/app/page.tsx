import Image from "next/image";
import { getCandidates } from "./get-candidates";
import { QuestionaireButton } from "./questionaire-button";

export const revalidate = false;

export default async function Home() {
  const candidates = await getCandidates();

  return (
    <div className="flex flex-col h-full">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl my-5 pb-4 border-b-2 font-brand border-gray-800 dark:border-white">
          EU-Wahlinfos 2024 in leichter Sprache
        </h1>
      </div>

      <div className="w-fit mx-auto text-2xl">
        <QuestionaireButton />
      </div>
    </div>
  );
}
