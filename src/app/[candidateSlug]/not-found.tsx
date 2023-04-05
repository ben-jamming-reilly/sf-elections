import Link from "next/link";
import { prisma } from "~/lib/prisma";

export default async function CandidateNotFound() {
  const candidates = await prisma.candidate.findMany({
    where: {
      hasFinished: true,
    },
  });

  return (
    <div>
      <h1 className="text-3xl">Kandidatin:in nicht gefunden</h1>
      <p className="my-2">Die/Der Kandidat:in gibt es nicht.</p>

      <h2 className="text-2xl">Kandidat:innen</h2>
      <ul className="flex flex-col divide-x-2 my-5">
        {candidates.map((candidate) => (
          <li key={candidate.id} className="py-5 first:pt-0 last:pb-0">
            <Link
              href={`/${candidate.slug}`}
              className="hover:text-brand focus-visible:outline-brand outline-offset-2"
            >
              <h3 className="text-xl">{candidate.name}</h3>
              <p>{candidate.description}</p>
              <span className="text-sm">Kandidat:in ansehen -&gt;</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
