import fs from "fs";
import { parse } from "csv-parse/sync";
import { z } from "zod";
import { prisma } from "../lib/prisma";

const PARTIES = ["FPÖ", "NEOS", "KPÖ", "SPÖ", "ÖVP", "Grüne", "Bier"] as const;

type Parties = (typeof PARTIES)[number];

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ä/g, "ae")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9\-]/g, "");

const matchWeighing = (weighing: WeighingsType) => {
  switch (weighing) {
    case "Sehr wichtig":
      return 3;
    case "Wichtig":
      return 2;
    case "Nicht so wichtig":
      return 1;
    case "Egal":
      return 0;
    case "":
    case undefined:
      return undefined;
    default:
      console.log(`Unknwon Weighing: "${weighing}`);
      return undefined;
  }
};

const matchOption = (option: OptionsType) => {
  switch (option) {
    case "Ja":
      return 1;
    case "Nein":
      return -1;
    case "Weiß ich nicht":
      return 0;
    case "":
    case undefined:
      return undefined;
    default:
      console.log(`Unknwon Option: "${option}"`);
      return undefined;
  }
};

const optionsValidator = z
  .enum(["Ja", "Nein", "Weiß ich nicht", ""])
  .optional();
type OptionsType = z.infer<typeof optionsValidator>;
const weighingsValidator = z
  .enum(["Sehr wichtig", "Wichtig", "Nicht so wichtig", "Egal", ""])
  .optional();
type WeighingsType = z.infer<typeof weighingsValidator>;

(async () => {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log("Election name or slug missing");
    return;
  }

  if (args.length > 2) {
    console.log("Too many arguments provided");
    return;
  }

  const electionName = args[0];
  const electionSlug = args[1];

  try {
    await prisma.$transaction(async (tx) => {
      const electionExists = await tx.election.findUnique({
        where: {
          slug: electionSlug,
        },
        select: {
          id: true,
        },
      });

      if (electionExists) {
        console.log("Election already exists");
        return;
      }

      const election = await tx.election.create({
        data: {
          name: electionName,
          slug: electionSlug,
          description: "",
          isActive: false,
        },
      });

      const partiesData = parse(
        fs.readFileSync("./src/scripts/data/questions-with-partys.csv", "utf8"),
        {
          columns: true,
          skip_empty_lines: true,
        },
      );

      const partiesDataParsed = z
        .array(
          z.object({
            Kategorie: z.string().trim(),
            Frage: z.string().trim(),
            "Antwort FPÖ": optionsValidator,
            "Wertung FPÖ": weighingsValidator,
            "Erklärung FPÖ": z.string().trim(),
            "Erklärung FPÖ (einfach)": z.string().trim().optional().nullable(),
            "Antwort NEOS": optionsValidator,
            "Wertung NEOS": weighingsValidator,
            "Erklärung NEOS": z.string().trim(),
            "Erklärung NEOS (einfach)": z.string().trim().optional().nullable(),
            "Antwort KPÖ": optionsValidator,
            "Wertung KPÖ": weighingsValidator,
            "Erklärung KPÖ": z.string().trim(),
            "Erklärung KPÖ (einfach)": z.string().trim().optional().nullable(),
            "Antwort SPÖ": optionsValidator,
            "Wertung SPÖ": weighingsValidator,
            "Erklärung SPÖ": z.string().trim(),
            "Erklärung SPÖ (einfach)": z.string().trim().optional().nullable(),
            "Antwort ÖVP": optionsValidator,
            "Wertung ÖVP": weighingsValidator,
            "Erklärung ÖVP": z.string().trim(),
            "Erklärung ÖVP (einfach)": z.string().trim().optional().nullable(),
            "Antwort Grüne": optionsValidator,
            "Wertung Grüne": weighingsValidator,
            "Erklärung Grüne": z.string().trim(),
            "Erklärung Grüne (einfach)": z
              .string()
              .trim()
              .optional()
              .nullable(),
            "Antwort Bier": optionsValidator,
            "Wertung Bier": weighingsValidator,
            "Erklärung Bier": z.string().trim(),
            "Erklärung Bier (einfach)": z.string().trim().optional().nullable(),
          }),
        )
        .parse(partiesData);

      const parties = partiesDataParsed.reduce(
        (acc, partyData) => {
          for (const party of PARTIES) {
            if (acc[party] === undefined) {
              acc[party] = {
                name: party,
                answers: [],
              };
            }

            if (partyData[`Antwort ${party}`] === "") {
              continue;
            }

            acc[party].answers.push({
              question: partyData[`Frage`],
              answer: partyData[`Antwort ${party}`],
              weighting: partyData[`Wertung ${party}`],
              explanation: partyData[`Erklärung ${party}`],
              explanationSimple:
                partyData[`Erklärung ${party} (einfach)`] ?? "",
            });
          }

          return acc;
        },
        {} as Record<
          Parties,
          {
            name: string;
            answers: {
              question: string;
              answer: OptionsType;
              weighting: WeighingsType;
              explanation: string;
              explanationSimple?: string;
            }[];
          }
        >,
      );

      console.log("Creating questions");
      await tx.question.createMany({
        data: partiesDataParsed.map((party, index) => ({
          title: party.Frage,
          category: party.Kategorie,
          description: "",
          type: "YesNo",
          order: index,
          electionId: election.id,
        })),
      });

      const questions = await tx.question.findMany({
        where: {
          electionId: election.id,
        },
      });

      for (const party of Object.values(parties)) {
        const candidate = await tx.candidate.create({
          data: {
            electionId: election.id,
            name: party.name,
            description: "",
            hasFinished: true,
            profileImg: slugify(party.name) + ".svg",
            slug: slugify(party.name),
            answers: {
              createMany: {
                data: party.answers.map((answer) => ({
                  questionId: questions.find(
                    (question) => question.title === answer.question,
                  )!.id,
                  option: matchOption(answer.answer),
                  weighting: matchWeighing(answer.weighting),
                  text: answer.explanation,
                  textSimpleLanguage: answer.explanationSimple,
                })),
              },
            },
          },
        });

        console.log(`Created party: ${candidate.name}`);
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    if (error instanceof z.ZodError) {
      console.error(JSON.stringify(error.issues));
    }
  }
})();
