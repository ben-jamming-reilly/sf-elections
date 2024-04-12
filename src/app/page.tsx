import Image from "next/image";
import { getCandidates } from "./get-candidates";
import { QuestionaireButton } from "./questionaire-button";

export const revalidate = false;

export default async function Home() {
  const candidates = await getCandidates();

  return (
    <div className="flex h-full flex-col">
      <div className="text-center">
        <h1 className="my-5 border-b-2 border-black pb-4 font-sans text-3xl md:text-5xl ">
          EU-Wahl-Infos 2024 in leichter Sprache
        </h1>
      </div>

      <div className="mx-auto w-fit text-2xl">
        <QuestionaireButton />
      </div>
    </div>
  );
}
