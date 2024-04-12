/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { NextResponse } from "next/server";
import { cacheHeader } from "pretty-cache-header";
import { BASE_URL } from "~/app/api/og/baseUrl";
import { FetchCandidatesWithScoresResponse } from "~/app/api/og/fetch-candidates-with-scores/route";
import { FetchCandidateBySlugResponse } from "../api/og/fetch-candidate-by-slug/route";
import { boldFont, regularFont } from "../api/og/fonts";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 600 };
export const alt = "EU-Wahlinfo 2024 – andererseits.org";

export const contentType = "image/png";

export default async function og({
  params,
}: {
  params: { candidateSlug: string };
}) {
  const [regularFontData, boldFontData] = await Promise.all([
    regularFont,
    boldFont,
  ]);

  const candidate = await fetch(
    `${BASE_URL}/api/og/fetch-candidate-by-slug?slug=${params.candidateSlug}`,
  )
    .then((res) => res.json() as FetchCandidateBySlugResponse)
    .catch((e) => {
      console.error(e);
    });

  if (!candidate) {
    return NextResponse.json({ status: 404 });
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
          <div tw="flex flex-row justify-center items-center">
            <div
              key={candidate.id}
              tw={"rounded-sm flex relative"}
              style={{
                borderColor: "#016956",
              }}
            >
              <img
                tw="rounded-sm"
                src={`${BASE_URL}/og_assets/${candidate.profileImg}`}
                width={250}
                height={250}
              />
            </div>
          </div>
          <h1
            style={{
              background: "#016956",
            }}
            tw="text-5xl py-3 flex flex-col rounded-md  px-6 text-white"
          >
            {candidate.name}
          </h1>
          <p tw="text-2xl flex">
            <span tw="bg-white flex text-black px-6 py-1">
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
              background: "#016956",
              color: "#fff",
            }}
            tw="px-4 py-2 border-4 font-semibold flex rounded-md mb-3 text-3xl"
          >
            andererseits.org/Wahl-Infos
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
    },
  );
}

export const runtime = "edge";
