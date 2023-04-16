import { ImageResponse } from "next/server";
import { WahlkabineResultCandidate } from "./page";
import { getVoterViaHash } from "~/app/wahlkabine/get-voter-via-hash";
import { getCandidateWithQuestions } from "./get-candidate-with-question";
import { notFound } from "next/navigation";
import { rateCandidate } from "../../rate-candidates";

export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

export default async function og({ params }: WahlkabineResultCandidate) {
  const voterWithAnswers = await getVoterViaHash(params.slug);
  const candidate = await getCandidateWithQuestions(params["candidate-slug"]);

  if (!candidate || !candidate.hasFinished || !voterWithAnswers) {
    notFound();
  }

  const candidateWithScore = rateCandidate(
    voterWithAnswers.answers!,
    candidate
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
        <div tw="flex flex-col">
          <div
            style={{
              width: 150,
              height: 150,
            }}
            tw="rounded-full flex"
          >
            {candidateWithScore.profileImg && (
              <img
                src={`${process.env.VERCEL_URL ?? "http://localhost:3000/"}/${
                  candidateWithScore.profileImg
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
              {candidateWithScore.name}
            </h1>
            <span>{candidateWithScore.scorePercentage}%</span>
          </div>
        </div>
      </div>
    )
  );
  // ...
}
