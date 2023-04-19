import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz | SPÖ Vorsitz Wahlkabine",
  description: "SPÖ Wahlkabine",
};

export default function Datenschutz() {
  return (
    <section>
      <h1 className="text-4xl my-5 pb-4 text-center border-b-2 border-gray-800 dark:border-white">
        Datenschutz
      </h1>

      <div className="space-y-5"></div>
    </section>
  );
}
