import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p>Wählen Sie Ihre KandidatInnen für die SPÖ Vorstandswahl 2023.</p>
      <p>Die Wahlkabine ist eine Initiative der Jungen Generation.</p>

      <Link
        href="/wahlkabine"
        className="bg-brand text-white px-3 py-2 hover:bg-brand/90 active:scale-95 inline-block transition-all rounded-md"
      >
        Wahlkabine starten
      </Link>
    </div>
  );
}
