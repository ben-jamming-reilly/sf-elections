import { notFound } from "next/navigation";
import { ImageResponse } from "next/server";
import { getCandidatesFromSlugs } from "./get-candidates-from-slugs";
import { CandidateComparisonProps } from "./page";

export const size = { width: 1200, height: 600 };
export const alt = "About Acme";
export const contentType = "image/png";

export default async function og({ params }: CandidateComparisonProps) {
  if (params.candidateSlugs.length < 2) {
    notFound();
  }

  const candidates = await getCandidatesFromSlugs(params.candidateSlugs);

  if (candidates.length !== params.candidateSlugs.length) {
    notFound();
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
                  src={`${process.env.VERCEL_URL ?? "http://localhost:3000/"}/${
                    candidate.profileImg
                  }`}
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
  // ...
}
