import { ImageResponse } from "next/server";

export const size = { width: 1200, height: 600 };
export const alt =
  "SPÖ Vorsitzbefragungs-Kabine – Finde heraus welche:r Kandidat:in am besten zu dir passt!";
export const contentType = "image/png";

export default async function og() {
  return new ImageResponse(
    (
      <div
        tw="flex flex-col text-center justify-center items-center w-full h-full bg-white"
        style={{
          border: "20px solid #e62937",
          gap: "20px",
        }}
      >
        <h1
          tw="text-7xl py-2 px-5 text-white"
          style={{
            background: "#e62937",
          }}
        >
          SPÖ Vorsitzbefragungs-Kabine
        </h1>
        <p tw="text-3xl">
          Finde heraus welche:r Kandidat:in am besten zu dir passt!
        </p>
      </div>
    )
  );
}
