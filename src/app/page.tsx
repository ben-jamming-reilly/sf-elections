"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuestionnaireStore } from "~/stores/questionnaire-store";
import { Loading } from "./ui/loading";

export default function Home() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [slug, reset] = useQuestionnaireStore((s) => [s.slug, s.reset]);

  useEffect(() => {
    setHasHydrated(true);
  }, [hasHydrated]);

  return (
    <div>
      <h1 className="text-3xl">
        Wählen Sie Ihre KandidatInnen für die SPÖ Vorstandswahl 2023.
      </h1>
      <p className="my-3">
        Die Wahlkabine ist eine Initiative der Jungen Generation.
      </p>

      <div className="min-h-[60px]">
        {hasHydrated ? (
          <>
            {slug ? (
              <div className="flex flex-row gap-5">
                <Link
                  href={`/wahlkabine/${slug}`}
                  className="bg-brand text-white px-3 py-2 hover:bg-brand/90 active:scale-95 inline-block transition-all rounded-md focus-visible:outline-brand outline-offset-2"
                >
                  Dein Ergebnis
                </Link>

                <button
                  onClick={(e) => {
                    reset();
                  }}
                  className="bg-brand text-white px-3 py-2 hover:bg-brand/90 active:scale-95 inline-block transition-all rounded-md focus-visible:outline-brand outline-offset-2"
                >
                  Wahlkabine neu starten
                </button>
              </div>
            ) : (
              <Link
                href="/wahlkabine"
                className="bg-brand text-white px-3 py-2 hover:bg-brand/90 active:scale-95 inline-block transition-all rounded-md"
              >
                Wahlkabine starten
              </Link>
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
