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
