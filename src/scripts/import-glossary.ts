import fs from "fs";
import { parse } from "csv-parse/sync";
import { z } from "zod";
import { prisma } from "../lib/prisma";

(async () => {
  try {
    const glossarData = parse(
      fs.readFileSync("./src/scripts/data/glossary.csv", "utf8"),
      {
        columns: true,
        skip_empty_lines: true,
      },
    );

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

    // console.log("Finding duplicate glossar entries");
    // glossarDataParsed
    //   .map((entry) => entry.Begriff)
    //   .forEach((term) => {
    //     const count = glossarDataParsed.filter(
    //       (entry) => entry.Begriff === term,
    //     ).length;

    //     if (count > 1) {
    //       console.log(`Duplicate glossar entry found: ${term}`);
    //     }
    //   });

    console.log("Creating glossar");
    await prisma.glossarEntry.createMany({
      data: glossarDataParsed.map((entry) => ({
        definition: entry.Erklärung,
        term: entry.Begriff,
        synonyms: entry.Synonym ?? "",
      })),
    });
    console.log(`Glossar created with ${glossarDataParsed.length} entries`);
  } catch (error) {
    console.error(error);
  }
})();
