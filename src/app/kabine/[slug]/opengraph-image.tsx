import { ImageResponse } from "next/server";
import { getVoterViaHash } from "../get-voter-via-hash";
import { getCandidatesWithQuestions } from "./get-candidates-with-questions";
import { rateCandidates } from "./rate-candidates";
import { WahlkabineResultProps } from "./page";

export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

export default async function og({ params }: WahlkabineResultProps) {
  const voterWithAnswers = await getVoterViaHash(params.slug);

  if (!voterWithAnswers) {
    return new Response("Not found", { status: 404 });
  }

  const candidates = await getCandidatesWithQuestions();

  const candidatesWithScore = rateCandidates(
    voterWithAnswers.answers,
    candidates
  );

  return new ImageResponse(
    (
      <div
        tw="flex flex-row justify-center items-center w-full h-full bg-white"
        style={{
          border: "20px solid #e62937",
          gap: "50px",
        }}
      >
        {candidatesWithScore.map((candidate) => (
          <div tw="flex flex-col">
            <div
              style={{
                width: 150,
                height: 150,
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
              <span>{candidate.scorePercentage}%</span>
            </div>
          </div>
        ))}
      </div>
    )
  );
  // ...
}
