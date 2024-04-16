import { BackButton } from "./ui/back-button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[800px] text-center">
      <h1 className="border-b-2 border-black pb-4 text-4xl">
        Diese Seite gibt es nicht!
      </h1>
      <p className="my-4">
        Die Seite, die du aufgerufen hast, konnte nicht gefunden werden. Bitte
        überprüfe die URL und versuchen es erneut.
      </p>
      <BackButton href={`/`}>Zur Startseite</BackButton>
    </div>
  );
}
