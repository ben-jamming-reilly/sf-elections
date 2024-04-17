/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { NextResponse } from "next/server";
import { BASE_URL } from "../../../baseUrl";
import { FetchCandidateBySlugResponse } from "../../../fetch-candidate-by-slug/route";
import { cacheHeader } from "pretty-cache-header";
import { FetchCandidateAndVoterViaSlugs } from "../../../fetch-candidate-and-voter/route";
import { boldFont, regularFont } from "../../../fonts";
import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const [regularFontData, boldFontData] = await Promise.all([
    regularFont,
    boldFont,
  ]);

  const url = new URL(request.url);
  const candidateSlug = url.searchParams.get("candidateSlug");
  const slug = url.searchParams.get("slug");

  if (!candidateSlug || !slug) {
    return NextResponse.json({ message: "Slug not found" }, { status: 404 });
  }

  const data = await fetch(
    `${BASE_URL}/api/og/fetch-candidate-and-voter?slug=${slug}&candidateSlug=${candidateSlug}`,
  )
    .then((res) => res.json() as FetchCandidateAndVoterViaSlugs)
    .catch((e) => {
      console.error(e);
    });

  console.log(data);

  if (!data || !data.candidate || !data.scorePercentage) {
    return NextResponse.json({ status: 404 });
  }

  const { candidate, scorePercentage } = data;

  console.log(candidate);

  return new ImageResponse(
    (
      <div
        tw="flex flex-col text-center justify-center items-center w-full h-full bg-white"
        style={{
          borderRight: "40px solid #016956",
          borderLeft: "40px solid #016956",
          borderTop: "140px solid #016956",
          borderBottom: "140px solid #016956",
        }}
      >
        <div tw="absolute w-full flex flex-row left-0 top-10 items-end justify-center">
          <div
            style={{
              background: "#016956",
              color: "#fff",
            }}
            tw="px-4 py-2 border-4 font-semibold flex rounded-md mb-3 text-6xl"
          >
            andererseits.org/Wahl-Infos
          </div>
        </div>
        <div tw="flex items-center absolute bottom-10 left-10 justify-center ml-4 mb-3 flex ">
          <img
            src={`${BASE_URL}/andererseits-logo.svg`}
            width={300}
            height={60}
            tw="relative"
          />
        </div>
        <div tw="flex flex-col justify-center items-center relative -top-10">
          <div tw="flex flex-row justify-center mb-5 items-center">
            <div
              key={candidate.id}
              tw={"rounded-sm flex relative"}
              style={{
                borderColor: "#016956",
              }}
            >
              <img
                tw="rounded-sm"
                src={`${BASE_URL}/${candidate.profileImg}`}
                width={600}
                height={600}
              />
            </div>
          </div>
          <h1
            style={{
              background: "#016956",
            }}
            tw="text-7xl py-3 flex flex-col rounded-md justify-center items-center text-center px-6 text-white"
          >
            Mein Match mit <br /> {candidate.name}: <br /> <br />{" "}
            {scorePercentage}%!
          </h1>
          <p tw="text-4xl flex">
            <span tw="bg-white flex text-black px-6 py-1">
              Finde heraus welche*r Kandidat*in am Besten zu dir passt!
            </span>
          </p>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
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
