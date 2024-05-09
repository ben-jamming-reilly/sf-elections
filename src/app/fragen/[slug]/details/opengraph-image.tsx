/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";
import { cacheHeader } from "pretty-cache-header";
import { BASE_URL } from "~/app/api/og/baseUrl";
import { FetchCandidatesWithScoresResponse } from "~/app/api/og/fetch-candidates-with-scores/route";
import { boldFont, regularFont } from "~/app/api/og/fonts";

export const size = { width: 1200, height: 600 };
export const alt = "EU-Wahlinfo 2024";

export const contentType = "image/png";

export default async function og({ params }: { params: { slug: string } }) {
  const [regularFontData, boldFontData] = await Promise.all([
    regularFont,
    boldFont,
  ]);

  const sortedCandidates = await fetch(
    `${BASE_URL}/api/og/fetch-candidates-with-scores?slug=${params.slug}`,
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
          border: "12px solid #016956",
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
                  borderColor: "#016956",
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
                    background: "#016956",
                  }}
                  tw="absolute top-2 left-2 flex text-white h-14 text-xl w-14 items-center justify-center text-lg rounded-full"
                >
                  {candidate.score}
                </div>
                <div
                  style={{
                    background: "#016956",
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
              background: "#016956",
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
            <span tw="bg-white flex text-black px-6 py-1">
              Finde heraus welche*r Kandidat*in am Besten zu dir passt!
            </span>
          </p>
        </div>

        <div tw="absolute w-full flex flex-row left-0 bottom-0 items-end justify-center">
          <div tw="flex items-center absolute bottom-0 left-0 justify-center ml-4 mb-3 flex ">
            <img
              src={`${BASE_URL}/andererseits-logo.svg`}
              width={182}
              height={36}
              tw="relative"
            />
          </div>

          <div
            style={{
              background: "#016956",
              color: "#fff",
            }}
            tw="px-4 py-2 border-4 font-semibold flex rounded-md mb-3 text-3xl"
          >
            wahlchecker.at
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
    },
  );
}

export const runtime = "edge";
