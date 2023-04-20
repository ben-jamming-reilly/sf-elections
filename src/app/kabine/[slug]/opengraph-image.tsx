import { ImageResponse } from "next/server";
import { getVoterViaHash } from "../get-voter-via-hash";
import { getCandidatesWithQuestions } from "./get-candidates-with-questions";
import { rateCandidates } from "./rate-candidates";
import { WahlkabineResultProps } from "./page";
import { cacheHeader } from "pretty-cache-header";

export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

const baseURL = process.env.VERCEL_URL ?? "http://localhost:3001";

export default async function og({ params }: WahlkabineResultProps) {
  // const voterWithAnswers = await getVoterViaHash(params.slug);

  // if (!voterWithAnswers) {
  //   return new Response("Not found", { status: 404 });
  // }

  // const candidates = await getCandidatesWithQuestions();

  // const candidatesWithScore = rateCandidates(
  //   voterWithAnswers.answers,
  //   candidates
  // );

  // const sortedCandidatesWithScore = candidatesWithScore.sort(
  //   (a, b) => a.scorePercentageRaw - b.scorePercentageRaw
  // );

  return new ImageResponse(
    (
      <div
        tw="flex flex-col text-center justify-center items-center w-full h-full bg-white"
        style={{
          gap: "20px",
        }}
      >
        <div tw="px-2 py-2 flex absolute bottom-0 right-0 text-white text-3xl z-0">
          <img
            src={`${baseURL}/og_assets/artwork.png`}
            width={600}
            height={600}
            style={{
              width: "200px",
              height: "200px",
            }}
          />
        </div>
        <div tw="flex flex-col z-10 relative">
          <ul tw="flex flex-row mb-3">
            {/* {sortedCandidatesWithScore.map((candidate) => (
              <li
                key={candidate.id}
                tw="border-4 mr-3 last:mr-0 rounded-full overflow-hidden"
                style={{
                  borderColor: "#e62937",
                }}
              >
                <img
                  className="rounded-full block"
                  src={`baseURL`}/og_assets/${candidate.profileImg}`}
                  width={100}
                  height={100}
                />
              </li>
            ))} */}
          </ul>
          <h1
            style={{
              background: "#e62937",
            }}
            tw="text-7xl py-3 flex flex-col rounded-md px-6 text-white"
          >
            SPÖ Vorsitzbefragungs-Kabine
          </h1>
          <p
            tw="text-3xl"
            style={{
              height: "100px",
            }}
          >
            <span tw="bg-white text-gray-800 px-6 py-3">
              Finde heraus welche*r Kandidat*in am besten zu dir passt!
            </span>
          </p>
        </div>

        <div
          tw="flex items-center justify-center absolute bottom-4 left-4 rounded-md px-4 py-2 text-white flex text-3xl"
          style={{
            background: "#e62937",
          }}
        >
          <img
            src={`${baseURL}/og_assets/icon-blockwhite.png`}
            width={200}
            height={40}
            tw="relative z-20 mr-3"
          />
          mitenscheiden.at
        </div>
      </div>
    ),
    {
      headers: {
        "cache-control": cacheHeader({
          sMaxage: "1d",
          staleWhileRevalidate: "1d",
          staleIfError: "1d",
        }),
      },
    }
  );
}


            // <div tw="flex flex-col">
            //   <h1
            //     tw="text-3xl py-2 px-5 justify-start self-start text-white"
            //     style={{
            //       background: "#e62937",
            //     }}
            //   >
            //     {candidate.name}
            //   </h1>
            //   <span>{candidate.scorePercentage}%</span>
            // </div>