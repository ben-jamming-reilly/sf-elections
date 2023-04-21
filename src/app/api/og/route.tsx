// Next.js 13.3 bugs out when the `opengraph-image.tsx` file convention conflicts a dynamic route like `/[...slug].tsx` or `/[slug]/[candidate-slug].tsx`. This is a workaround.

import { ImageResponse, NextResponse } from "next/server";
import type { CandidateComparisonProps } from "~/app/vergleich/[...candidateSlugs]/page";
import { FetchCandidatesResponse } from "./fetch-candidates/route";
import { cacheHeader } from "pretty-cache-header";
import { BASE_URL } from "./baseUrl";
import clsx from "clsx";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");

  if (!type || !Object.keys(ogTypes).includes(type)) {
    return NextResponse.json({ message: "Slug not found" }, { status: 404 });
  }

  if (type === "vergleich") {
    const candidateSlugs = url.searchParams.get("candidateSlugs")?.split(",");
    console.log(candidateSlugs);
    if (candidateSlugs && candidateSlugs.length >= 2) {
      return await ogTypes.vergleich({
        params: {
          candidateSlugs,
        },
      });
    }
  }

  return NextResponse.json({ message: "Not found" }, { status: 404 });
}

const ogTypes = {
  vergleich: async ({ params }: CandidateComparisonProps) => {
    if (params.candidateSlugs.length < 2) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const randomCandidates = (
      await fetch(`${BASE_URL}/api/og/fetch-candidates`, {
        next: {
          revalidate: 3600,
        },
      }).then((res) => res.json() as FetchCandidatesResponse)
    ).filter((c) => params.candidateSlugs.includes(c.slug));

    if (randomCandidates.length !== params.candidateSlugs.length) {
      return new Response("Not found", { status: 404 });
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
              {randomCandidates.map((candidate, index) => (
                <li
                  key={candidate.id}
                  tw={
                    (clsx("rounded-sm relative"),
                    index === 0 ? "ml-0" : "ml-10")
                  }
                  style={{
                    borderColor: "#e62937",
                  }}
                >
                  <img
                    tw="rounded-sm block"
                    src={`${BASE_URL}/og_assets/${candidate.profileImg}`}
                    width={250}
                    height={250}
                  />
                </li>
              ))}
            </ul>
            <h1
              style={{
                background: "#e62937",
              }}
              tw="text-4xl py-3 flex flex-col rounded-md text-center items-center justify-center  px-6 text-white"
            >
              <span>
                Vergleich zwischen <br />
              </span>
              <span>{randomCandidates.map((c) => c.name).join(" & ")}</span>
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
        debug: process.env.NODE_ENV === "development",
      }
    );
  },
} as const;
