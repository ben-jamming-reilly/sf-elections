import clsx from "clsx";
import { ImageResponse, NextResponse } from "next/server";
import { cacheHeader } from "pretty-cache-header";
import { BASE_URL } from "~/app/api/og/baseUrl";
import { FetchCandidatesWithScoresResponse } from "~/app/api/og/fetch-candidates-with-scores/route";
import { boldFont, regularFont } from "~/app/api/og/fonts";

export const size = { width: 1200, height: 600 };
export const alt =
  "SPÖ Vorsitzbefragungs-Kabine – Finde heraus welche*r Kandidat*in am besten zu dir passt!";

export const contentType = "image/png";

export default async function og({ params }: { params: { slug: string } }) {
  const [regularFontData, boldFontData] = await Promise.all([
    regularFont,
    boldFont,
  ]);

  const sortedCandidates = await fetch(
    `${BASE_URL}/api/og/fetch-candidates-with-scores?slug=${params.slug}`
  )
    .then((res) => res.json() as Promise<FetchCandidatesWithScoresResponse>)
    .catch((e) => {
      console.error(e);
    });

  if (!sortedCandidates) {
    return NextResponse.json({ status: 500 });
  }

  return new ImageResponse(
    (
      <div
        tw="flex flex-col text-center justify-center items-center w-full h-full bg-white"
        style={{
          border: "12px solid #e62937",
        }}
      >
        <div tw="flex flex-col justify-center items-center relative">
          <ul tw="flex flex-row mb-3 justify-center items-center">
            {sortedCandidates.map((candidate, index) => (
              <li
                key={candidate.id}
                tw={
                  (clsx("rounded-sm relative"), index === 0 ? "ml-0" : "ml-10")
                }
                style={{
                  borderColor: "#e62937",
                  transform:
                    index === 1
                      ? "scale(0.95)"
                      : index === 2
                      ? "scale(0.9)"
                      : "scale(1)",
                }}
              >
                <img
                  tw="rounded-sm flex"
                  src={`${BASE_URL}/og_assets/${candidate.profileImg}`}
                  width={300}
                  height={300}
                />
                <div
                  style={{
                    background: "#e62937",
                  }}
                  tw="absolute top-2 left-2 flex text-white h-14 text-xl w-14 items-center justify-center text-lg rounded-full"
                >
                  {candidate.scorePercentage}%
                </div>
                <div
                  style={{
                    background: "#e62937",
                  }}
                  tw="absolute bottom-0 items-center justify-center rounded-bl-sm  left-0 flex text-white w-12 h-12 text-3xl"
                >
                  {index + 1}.
                </div>
              </li>
            ))}
          </ul>
          <h1
            style={{
              background: "#e62937",
            }}
            tw="text-5xl py-3 flex flex-col rounded-md  px-6 text-white"
          >
            Mein Ergebnis
          </h1>
          <p
            tw="text-2xl flex"
            style={{
              height: "100px",
            }}
          >
            <span tw="bg-white flex text-gray-800 px-6 py-1">
              Finde heraus welche*r Kandidat*in am Besten zu dir passt!
            </span>
          </p>
        </div>

        <div tw="absolute w-full flex flex-row left-0 bottom-0 items-end justify-center">
          <div tw="flex items-center absolute bottom-0 left-0 justify-center ml-4 mb-3 flex ">
            <img
              src={`${BASE_URL}/og_assets/logo-red.png`}
              width={200}
              height={40}
              tw="relative"
            />
          </div>

          <div
            style={{
              background: "#e62937",
              color: "#fff",
            }}
            tw="px-4 py-2 border-4 font-semibold flex rounded-md mb-3 text-3xl"
          >
            mitentscheiden.at
          </div>
          <div tw="flex mr-2 mb-2 absolute bottom-0 right-0 text-white text-3xl">
            <img
              src={`${BASE_URL}/og_assets/artwork.png`}
              width={150}
              height={150}
            />
          </div>
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
      fonts: [
        {
          name: "Inter",
          data: regularFontData,
          weight: 400,
        },
        {
          name: "Inter",
          data: boldFontData,
          weight: 700,
        },
      ],
      debug: process.env.NODE_ENV === "development",
    }
  );
}

export const runtime = 'edge'