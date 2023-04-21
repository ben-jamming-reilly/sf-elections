import { ImageResponse, NextResponse } from "next/server";
import { BASE_URL } from "../../../baseUrl";
import { FetchCandidateBySlugResponse } from "../../../fetch-candidate-by-slug/route";
import { cacheHeader } from "pretty-cache-header";
import { FetchCandidatesWithScoresResponse } from "../../../fetch-candidates-with-scores/route";
import clsx from "clsx";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ message: "Slug not found" }, { status: 404 });
  }

  console.log(process.env);

  console.log(BASE_URL);

  const sortedCandidates = await fetch(
    `${BASE_URL}/api/og/fetch-candidates-with-scores?slug=${slug}`
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
        <div
          tw="flex flex-col justify-center items-center relative -top-10 w-full"
          style={{
            padding: "0 10px",
          }}
        >
          <h1
            style={{
              color: "#e62937",
              borderBottom: "4px solid #e62937",
            }}
            tw="my-6 px-4 text-5xl rounded-md"
          >
            Mein Ergebnis
          </h1>
          <ul tw="flex flex-col mb-3 justify-center items-center w-full">
            {sortedCandidates.map((candidate, index) => (
              <li
                key={candidate.id}
                tw={
                  (clsx(" flex flex-row w-full justify-center items-center"),
                  index === 0 ? "mt-0" : "mt-10")
                }
                style={{
                  borderColor: "#e62937",
                  transform:
                    index === 1
                      ? "scale(0.98)"
                      : index === 2
                      ? "scale(0.96)"
                      : "scale(1)",
                }}
              >
                <div tw="flex rounded-sm relative mr-10">
                  <img
                    tw="rounded-sm flex"
                    src={`${BASE_URL}/og_assets/${candidate.profileImg}`}
                    width={350}
                    height={350}
                  />
                  <div
                    style={{
                      background: "#e62937",
                    }}
                    tw="absolute bottom-0 items-center justify-center rounded-bl-sm  left-0 flex text-white w-22 h-22 text-5xl"
                  >
                    {index + 1}.
                  </div>
                </div>
                <div
                  tw="flex flex-col"
                  style={{
                    width: `530px`,
                  }}
                >
                  <h1
                    style={{
                      background: "#e62937",
                    }}
                    tw="text-4xl text-left py-3 flex flex-col rounded-md w-full  px-6 text-white"
                  >
                    {candidate.name}
                  </h1>
                  {/* <p tw="flex">{candidate.description}</p> */}
                  <p tw="text-3xl flex flex-row items-center justify-start">
                    <span
                      style={{
                        background: "#e62937",
                      }}
                      tw="py-3 px-4 rounded-md text-white"
                    >
                      Match: {candidate.scorePercentage}%!
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
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
