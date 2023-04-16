import { ImageResponse } from "next/server";
import { getCandidateFromSlug } from "./get-candidate-from-slug";
import { CandidateProfileProps } from "./page";

export const size = { width: 1200, height: 600 };
export const alt = "About Acme";
export const contentType = "image/png";

export default async function og({ params }: CandidateProfileProps) {
  const candidate = await getCandidateFromSlug(params.candidateSlug);

  if (!candidate) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        tw="flex flex-row justify-center items-center w-full h-full bg-white"
        style={{
          border: "20px solid #e62937",
          gap: "50px",
        }}
      >
        <div
          style={{
            width: 400,
            height: 400,
          }}
          tw="rounded-full flex"
        >
          {candidate.profileImg && (
            <img
              src={`http://localhost:3000/${candidate.profileImg}`}
              tw="h-full w-full rounded-full"
            />
          )}
        </div>
        <div
          tw="flex flex-col"
          style={{
            gap: "5px",
          }}
        >
          <h1
            tw="text-7xl py-2 px-5 justify-start self-start text-white"
            style={{
              background: "#e62937",
            }}
          >
            {candidate.name}
          </h1>
          <p tw="text-3xl">{candidate.description}</p>
        </div>
      </div>
    )
  );
  // ...
}
