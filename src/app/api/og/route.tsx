// Next.js 13.3 bugs out when the `opengraph-image.tsx` file convention conflicts a dynamic route like `/[...slug].tsx` or `/[slug]/[candidate-slug].tsx`. This is a workaround.

import { ImageResponse } from "next/server";
import { getVoterViaHash } from "~/app/wahlkabine/get-voter-via-hash";
import { getCandidatesWithQuestions } from "~/app/wahlkabine/[slug]/get-candidates-with-questions";
import type { WahlkabineResultProps } from "~/app/wahlkabine/[slug]/page";
import type { CandidateComparisonProps } from "~/app/vergleich/[...candidateSlugs]/page";
import { rateCandidates } from "~/app/wahlkabine/[slug]/rate-candidates";
import { getCandidatesFromSlugs } from "~/app/vergleich/[...candidateSlugs]/get-candidates-from-slugs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");

  if (!type || !Object.keys(ogTypes).includes(type)) {
    return new Response("Slug not found", { status: 404 });
  }

  if (type === "vergleich") {
    const candidateSlugs = url.searchParams.get("candidateSlugs")?.split(",");
    console.log(candidateSlugs);
    if (candidateSlugs && candidateSlugs.length >= 2) {
      return await ogTypes.vergleich({
        params: {
          candidateSlugs,
        },
      });
    }
  }

  return new Response("Not found", { status: 404 });
}

const ogTypes = {
  vergleich: async ({ params }: CandidateComparisonProps) => {
    if (params.candidateSlugs.length < 2) {
      return new Response("Not found", { status: 404 });
    }

    const candidates = await getCandidatesFromSlugs(params.candidateSlugs);

    if (candidates.length !== params.candidateSlugs.length) {
      return new Response("Not found", { status: 404 });
    }

    return new ImageResponse(
      (
        <div
          tw="flex flex-row justify-center items-center w-full h-full bg-white"
          style={{
            border: "20px solid #e62937",
            fontFamily: "AdriaGrotesk, Inter, sans-serif",
            gap: "50px",
          }}
        >
          {candidates.map((candidate) => (
            <div tw="flex flex-col">
              <div
                style={{
                  width: 400,
                  height: 400,
                }}
                tw="rounded-full flex"
              >
                {candidate.profileImg && (
                  <img
                    src={`${
                      process.env.VERCEL_URL ?? "http://localhost:3000/"
                    }/${candidate.profileImg}`}
                    tw="h-full w-full rounded-full"
                  />
                )}
              </div>
              <div tw="flex flex-col">
                <h1
                  tw="text-3xl py-2 px-5 justify-start self-start text-white"
                  style={{
                    background: "#e62937",
                  }}
                >
                  {candidate.name}
                </h1>
              </div>
            </div>
          ))}
        </div>
      )
    );
  },
} as const;
