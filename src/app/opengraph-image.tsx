import { ImageResponse } from "next/server";
import { cacheHeader } from "pretty-cache-header";
import { FetchCandidatesResponse } from "./api/og/fetch-candidates/route";

export const size = { width: 1200, height: 600 };
export const alt =
  "SPÖ Vorsitzbefragungs-Kabine – Finde heraus welche*r Kandidat*in am besten zu dir passt!";

const baseURL = process.env.VERCEL_URL ?? "http://localhost:3001";

export const contentType = "image/png";

export default async function og() {
  const randomCandidates = await fetch(
    `${baseURL}/api/og/fetch-candidates`
  ).then((res) => res.json() as FetchCandidatesResponse);

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
            {randomCandidates.map((candidate) => (
              <li
                key={candidate.id}
                tw="border-4 mr-3 last:mr-0 rounded-full overflow-hidden"
                style={{
                  borderColor: "#e62937",
                }}
              >
                <img
                  className="rounded-full block"
                  src={`${baseURL}/og_assets/${candidate.profileImg}`}
                  width={100}
                  height={100}
                />
              </li>
            ))}
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
            src={`${
              process.env.VERCEL_URL ?? "http://localhost:3001"
            }/og_assets/icon-blockwhite.png`}
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
