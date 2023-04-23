import { ImageResponse, NextResponse } from "next/server";
import { cacheHeader } from "pretty-cache-header";
import { FetchCandidatesResponse } from "./api/og/fetch-candidates/route";
import { BASE_URL } from "./api/og/baseUrl";
import { boldFont, regularFont } from "./api/og/fonts";

export const size = { width: 1200, height: 600 };
export const alt =
  "SPÖ Vorsitzbefragungs-Kabine – Finde heraus welche*r Kandidat*in am besten zu dir passt!";

export const contentType = "image/png";

export default async function og() {
  const [regularFontData, boldFontData] = await Promise.all([
    regularFont,
    boldFont,
  ]);

  const randomCandidates = await fetch(`${BASE_URL}/api/og/fetch-candidates`, {
    next: {
      revalidate: 36000,
    },
  })
    .then((res) => res.json() as FetchCandidatesResponse)
    .catch((e) => {
      console.error(e);
    });

  if (!randomCandidates) {
    return NextResponse.json({ status: 404 });
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
                  src={`${BASE_URL}/og_assets/mini/${candidate.profileImg}`}
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
            tw="text-7xl py-3 flex flex-col rounded-md  px-6 text-white"
          >
            SPÖ Vorsitzbefragungs-Kabine
          </h1>
          <p
            tw="text-3xl "
            style={{
              height: "100px",
            }}
          >
            <span tw="bg-white text-gray-800 px-6 py-3">
              Finde heraus welche*r Kandidat*in am besten zu dir passt!
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
          <div tw="flex mr-2 mb-2 text-white absolute bottom-0 right-0 text-3xl">
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

export const config = {
  runtime: "edge",
};