import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1 className="text-3xl">404 - Seite nicht gefunden</h1>
      <p className="my-2">
        Die Seite, die Sie aufgerufen haben, konnte nicht gefunden werden. Bitte
        überprüfen Sie die URL und versuchen Sie es erneut.
      </p>
      <Link
        href="/"
        className="bg-brand px-4 my-3 text-white py-2 text-lg hover:bg-brand/90 active:bg-brand/80 active:scale-95 inline-block transition-all"
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
}
