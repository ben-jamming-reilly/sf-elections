import Link from "next/link";
import { notFound } from "next/navigation";
import { getCandidateFromSlug } from "../get-candidate-from-slug";

export const metadata = {
  title: "SPÖ Wahlkabine",
  description: "SPÖ Wahlkabine",
};

export default async function CandidatePreWahlkabine({
  params,
}: {
  params: { candidateSlug: string; hash: string };
}) {
  const candidate = await getCandidateFromSlug(params.candidateSlug);

  if (!candidate || candidate.hash !== params.hash) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl">Wahlkabine für {candidate.name}</h1>
      <p className="my-3">
        Beantworten Sie die Fragen für die Vorstandswahlkabine!
      </p>

      <Link
        href={`${candidate.slug}/${candidate.hash}/wahlkabine`}
        className="bg-brand text-white px-3 py-2 hover:bg-brand/90 active:scale-95 inline-block transition-all rounded-md focus-visible:outline-brand outline-offset-2"
      >
        Kandidaten-Wahlkabine starten
      </Link>
    </div>
  );
}
