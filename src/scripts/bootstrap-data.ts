import fs from "fs";
import { parse } from "csv-parse/sync";
import { z } from "zod";
import { prisma } from "../lib/prisma";

const PARTIES = ["FPÖ", "NEOS", "KPÖ", "Volt", "SPÖ", "ÖVP", "Grüne"] as const;

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
    default:
      console.log(`Unknwon Weighing: ${weighing}`);
      return 0;
  }
};

const matchOption = (option: OptionsType) => {
  switch (option) {
    case "Ja":
      return 3;
    case "Nein":
      return -3;
    case "Weiß ich nicht":
      return 0;
    default:
      throw new Error(`Unknwon Option: ${option}`);
  }
};

const optionsValidator = z.enum(["Ja", "Nein", "Weiß ich nicht", ""]);
type OptionsType = z.infer<typeof optionsValidator>;
const weighingsValidator = z.enum([
  "Sehr wichtig",
  "Wichtig",
  "Nicht so wichtig",
  "Egal",
  "",
]);
type WeighingsType = z.infer<typeof weighingsValidator>;

(async () => {
  try {
    const partiesCsvFile = "./src/scripts/data/wahlkabine-parties.csv";
    const glossarCsvFile = "./src/scripts/data/wahlkabine-glossar.csv";

    const partiesData = parse(fs.readFileSync(partiesCsvFile, "utf8"), {
      columns: true,
      skip_empty_lines: true,
    });

    const glossarData = parse(fs.readFileSync(glossarCsvFile, "utf8"), {
      columns: true,
      skip_empty_lines: true,
    });

    const partiesDataParsed = z
      .array(
        z.object({
          Frage: z.string(),
          "Antwort FPÖ": optionsValidator,
          "Wertung FPÖ": weighingsValidator,
          "Erklärung FPÖ": z.string(),
          "Antwort NEOS": optionsValidator,
          "Wertung NEOS": weighingsValidator,
          "Erklärung NEOS": z.string(),
          "Antwort KPÖ": optionsValidator,
          "Wertung KPÖ": weighingsValidator,
          "Erklärung KPÖ": z.string(),
          "Antwort Volt": optionsValidator,
          "Wertung Volt": weighingsValidator,
          "Erklärung Volt": z.string(),
          "Antwort SPÖ": optionsValidator,
          "Wertung SPÖ": weighingsValidator,
          "Erklärung SPÖ": z.string(),
          "Antwort ÖVP": optionsValidator,
          "Wertung ÖVP": weighingsValidator,
          "Erklärung ÖVP": z.string(),
          "Antwort Grüne": optionsValidator,
          "Wertung Grüne": weighingsValidator,
          "Erklärung Grüne": z.string(),
        }),
      )
      .parse(partiesData);

    const glossarDataParsed = z
      .array(
        z.object({
          Begriff: z.string(),
          Synonym: z.string().optional(),
          Erklärung: z.string(),
        }),
      )
      .parse(glossarData);

    console.log("Deleting glossar");
    await prisma.glossarEntry.deleteMany();
    await prisma.glossarEntry.createMany({
      data: glossarDataParsed.map((entry) => ({
        definition: entry.Erklärung,
        term: entry.Begriff,
        synonyms: entry.Synonym ?? "",
      })),
    });
    console.log(`Glossar created with ${glossarDataParsed.length} entries`);

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
            question: partyData[`Frage`].trim(),
            answer: partyData[`Antwort ${party}`],
            weighting: partyData[`Wertung ${party}`],
            explanation: partyData[`Erklärung ${party}`].trim(),
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
          }[];
        }
      >,
    );

    const questions = await prisma.question.findMany();
    const matchedQuestions = questions.filter((question) => {
      return partiesDataParsed.some((partyData) => {
        for (const party of PARTIES) {
          if (partyData[`Frage`].trim() === question.title) {
            return true;
          }
        }

        return false;
      });
    });

    const notMatchedQuestions = questions.filter((question) => {
      return !matchedQuestions.some(
        (matchedQuestion) => matchedQuestion.id === question.id,
      );
    });

    console.log(
      `Matched questions: ${matchedQuestions.length}/${questions.length}`,
    );

    console.log(
      `Not matched questions: ${notMatchedQuestions.length}/${questions.length}`,
    );

    notMatchedQuestions.length > 0 &&
      console.log(notMatchedQuestions.map((question) => question.title));

    console.log("Deleting parties");
    await prisma.candidateQuestionAnswer.deleteMany();
    await prisma.candidate.deleteMany();
    for (const party of Object.values(parties)) {
      const candidate = await prisma.candidate.create({
        data: {
          name: party.name,
          description: "",
          hasFinished: true,
          profileImg: slugify(party.name) + ".svg",
          slug: slugify(party.name),
          answers: {
            createMany: {
              data: party.answers.map((answer) => ({
                questionId: matchedQuestions.find(
                  (question) => question.title === answer.question,
                )!.id,
                option: matchOption(answer.answer),
                weighting: matchWeighing(answer.weighting),
                text: answer.explanation,
              })),
            },
          },
        },
      });

      console.log(`Created party: ${candidate.name}`);
    }
  } catch (error) {
    console.error(error);
  }
})();
