import { ImageResponse, NextResponse } from "next/server";
import { BASE_URL } from "../../../baseUrl";
import { FetchCandidateBySlugResponse } from "../../../fetch-candidate-by-slug/route";
import { cacheHeader } from "pretty-cache-header";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const candidateSlug = url.searchParams.get("candidateSlug");

  if (!candidateSlug) {
    return NextResponse.json({ message: "Slug not found" }, { status: 404 });
  }

  const candidate = await fetch(
    `${BASE_URL}/api/og/fetch-candidate-by-slug?slug=${candidateSlug}`
  )
    .then((res) => res.json() as FetchCandidateBySlugResponse)
    .catch((e) => {
      console.error(e);
    });

  if (!candidate) {
    return NextResponse.json({ status: 404 });
  }

  console.log(candidate);

  return new ImageResponse(
    (
      <div
        tw="flex flex-col text-center justify-center items-center w-full h-full bg-white"
        style={{
          borderRight: "40px solid #e62937",
          borderLeft: "40px solid #e62937",
          borderTop: "140px solid #e62937",
          borderBottom: "140px solid #e62937",
        }}
      >
        <div tw="absolute w-full flex flex-row left-0 top-10 items-end justify-center">
          <div
            style={{
              background: "#e62937",
              color: "#fff",
            }}
            tw="px-4 py-2 border-4 font-semibold flex rounded-md mb-3 text-6xl"
          >
            mitentscheiden.at
          </div>
        </div>
        <div tw="flex items-center absolute bottom-10 left-10 justify-center ml-4 mb-3 flex ">
          <img
            src={`${BASE_URL}/og_assets/logo-red.png`}
            width={300}
            height={60}
            tw="relative"
          />
        </div>
        <div tw="flex mr-2 mb-2 absolute bottom-10 right-10 text-white text-3xl">
          <img
            src={`${BASE_URL}/og_assets/artwork.png`}
            width={250}
            height={250}
          />
        </div>
        <div tw="flex flex-col justify-center items-center relative -top-10">
          <div tw="flex flex-row justify-center mb-5 items-center">
            <div
              key={candidate.id}
              tw={"rounded-sm flex relative"}
              style={{
                borderColor: "#e62937",
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
              background: "#e62937",
            }}
            tw="text-8xl py-3 flex flex-col rounded-md  px-6 text-white"
          >
            {candidate.name}
          </h1>
          <p tw="text-4xl flex">
            <span tw="bg-white flex text-gray-800 px-6 py-1">
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
      debug: process.env.NODE_ENV === "development",
    }
  );
}
