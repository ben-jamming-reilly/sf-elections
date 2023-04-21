import { NextResponse } from "next/server";
import { getCandidateFromSlug } from "~/app/[candidateSlug]/get-candidate-from-slug";
import { getCandidates } from "~/app/get-candidates";
import { rateCandidate } from "~/app/kabine/[slug]/rate-candidates";
import { getCandidateWithQuestions } from "~/app/kabine/[slug]/vergleich/[candidate-slug]/get-candidate-with-question";
import { getVoterViaHash } from "~/app/kabine/get-voter-via-hash";

export type FetchCandidateAndVoterViaSlugs = Promise<{
  scorePercentage: number;
  candidate: Awaited<ReturnType<typeof getCandidateWithQuestions>>;
}>;

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;

  const slug = params.get("slug");
  const candidateSlug = params.get("candidateSlug");
  if (!slug || !candidateSlug) {
    return NextResponse.json(
      {
        error: "Slug is needed!",
      },
      { status: 400 }
    );
  }

  console.log({ slug, candidateSlug });
  const [voterWithAnswers, candidate] = await Promise.all([
    getVoterViaHash(slug),
    getCandidateWithQuestions(candidateSlug),
  ]);

  if (!candidate || !voterWithAnswers) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(
    {
      scorePercentage: rateCandidate(voterWithAnswers.answers, candidate)
        .scorePercentage,
      candidate: {
        ...candidate,
        answers: [],
      },
    },
    { status: 200 }
  );
}
