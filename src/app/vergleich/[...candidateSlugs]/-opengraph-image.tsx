/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import { getCandidatesFromSlugs } from "./get-candidates-from-slugs";
import { CandidateComparisonProps } from "./page";
import { ImageResponse } from "next/og";

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
          border: "20px solid #016956",
          fontFamily: "Lora, Inter, sans-serif",
          gap: "50px",
        }}
      >
        {candidates.map((candidate) => (
          <div key={candidate.id} tw="flex flex-col">
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
                  background: "#016956",
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
