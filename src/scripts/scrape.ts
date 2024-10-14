// import type { Candidate, Election } from "@prisma/client";
import * as cheerio from "cheerio";
// import { prisma, db } from "../src/lib/prisma";

const candidateUrl =
  "https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election#mayor";

async function pullData() {
  //

  console.log("Pull Data");
}

async function pullCandidates() {
  console.log("Pull Candidates");
  try {
    const response = await fetch(candidateUrl);
    const html = await response.text();

    const $ = cheerio.load(html);
    const pdfLinks: string[] = [];

    $("table a[href$='.pdf']").each((_index, element) => {
      const link = $(element).attr("href");
      if (link) {
        pdfLinks.push(link);
      }
    });

    for (const pdfLink of pdfLinks) {
      // const pdf = await fetch(pdfLink);
      // const buffer = await pdf.arrayBuffer();
      // console.log(pdf);
      // await fs.writeFile(path.join("data", filename), Buffer.from(buffer));
    }

    console.log("PDF Links:", pdfLinks);
  } catch (error) {
    console.error("Error pulling candidates: ", error);
  }
}

pullCandidates();
