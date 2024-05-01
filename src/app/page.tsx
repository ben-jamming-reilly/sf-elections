import Image from "next/image";
import { getCandidates } from "./get-candidates";
import { QuestionaireButton } from "./questionaire-button";
import { SecondaryLink } from "./ui/secondary-link";
import Link from "next/link";
import { Button } from "./ui/button";

export const revalidate = false;

export default async function Home() {
  const candidates = await getCandidates();

  return (
    <div className="flex h-full flex-col gap-10">
      <div className="mx-auto w-[675px] max-w-full px-3">
        <h1 className="my-5 font-sans text-[36px] leading-[44px]">
          Wahlchecker EU 2024 <br /> in leichter Sprache
        </h1>

        <div className="space-y-4 text-[18px] leading-[24px]">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit
            suscipit accusamus quis harum eius ratione similique eum nihil
            molestiae, voluptas sit nisi, minus dolores esse quas beatae, fugiat
            qui consequuntur?
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            cupiditate, quis soluta suscipit facere veniam numquam, maxime illum
            quidem beatae, corporis laudantium quos nemo ratione quasi quod
            excepturi ipsum animi. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ipsum, provident suscipit praesentium blanditiis
            magnam eveniet perspiciatis. Nesciunt non quo a, harum ex dolore,
            similique quidem numquam illo quos, fugit eveniet?
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
            esse corporis asperiores. Omnis, odit dicta quo nostrum, saepe ipsa
            repellendus ab quos nam rerum vero, officiis id? Laboriosam,
            nesciunt iure. Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Totam sint asperiores sed iste obcaecati animi accusantium,
            quos odit ea libero? Porro quis saepe delectus officiis odio
            similique exercitationem error esse.
          </p>
        </div>
      </div>

      <div className="mx-auto flex w-fit flex-col gap-5 text-2xl md:flex-row">
        <Button
          roundness="large"
          className=""
          as="a"
          variant="secondary"
          href="/glossar"
        >
          Glossar
        </Button>
        <QuestionaireButton />
      </div>
    </div>
  );
}
