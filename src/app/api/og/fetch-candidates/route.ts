import { NextResponse } from "next/server";
import { getCandidates } from "~/app/get-candidates";

export type FetchCandidatesResponse = ReturnType<typeof getCandidates>;

export async function GET(request: Request) {
  const candidates = await getCandidates();

  return NextResponse.json(
    candidates.sort((a, b) => Math.random() - 0.5).slice(0, 3),
    { status: 200 },
  );
}
