import { NextResponse } from "next/server";
import { getCandidatesWithQuestions } from "~/app/kabine/[slug]/get-candidates-with-questions";
import { rateCandidates } from "~/app/kabine/[slug]/rate-candidates";
import { getVoterViaHash } from "~/app/kabine/get-voter-via-hash";

export type FetchCandidatesWithScoresResponse = ReturnType<
  typeof rateCandidates
>;

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;

  const slug = params.get("slug");
  if (!slug) {
    return NextResponse.json(
      {
        error: "Slug is needed!",
      },
      { status: 400 }
    );
  }

  const voterWithAnswers = await getVoterViaHash(slug);
  if (!voterWithAnswers) {
    return new Response("Not found", { status: 404 });
  }
  const candidates = await getCandidatesWithQuestions();
  const candidatesWithScore = rateCandidates(
    voterWithAnswers.answers,
    candidates
  );
  return candidatesWithScore.sort(
    (a, b) => a.scorePercentageRaw - b.scorePercentageRaw
  );
}
