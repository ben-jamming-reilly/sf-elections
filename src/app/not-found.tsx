import { BackButton } from "./ui/back-button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[800px] text-center">
      <h1 className="border-b-2 border-black pb-4 text-4xl">
        This page does not exist!
      </h1>
      <p className="my-4">
        The page you have requested could not be found. Please check the URL and
        try again.
      </p>
      <BackButton href={`/`}>Go to homepage</BackButton>
    </div>
  );
}
