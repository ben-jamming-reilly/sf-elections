import { NextResponse } from "next/server";
import { getCandidateFromSlug } from "~/app/[candidateSlug]/get-candidate-from-slug";
import { getCandidates } from "~/app/get-candidates";

export type FetchCandidateBySlugResponse = ReturnType<
  typeof getCandidateFromSlug
>;

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;

  const slug = params.get("slug");
  if (!slug) {
    return NextResponse.json(
      {
        error: "Slug is needed!",
      },
      { status: 400 },
    );
  }

  const candidate = await getCandidateFromSlug(slug);

  if (!candidate) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(
    {
      ...candidate,
      answers: [],
    },
    { status: 200 },
  );
}
