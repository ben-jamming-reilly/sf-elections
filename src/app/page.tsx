import { getCandidates } from "./get-candidates";
import { QuestionaireButton } from "./questionaire-button";

export default async function Home() {
  const candidates = await getCandidates();

  return (
    <div>
      <h1 className="text-3xl">
        Finde heraus welche:r Kandidat:in für die SPÖ Vorsitzwahl 2023 am Besten
        zu dir passt.
      </h1>
      <p className="my-3">
        Die Wahlkabine ist eine Initiative der Jungen Generation.
      </p>

      <div className="min-h-[60px]">
        <QuestionaireButton />
      </div>
    </div>
  );
}
